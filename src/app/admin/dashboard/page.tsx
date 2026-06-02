"use client";

import Link from "next/link";
import GitHistory from "@/components/local/GitHistory";
import PageHeader from "@/components/local/PageHeader";
import AdminPanel from "@/components/local/AdminPanel";
import { useAdminUser } from "@/contexts/AdminUserContext";
import {
  FileText,
  ImageIcon,
  Files,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  {
    href: "/admin/dashboard/content/posts",
    label: "Άρθρα",
    description: "Δημοσίευση και διαχείριση blog",
    icon: FileText,
    color: "text-primary bg-primary/10",
  },
  {
    href: "/admin/dashboard/content/images",
    label: "Εικόνες",
    description: "Συλλογές φωτογραφιών",
    icon: ImageIcon,
    color: "text-emerald-700 bg-emerald-500/10",
  },
  {
    href: "/admin/dashboard/content/files",
    label: "Αρχεία",
    description: "PDF και έγγραφα για λήψη",
    icon: Files,
    color: "text-amber-700 bg-amber-500/10",
  },
  {
    href: "/admin/dashboard/settings",
    label: "Ρυθμίσεις",
    description: "Λογαριασμός και χρήστες",
    icon: Settings,
    color: "text-violet-700 bg-violet-500/10",
  },
];

export default function AdminDashboard() {
  const user = useAdminUser();

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Καλώς ήρθες, ${user.username}`}
        description="Γρήγορη πρόσβαση στις κύριες λειτουργίες διαχείρισης."
      >
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Προβολή ιστοσελίδας
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div
                className={cn(
                  "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  item.color,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>

      <AdminPanel>
        <GitHistory />
      </AdminPanel>
    </div>
  );
}
