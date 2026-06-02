import { GithubHelper } from "@/lib/GithubHelper";
import type { FileAction, FileMetadataInput } from "./types";

interface FileMetadata {
  filename: string;
  title: string;
  description: string;
}

export async function runSaveFilesMetadata(
  actions: FileAction[],
  newMetadata: FileMetadataInput[],
): Promise<{ success: boolean; message: string }> {
  const gh = await GithubHelper.create();
  const metadataPath = "public/content/files/metadata.json";

  const pathsToDelete = actions
    .map((a) => a.path)
    .filter((p): p is string => !!p);

  let success = true;

  if (pathsToDelete.length > 0) {
    const commitMessage = `File Manager: Deleted ${pathsToDelete.length} file(s).`;
    try {
      await gh.remove(pathsToDelete, commitMessage);
    } catch (err: unknown) {
      console.error("Failed to delete files:", err);
      success = false;
    }
  }

  const finalMetadataForFile: FileMetadata[] = newMetadata.map((f) => ({
    filename: f.filename,
    title: f.title,
    description: f.description,
  }));

  const jsonContent = JSON.stringify(finalMetadataForFile, null, 2);
  const finalCommitMessage = `File Manager: Update metadata file (Deletions: ${pathsToDelete.length}).`;

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
    message: "File management changes saved (deletions and metadata updated).",
  };
}
