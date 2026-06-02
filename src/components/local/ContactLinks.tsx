import { Facebook, Instagram, Mail, Phone, Pin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContactLinksProps {
  className?: string;
}

export default function ContactLinks({ className }: ContactLinksProps) {
  return (
    <ul className={cn("space-y-3 text-muted-foreground", className)}>
      <li className="flex items-center gap-2.5">
        <Mail className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <Link href="mailto:2p_kilkis@sep.org.gr" className="hover:underline">
          2p_kilkis@sep.org.gr
        </Link>
      </li>
      <li className="flex items-center gap-2.5">
        <Pin className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <Link
          href="https://maps.app.goo.gl/riqzmUYBYEczAer39"
          className="hover:underline"
        >
          Παπαγιαννάκου 1, Κιλκίς, 61100
        </Link>
      </li>
      <li className="flex items-center gap-2.5">
        <Phone className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <Link href="tel:+306981927806" className="hover:underline">
          +30 698 192 7806 (Στάθης Ιορδανίδης)
        </Link>
      </li>
      <li className="flex items-center gap-2.5">
        <Facebook className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <Link
          href="https://www.facebook.com/profile.php?id=61577586039297"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Facebook
        </Link>
      </li>
      <li className="flex items-center gap-2.5">
        <Instagram className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <Link
          href="https://www.instagram.com/2osystimakilkis"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Instagram
        </Link>
      </li>
    </ul>
  );
}
