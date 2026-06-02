"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { turso } from "@/lib/turso";
import { verifyPassword } from "@/lib/auth";
import type { SessionUser } from "@/lib/auth";

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 3600,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export type LoginState = {
  success: boolean;
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { success: false, error: "Username and password are required" };
  }

  if (
    ADMIN_USER &&
    ADMIN_PASS &&
    username === ADMIN_USER &&
    password === ADMIN_PASS
  ) {
    const token = jwt.sign({ username, role: "admin" }, getJwtSecret(), {
      expiresIn: "1h",
    });
    await setAuthCookie(token);
    redirect("/admin/dashboard");
  }

  try {
    const result = await turso.execute({
      sql: "SELECT username, password FROM users WHERE username = ?",
      args: [username],
    });

    if (result.rows.length === 0) {
      return { success: false, error: "Invalid credentials" };
    }

    const user = result.rows[0];
    const hashedPass = user.password?.toString() as string;
    const validPass = await verifyPassword(password, hashedPass);
    if (!validPass) {
      return { success: false, error: "Invalid credentials" };
    }

    const token = jwt.sign({ username, role: "user" }, getJwtSecret(), {
      expiresIn: "1h",
    });
    await setAuthCookie(token);
    redirect("/admin/dashboard");
  } catch (err) {
    console.error("DB error:", err);
    return { success: false, error: "Server error" };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "authToken",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin/login");
}

export async function getSessionAction(): Promise<SessionUser | null> {
  const { getSession } = await import("@/lib/auth/session");
  return getSession();
}
