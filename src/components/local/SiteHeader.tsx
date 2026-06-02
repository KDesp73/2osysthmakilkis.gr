"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FolderOpen,
  Home,
  Images,
  Mail,
  Menu,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const siteTitle = "2ο Σύστημα Προσκόπων Κιλκίς";

const navItems: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Τμήματα", href: "/depts", icon: Users },
  { name: "Χρήσιμα", href: "/useful", icon: FolderOpen },
  { name: "Εικόνες", href: "/gallery", icon: Images },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const contactActive = isActivePath(pathname, "/contact");

  return (
    <header className="sticky top-0 z-50">
      <div className="scout-topbar h-1.5 w-full" aria-hidden />

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-card/95 shadow-lg backdrop-blur-xl"
            : "border-border/50 bg-card/80 backdrop-blur-md",
        )}
      >
        <div className="site-container flex min-h-[4.5rem] items-center gap-4 py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-md outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src="/logo.webp"
              alt={siteTitle}
              width={160}
              height={40}
              priority
            />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 lg:flex lg:justify-center"
            aria-label="Κύρια πλοήγηση"
          >
            <ul className="flex items-center gap-1" role="list">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2.5 text-sm font-semibold transition-colors rounded-lg",
                        active
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-primary hover:bg-muted",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.name}
                      {active && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-secondary"
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex",
                contactActive && "pointer-events-none",
              )}
            >
              <Button
                size="default"
                className={cn(
                  "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-md px-5",
                  contactActive && "opacity-90",
                )}
              >
                <Mail className="h-4 w-4" aria-hidden />
                Επικοινωνία
              </Button>
            </Link>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden rounded-full h-10 w-10 border-primary/20"
                  aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
                  aria-expanded={menuOpen}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[min(100vw-1rem,22rem)] flex-col gap-0 p-0 border-l-primary/20"
              >
                <div className="scout-topbar h-1 w-full" />
                <div className="border-b border-border bg-primary px-5 py-5 pr-12 text-primary-foreground">
                  <SheetTitle className="sr-only">Μενού πλοήγησης</SheetTitle>
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <Image
                      src="/logo.webp"
                      alt={siteTitle}
                      width={160}
                      height={40}
                      className="brightness-0 invert"
                    />
                  </Link>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Κύρια πλοήγηση">
                  <ul className="space-y-1" role="list">
                    <li>
                      <MobileNavLink
                        href="/"
                        label="Αρχική"
                        icon={Home}
                        active={pathname === "/"}
                        onNavigate={() => setMenuOpen(false)}
                      />
                    </li>
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <MobileNavLink
                          href={item.href}
                          label={item.name}
                          icon={item.icon}
                          active={isActivePath(pathname, item.href)}
                          onNavigate={() => setMenuOpen(false)}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-border p-4 bg-muted/50">
                  <SheetClose asChild>
                    <Link href="/contact" className="block">
                      <Button className="w-full gap-2 rounded-xl h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                        <Mail className="h-4 w-4" />
                        Επικοινωνία
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground hover:bg-muted",
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            active ? "bg-primary-foreground/15" : "bg-muted",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        {label}
      </Link>
    </SheetClose>
  );
}
