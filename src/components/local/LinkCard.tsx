import { ExternalLink, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  name: string;
  description: string;
  href: string;
}

export default function LinkCard({ name, description, href }: LinkCardProps) {
  return (
    <article
      className={cn(
        "card-elevated flex h-full flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10",
        "p-6 sm:p-7 md:p-8 gap-5 md:gap-6",
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/25 text-secondary-foreground ring-1 ring-secondary/30">
          <LinkIcon className="h-5 w-5 text-primary" aria-hidden />
        </span>
        <h3 className="font-display text-base font-semibold leading-snug pt-1.5 md:text-lg">
          {name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-5 md:gap-6">
        {description ? (
          <p className="text-sm text-muted-foreground flex-1 leading-relaxed md:text-base">
            {description}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className={cn(
              "h-11 w-full gap-2 rounded-xl border-primary/20 px-5",
              "hover:bg-primary hover:text-primary-foreground",
            )}
          >
            Άνοιγμα
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
