import type { LucideIcon } from "lucide-react";
import { FileText, Home, Info, Settings } from "lucide-react";

export interface AdminNavChild {
  label: string;
  path: string;
}

export interface AdminNavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  children?: AdminNavChild[];
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Αρχική",
    icon: Home,
    path: "/admin/dashboard",
  },
  {
    label: "Περιεχόμενο",
    icon: FileText,
    path: "/admin/dashboard/content",
    children: [
      { label: "Άρθρα", path: "/admin/dashboard/content/posts" },
      { label: "Εικόνες", path: "/admin/dashboard/content/images" },
      { label: "Αρχεία", path: "/admin/dashboard/content/files" },
    ],
  },
  {
    label: "Χρήσιμα",
    icon: Info,
    path: "/admin/dashboard/useful",
  },
  {
    label: "Ρυθμίσεις",
    icon: Settings,
    path: "/admin/dashboard/settings",
  },
];

export const adminPageTitles: Record<string, string> = {
  "/admin/dashboard": "Πίνακας ελέγχου",
  "/admin/dashboard/content/posts": "Άρθρα",
  "/admin/dashboard/content/images": "Εικόνες",
  "/admin/dashboard/content/files": "Αρχεία",
  "/admin/dashboard/useful": "Χρήσιμοι σύνδεσμοι",
  "/admin/dashboard/settings": "Ρυθμίσεις",
};

export function getAdminPageTitle(pathname: string): string {
  if (adminPageTitles[pathname]) return adminPageTitles[pathname];
  if (pathname.startsWith("/admin/dashboard/content")) return "Περιεχόμενο";
  return "Dashboard";
}
