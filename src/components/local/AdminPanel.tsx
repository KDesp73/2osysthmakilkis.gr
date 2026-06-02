import { cn } from "@/lib/utils";

interface AdminPanelProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

/** Consistent content panel for admin pages */
export default function AdminPanel({
  children,
  className,
  noPadding,
}: AdminPanelProps) {
  return (
    <div
      className={cn(
        "card-elevated rounded-2xl",
        !noPadding && "p-4 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
