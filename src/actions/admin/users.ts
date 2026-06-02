"use server";

import {
  authErrorResult,
  requireAdminSession,
} from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth";
import { turso } from "@/lib/turso";
import type { ActionResult } from "./content";

export type UserRow = {
  id: number;
  username: string;
};

export async function listUsers(): Promise<
  { success: true; users: UserRow[] } | ActionResult
> {
  try {
    await requireAdminSession();
    const result = await turso.execute("SELECT id, username FROM users");
    const users = result.rows.map((row) => ({
      id: Number(row.id),
      username: String(row.username),
    }));
    return { success: true, users };
  } catch (err) {
    return authErrorResult(err);
  }
}

export async function createUser(
  username: string,
  password: string,
): Promise<ActionResult> {
  try {
    await requireAdminSession();
    if (!username || !password) {
      return { success: false, error: "Missing fields" };
    }
    const hashedPass = await hashPassword(password);
    await turso.execute({
      sql: "INSERT INTO users (username, password) VALUES (?, ?)",
      args: [username, hashedPass],
    });
    return { success: true };
  } catch (err) {
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return { success: false, error: "Username already exists" };
    }
    return authErrorResult(err);
  }
}

export async function deleteUser(id: number): Promise<ActionResult> {
  try {
    await requireAdminSession();
    if (id == null) {
      return { success: false, error: "Missing ID" };
    }
    await turso.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [id],
    });
    return { success: true };
  } catch (err) {
    return authErrorResult(err);
  }
}
