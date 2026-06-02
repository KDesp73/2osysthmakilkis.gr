import { GithubHelper } from "@/lib/GithubHelper";
import type { ImageAction, ImageMetadataInput } from "./types";

interface MetadataImage {
  path: string;
  index: number;
}

interface MetadataFolder {
  name: string;
  date: string;
  images: MetadataImage[];
}

const groupMetadata = (
  flatMetadata: ImageMetadataInput[],
  existingCollectionsMap: Map<string, MetadataFolder>,
): MetadataFolder[] => {
  const grouped: Record<string, MetadataFolder> = {};
  const now = new Date().toISOString().split("T")[0];

  flatMetadata.forEach((item) => {
    const { collection, path, index } = item;
    const slugifiedCollection = collection.replace(/\s+/g, "-");
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const finalPath = `/content/images/${slugifiedCollection}/${filename}`;

    if (!grouped[collection]) {
      const existingFolder = existingCollectionsMap.get(collection);
      const dateToUse = existingFolder ? existingFolder.date : now;

      grouped[collection] = {
        name: collection,
        date: dateToUse,
        images: [],
      };
    }
    grouped[collection].images.push({ path: finalPath, index });
  });

  return Object.values(grouped).map((folder) => {
    folder.images.sort((a, b) => a.index - b.index);
    const cleanImages: MetadataImage[] = folder.images.map(
      ({ path, index }) => ({ path, index }),
    );

    return {
      name: folder.name,
      date: folder.date,
      images: cleanImages,
    };
  });
};

export async function runSaveImagesMetadata(
  actions: ImageAction[],
  newMetadata: ImageMetadataInput[],
): Promise<{ success: boolean; message: string }> {
  const gh = await GithubHelper.create();
  const metadataPath = "public/content/images/metadata.json";
  const pathsToDelete = actions
    .map((a) => a.path)
    .filter((p): p is string => !!p);

  let success = true;

  let existingCollectionsMap = new Map<string, MetadataFolder>();
  try {
    const existingContent = await gh.getFile(metadataPath);
    const existingFolders: MetadataFolder[] = JSON.parse(
      existingContent.content,
    );
    existingCollectionsMap = new Map(existingFolders.map((f) => [f.name, f]));
  } catch {
    /* start fresh */
  }

  if (pathsToDelete.length > 0) {
    const commitMessage = `Image Manager: Deleted ${pathsToDelete.length} image file(s).`;
    try {
      await gh.remove(pathsToDelete, commitMessage);
    } catch (err: unknown) {
      console.error("Failed to delete files:", err);
      success = false;
    }
  }

  const groupedMetadata = groupMetadata(newMetadata, existingCollectionsMap);
  const jsonContent = JSON.stringify(groupedMetadata, null, 2);
  const finalCommitMessage = `Image Manager: Update metadata file (Deletions: ${pathsToDelete.length}).`;

  const metadataRes = await gh.upload(
    [
      {
        remotePath: metadataPath,
        content: jsonContent,
        encoding: "utf-8",
      },
    ],
    finalCommitMessage,
  );

  if (metadataRes.status < 200 || metadataRes.status >= 300) {
    throw new Error(
      `GitHub metadata write failed with status ${metadataRes.status}`,
    );
  }

  return {
    success,
    message:
      "Image management changes saved (deletions and metadata updated).",
  };
}
