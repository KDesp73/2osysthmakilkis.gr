"use server";

import {
  authErrorResult,
  requireEditorSession,
} from "@/lib/auth/session";
import { runUpload } from "@/lib/admin/upload";
import { runSaveFilesMetadata } from "@/lib/admin/edit-files";
import { runSaveImagesMetadata } from "@/lib/admin/edit-images";
import { runDeletePost } from "@/lib/admin/delete-post";
import type {
  UploadItem,
  FileAction,
  FileMetadataInput,
  ImageAction,
  ImageMetadataInput,
} from "@/lib/admin/types";

export type ActionResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function uploadContent(
  items: UploadItem[],
): Promise<ActionResult> {
  try {
    await requireEditorSession();
    await runUpload(items);
    return { success: true };
  } catch (err) {
    return authErrorResult(err);
  }
}

export async function saveFilesMetadata(
  actions: FileAction[],
  newMetadata: FileMetadataInput[],
): Promise<ActionResult> {
  try {
    await requireEditorSession();
    const result = await runSaveFilesMetadata(actions, newMetadata);
    return { success: result.success, message: result.message };
  } catch (err) {
    return authErrorResult(err);
  }
}

export async function saveImagesMetadata(
  actions: ImageAction[],
  newMetadata: ImageMetadataInput[],
): Promise<ActionResult> {
  try {
    await requireEditorSession();
    const result = await runSaveImagesMetadata(actions, newMetadata);
    return { success: result.success, message: result.message };
  } catch (err) {
    return authErrorResult(err);
  }
}

export async function deletePost(title: string): Promise<ActionResult> {
  try {
    await requireEditorSession();
    await runDeletePost(title);
    return { success: true };
  } catch (err) {
    return authErrorResult(err);
  }
}
