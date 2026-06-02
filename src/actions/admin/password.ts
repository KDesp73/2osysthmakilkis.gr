"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { verifyPassword, hashPassword } from "@/lib/auth";
import { turso } from "@/lib/turso";
import { authErrorResult } from "@/lib/auth/session";
import type { ActionResult } from "./content";

export async function changePassword(
  oldPassword: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return { success: false, error: "Server misconfiguration" };
    }

    let username: string;
    try {
      const decoded = jwt.verify(token, secret) as { username: string };
      username = decoded.username;
    } catch {
      return { success: false, error: "Invalid token" };
    }

    const dbUser = await turso.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    if (dbUser.rows.length === 0) {
      return { success: false, error: "User not found" };
    }

    const hashedPassword = dbUser.rows[0].password as string;
    const valid = await verifyPassword(oldPassword, hashedPassword);
    if (!valid) {
      return { success: false, error: "Old password incorrect" };
    }

    const newHashed = await hashPassword(newPassword);
    await turso.execute({
      sql: "UPDATE users SET password = ? WHERE username = ?",
      args: [newHashed, username],
    });

    return { success: true, message: "Password updated successfully" };
  } catch (err) {
    console.error(err);
    return authErrorResult(err);
  }
}
