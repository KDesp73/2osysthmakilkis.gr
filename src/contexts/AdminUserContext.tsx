"use client";

import { createContext, useContext } from "react";
import type { SessionUser } from "@/lib/auth/session";

export const AdminUserContext = createContext<SessionUser | null>(null);

export function useAdminUser(): SessionUser {
  const user = useContext(AdminUserContext);
  if (!user) {
    throw new Error("useAdminUser must be used within AdminDashboardLayout");
  }
  return user;
}
