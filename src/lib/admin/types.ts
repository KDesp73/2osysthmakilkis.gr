import type { CollectionMetadata, FileMetadata } from "@/lib/metadata";
import type { ContentType } from "@/lib/GithubHelper";

export interface UploadItem {
  type: "blog" | "file" | "image";
  title?: string;
  description?: string;
  author?: string;
  tags?: string[];
  content?: string;
  name?: string;
  data?: string;
  collection?: string;
  path?: string;
}

export interface FileUploadPayload {
  remotePath: string;
  content: ContentType;
  encoding: "utf-8" | "base64";
}

export interface UploadResult {
  commitMsg?: string;
  file: FileUploadPayload;
  metadata?: CollectionMetadata[] | FileMetadata[];
}

export interface FileAction {
  type: "delete";
  path: string;
}

export interface FileMetadataInput {
  filename: string;
  title: string;
  description: string;
  index?: number;
}

export interface ImageAction {
  type: "delete";
  path: string;
}

export interface ImageMetadataInput {
  path: string;
  collection: string;
  index: number;
}
