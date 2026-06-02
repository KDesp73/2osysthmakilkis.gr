import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token || !JWT_SECRET) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    if (decoded.role !== "admin" && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
