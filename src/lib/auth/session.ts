import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type UserRole = "admin" | "user";

export interface SessionUser {
  username: string;
  role: UserRole;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: "UNAUTHORIZED" | "FORBIDDEN" = "UNAUTHORIZED",
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as {
      username: string;
      role: string;
    };
    if (decoded.role !== "admin" && decoded.role !== "user") return null;
    return { username: decoded.username, role: decoded.role as UserRole };
  } catch {
    return null;
  }
}

export async function requireEditorSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new AuthError("Unauthorized", "UNAUTHORIZED");
  }
  return session;
}

export async function requireAdminSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new AuthError("Unauthorized", "UNAUTHORIZED");
  }
  if (session.role !== "admin") {
    throw new AuthError("Forbidden", "FORBIDDEN");
  }
  return session;
}

export function authErrorResult(error: unknown): {
  success: false;
  error: string;
} {
  if (error instanceof AuthError) {
    return {
      success: false,
      error: error.code === "FORBIDDEN" ? "Forbidden" : "Unauthorized",
    };
  }
  if (error instanceof Error) {
    return { success: false, error: error.message };
  }
  return { success: false, error: "Something went wrong" };
}
