"use server";

import {
  authErrorResult,
  requireEditorSession,
} from "@/lib/auth/session";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import type { ActionResult } from "./content";

export async function getPostsForAdmin(): Promise<
  { success: true; posts: Omit<Post, "contentHtml">[] } | ActionResult
> {
  try {
    await requireEditorSession();
    const posts = getAllPosts();
    return { success: true, posts };
  } catch (err) {
    return authErrorResult(err);
  }
}
