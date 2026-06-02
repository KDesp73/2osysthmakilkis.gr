"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth/session";
import { AdminUserContext } from "@/contexts/AdminUserContext";
import { logout } from "@/actions/auth";
import {
  adminNavItems,
  getAdminPageTitle,
} from "@/lib/admin-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  user: SessionUser;
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  nested,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  active: boolean;
  nested?: boolean;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
        nested && !collapsed && "pl-9 py-2 text-[0.8125rem]",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 opacity-90" />}
      {!collapsed && label && <span className="truncate">{label}</span>}
    </Link>
  );
}

export default function AdminDashboardLayout({ children, user }: Props) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pageTitle = getAdminPageTitle(pathname);

  const handleLogout = () => {
    startTransition(() => {
      void logout();
    });
  };

  const closeMobileSidebar = () => setSidebarOpen(false);

  const sidebarContent = (
    <>
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4 gap-3",
          sidebarCollapsed && "lg:justify-center lg:px-2",
        )}
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 min-w-0"
          onClick={closeMobileSidebar}
        >
          <Image
            src="/logo.webp"
            alt="2ο Σύστημα"
            width={120}
            height={32}
            className={cn("h-8 w-auto", sidebarCollapsed && "lg:hidden")}
          />
          {sidebarCollapsed && (
            <span className="hidden lg:inline text-xs font-bold text-sidebar-primary">
              2ο
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden shrink-0"
          onClick={closeMobileSidebar}
          aria-label="Κλείσιμο μενού"
        >
          <PanelLeftClose className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden lg:flex shrink-0 text-sidebar-foreground"
          onClick={() => setSidebarCollapsed((c) => !c)}
          aria-label={sidebarCollapsed ? "Άνοιγμα πλευρικής στήλης" : "Σύμπτυξη"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="admin-scrollbar flex-1 overflow-y-auto p-3 space-y-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.path} className="space-y-0.5">
              <NavLink
                href={item.children ? item.children[0].path : item.path}
                label={item.label}
                icon={Icon}
                collapsed={sidebarCollapsed}
                active={
                  item.children
                    ? (item.children.some((c) => pathname === c.path) ?? false)
                    : pathname === item.path
                }
                onNavigate={closeMobileSidebar}
              />
              {item.children && !sidebarCollapsed && (
                <div className="space-y-0.5 pt-0.5">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      href={child.path}
                      label={child.label}
                      active={pathname === child.path}
                      nested
                      onNavigate={closeMobileSidebar}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-3">
        {!sidebarCollapsed && (
          <div className="rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
            <p className="text-xs text-sidebar-foreground/60 mb-0.5">
              Συνδεδεμένος ως
            </p>
            <p className="text-sm font-semibold truncate text-sidebar-foreground">
              {user.username}
            </p>
            <Badge
              variant="secondary"
              className="mt-2 text-[0.65rem] uppercase tracking-wide"
            >
              {user.role === "admin" ? "Διαχειριστής" : "Συντάκτης"}
            </Badge>
          </div>
        )}
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isPending}
          className={cn(
            "w-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30",
            sidebarCollapsed && "lg:px-0",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Αποσύνδεση</span>}
        </Button>
      </div>
    </>
  );

  return (
    <AdminUserContext.Provider value={user}>
      <div className="flex min-h-screen bg-muted/50">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeMobileSidebar}
            aria-label="Κλείσιμο overlay"
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl transition-all duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:shadow-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            sidebarCollapsed ? "w-[4.5rem]" : "w-72",
          )}
        >
          {sidebarContent}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex shrink-0 flex-col">
            <div className="scout-topbar h-1 w-full shrink-0" aria-hidden />
            <div className="flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setSidebarOpen(true)}
              aria-label="Άνοιγμα μενού"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
              <Link
                href="/"
                className="hidden sm:inline text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                Ιστοσελίδα
              </Link>
              <ChevronRight className="hidden sm:inline h-4 w-4 text-muted-foreground/50 shrink-0" />
              <span className="font-semibold text-foreground truncate">
                {pageTitle}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="hidden sm:inline-flex">
                {user.role === "admin" ? "Admin" : "Editor"}
              </Badge>
              <span className="hidden md:inline text-sm text-muted-foreground max-w-[8rem] truncate">
                {user.username}
              </span>
            </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminUserContext.Provider>
  );
}
