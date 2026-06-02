"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Map from "@/components/local/Map";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Compass, Heart } from "lucide-react";

const sections = [
  {
    label: "Αγέλη",
    accent: "border-scout-cub/40 bg-scout-cub/15",
    iconBg: "bg-scout-cub text-foreground",
    icon: Heart,
    text: "Οι μικροί μας στην Αγέλη (Α΄– Δ΄ Δημοτικού) μαθαίνουν να συνεργάζονται μέσα από παιχνίδι και φαντασία.",
  },
  {
    label: "Ομάδα",
    accent: "border-scout-pack/30 bg-scout-pack/10",
    iconBg: "bg-scout-pack text-primary-foreground",
    icon: Compass,
    text: "Η Ομάδα (Ε΄ Δημοτικού – Β΄ Γυμνασίου) ζει τις πρώτες μεγάλες εξερευνήσεις και περιπέτειες.",
  },
  {
    label: "Κοινότητα",
    accent: "border-scout-community/30 bg-scout-community/10",
    iconBg: "bg-scout-community text-primary-foreground",
    icon: Users,
    text: "Η Κοινότητα Ανιχνευτών (Γ΄ Γυμνασίου – Γ΄ Λυκείου) παίρνει πρωτοβουλίες, σχεδιάζει δράσεις και αφήνει το δικό της αποτύπωμα στην κοινωνία.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Full-bleed hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[520px]">
          <img
            src="/banner.jpg"
            alt="Δράσεις του 2ου Συστήματος Προσκόπων Κιλκίς"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
          <div
            className="absolute inset-0 opacity-30 pattern-dots"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-12 pt-24 text-center sm:px-8 sm:pb-16 md:pb-20"
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
              2ο Σύστημα Προσκόπων Κιλκίς
            </span>
            <h1 className="font-display max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Καλωσήρθατε — μια παρέα που μεγαλώνει, εξερευνά και προσφέρει
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/90 md:text-lg">
              Εδώ και 50 χρόνια γελάμε, παίζουμε και χτίζουμε χαρακτήρα μέσα από
              τη φύση και την κοινότητα.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/depts">
                <Button
                  size="lg"
                  className="gap-2 rounded-full bg-secondary px-6 text-secondary-foreground shadow-lg hover:bg-secondary/90 font-semibold"
                >
                  Τα τμήματά μας
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-full border-white/50 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
                >
                  Επικοινωνία
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="scout-topbar h-1 w-full" aria-hidden />
      </section>

      {/* Age sections */}
      <section className="site-container section-pad">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Τα τμήματά μας
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Κάθε ηλικιακή ομάδα έχει τον δικό της ρυθμό, στόχους και περιπέτειες.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {sections.map(({ label, accent, iconBg, icon: Icon, text }, i) => (
            <motion.article
              key={label}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`card-elevated flex flex-col gap-5 border-2 p-6 md:p-7 ${accent}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${iconBg}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                {text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="bg-muted/60 border-y border-border">
        <div className="site-container section-pad">
          <div className="card-elevated overflow-hidden p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-6 text-center md:text-left md:text-2xl">
              Πού θα μας βρείτε
            </h2>
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}
