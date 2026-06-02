import SocialButtons from "./SocialButtons";
import Link from "next/link";
import ContactLinks from "./ContactLinks";

const quickLinks = [
  { name: "Τμήματα", href: "/depts" },
  { name: "Χρήσιμα", href: "/useful" },
  { name: "Εικόνες", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Επικοινωνία", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="h-1 w-full bg-secondary" aria-hidden />

      <div className="site-container grid grid-cols-1 gap-10 py-12 md:grid-cols-3 md:py-16">
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold">
            2ο Σύστημα Προσκόπων Κιλκίς
          </h3>
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            Εδώ και 50 χρόνια είμαστε μια παρέα που μεγαλώνει, γελάει, εξερευνά,
            παίζει και προσφέρει.
          </p>
          <SocialButtons />
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-secondary">
            Γρήγοροι σύνδεσμοι
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-primary-foreground/75 transition-colors hover:text-secondary"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-secondary">
            Επικοινωνία
          </h3>
          <ContactLinks className="text-primary-foreground/80 [&_a]:text-inherit [&_a]:hover:text-secondary" />
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-sm text-primary-foreground/60">
        &copy; {new Date().getFullYear()} 2ο Σύστημα Προσκόπων Κιλκίς
      </div>
    </footer>
  );
}
