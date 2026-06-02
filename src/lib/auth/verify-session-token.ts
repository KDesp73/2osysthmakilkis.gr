import { jwtVerify } from "jose";

export type VerifiedSession = {
  username: string;
  role: "admin" | "user";
};

function getSecretKey(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** Edge-safe JWT verification (middleware). */
export async function verifySessionToken(
  token: string,
): Promise<VerifiedSession | null> {
  const key = getSecretKey();
  if (!key) return null;

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    const username = payload.username;
    const role = payload.role;
    if (typeof username !== "string") return null;
    if (role !== "admin" && role !== "user") return null;
    return { username, role };
  } catch {
    return null;
  }
}
