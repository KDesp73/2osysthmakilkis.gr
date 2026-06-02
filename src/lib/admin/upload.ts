import matter from "gray-matter";
import { GithubHelper } from "@/lib/GithubHelper";
import {
  CollectionMetadata,
  FileMetadata,
} from "@/lib/metadata";
import { slugify } from "@/lib/utils";
import type { UploadItem, UploadResult, FileUploadPayload } from "./types";

async function blog(item: UploadItem): Promise<UploadResult> {
  if (!item.title || !item.content)
    throw new Error("Blog items must have title and content");

  const slug = slugify(item.title);
  if (!slug) throw new Error("Cannot generate slug from title");

  const frontmatter = matter.stringify(item.content, {
    title: item.title,
    description: item.description,
    author: item.author,
    date: new Date().toISOString(),
    tags: item.tags,
    slug,
  });

  return {
    commitMsg: `Posted '${item.title}'`,
    file: {
      remotePath: item.path ? item.path : `public/content/blog/${slug}.md`,
      content: frontmatter,
      encoding: "utf-8",
    },
  };
}

async function file(
  item: UploadItem,
  existingMetadata: FileMetadata[] = [],
): Promise<UploadResult> {
  if (!item.name || !item.data)
    throw new Error("File items must have name and data");

  const metadata: FileMetadata[] = [...existingMetadata];

  const entry: FileMetadata = {
    filename: item.name,
    title: item.title || item.name,
    description: item.description || "",
  };

  const idx = metadata.findIndex((m) => m.filename === item.name);
  if (idx >= 0) metadata[idx] = entry;
  else metadata.push(entry);

  return {
    commitMsg: `Uploaded file '${item.name}'`,
    file: {
      remotePath: item.path ? item.path : `public/content/files/${item.name}`,
      content: item.data,
      encoding: "base64",
    },
    metadata,
  };
}

async function image(
  item: UploadItem,
  existingMetadata: CollectionMetadata[] = [],
): Promise<UploadResult> {
  if (!item.name || !item.data)
    throw new Error("Image items must have name and data");

  const metadata: CollectionMetadata[] = [...existingMetadata];

  if (item.path) {
    const remotePath = item.path.startsWith("public/")
      ? item.path
      : `public/${item.path.replace(/^\/+/, "")}`;

    return {
      commitMsg: `Uploaded image '${item.name}'`,
      file: {
        remotePath,
        content: item.data,
        encoding: "base64",
      },
      metadata,
    };
  }

  if (!item.collection)
    throw new Error("Image items must have either a collection or a path");

  let collection = metadata.find((c) => c.name === item.collection);
  if (!collection) {
    collection = {
      name: item.collection,
      date: new Date().toISOString().split("T")[0],
      images: [],
    };
    metadata.push(collection);
  }

  const nextIndex = collection.images.length;
  const publicPath = `/content/images/${item.collection}/${item.name}`;
  const remotePath = `public${publicPath}`;

  collection.images.push({
    path: publicPath,
    index: nextIndex,
  });

  return {
    commitMsg: `Uploaded image '${item.name}'`,
    file: {
      remotePath,
      content: item.data,
      encoding: "base64",
    },
    metadata,
  };
}

export async function runUpload(items: UploadItem[]): Promise<void> {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("No items provided");
  }

  const gh = await GithubHelper.create();
  const filesToUpload: FileUploadPayload[] = [];

  let fileMetadata: FileMetadata[] = [];
  let imageMetadata: CollectionMetadata[] = [];

  try {
    const fileMetaRes = await gh.getFile("public/content/files/metadata.json");
    if (fileMetaRes?.content) fileMetadata = JSON.parse(fileMetaRes.content);
  } catch {
    /* empty metadata */
  }

  try {
    const imageMetaRes = await gh.getFile(
      "public/content/images/metadata.json",
    );
    if (imageMetaRes?.content)
      imageMetadata = JSON.parse(imageMetaRes.content);
  } catch {
    /* empty metadata */
  }

  let lastCommitMsg = "Upload";
  let touchedFiles = false;
  let touchedImages = false;

  for (const item of items) {
    let result: UploadResult;

    if (item.type === "blog") {
      result = await blog(item);
    } else if (item.type === "file") {
      result = await file(item, fileMetadata);
      fileMetadata = result.metadata as FileMetadata[];
      touchedFiles = true;
    } else if (item.type === "image") {
      result = await image(item, imageMetadata);
      imageMetadata = result.metadata as CollectionMetadata[];
      touchedImages = true;
    } else {
      throw new Error(`Unknown item type: ${(item as UploadItem).type}`);
    }

    lastCommitMsg = result.commitMsg ?? lastCommitMsg;
    filesToUpload.push(result.file);
  }

  if (touchedFiles) {
    filesToUpload.push({
      remotePath: "public/content/files/metadata.json",
      content: JSON.stringify(fileMetadata, null, 2),
      encoding: "utf-8",
    });
  }
  if (touchedImages) {
    filesToUpload.push({
      remotePath: "public/content/images/metadata.json",
      content: JSON.stringify(imageMetadata, null, 2),
      encoding: "utf-8",
    });
  }

  const commitMsg =
    filesToUpload.length <= 2 ? lastCommitMsg : "Batch upload";

  const res = await gh.upload(filesToUpload, commitMsg);
  if (res.status !== 200) throw new Error("Failed to upload files to GitHub");
}
