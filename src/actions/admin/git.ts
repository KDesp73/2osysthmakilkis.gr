"use server";

import { GithubHelper, type CommitHistoryItem } from "@/lib/GithubHelper";
import {
  authErrorResult,
  requireEditorSession,
} from "@/lib/auth/session";
import type { ActionResult } from "./content";

export async function getGitHistory(
  path: string,
  count: number = 10,
): Promise<
  { success: true; commits: CommitHistoryItem[] } | ActionResult
> {
  try {
    await requireEditorSession();
    const gh = await GithubHelper.create();
    const commits = await gh.getHistory(path, count);
    return { success: true, commits };
  } catch (err) {
    return authErrorResult(err);
  }
}
