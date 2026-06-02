import Image from "next/image";
import { cn } from "@/lib/utils";

/** Intrinsic size of /public/logo.webp */
const LOGO_INTRINSIC_WIDTH = 421;
const LOGO_INTRINSIC_HEIGHT = 317;

export const SITE_LOGO_ALT = "2ο Σύστημα Προσκόπων Κιλκίς";

export function siteLogoHeight(displayWidth: number): number {
  return Math.round((displayWidth / LOGO_INTRINSIC_WIDTH) * LOGO_INTRINSIC_HEIGHT);
}

type SiteLogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
  /**
   * Skip the image optimizer — needed inside Radix Sheet/Dialog portals
   * where lazy sizing often breaks.
   */
  unoptimized?: boolean;
};

export default function SiteLogo({
  width = 160,
  className,
  priority = false,
  unoptimized = false,
}: SiteLogoProps) {
  const height = siteLogoHeight(width);

  return (
    <Image
      src="/logo.webp"
      alt={SITE_LOGO_ALT}
      width={width}
      height={height}
      priority={priority}
      unoptimized={unoptimized}
      className={cn("h-auto max-w-full", className)}
      style={{ width, height: "auto" }}
    />
  );
}
