import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageTitle({
  title,
  subtitle,
  className,
}: PageTitleProps) {
  return (
    <header className={cn("mb-8 md:mb-10", className)}>
      <div className="relative pl-5 md:pl-6">
        <span
          className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-secondary"
          aria-hidden
        />
        <span
          className="absolute left-0 top-1 h-3 w-1 rounded-full bg-primary"
          aria-hidden
        />
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-3xl leading-relaxed pl-5 md:pl-6">
          {subtitle}
        </p>
      )}
    </header>
  );
}
