"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const path = usePathname();
  const isHome = path === "/";

  if (path.startsWith("/admin/")) {
    return children;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className={cn("flex-1", !isHome && "pattern-dots")}>
        {isHome ? (
          children
        ) : (
          <div className="site-container section-pad">{children}</div>
        )}
      </main>

      <Footer />
    </div>
  );
}
