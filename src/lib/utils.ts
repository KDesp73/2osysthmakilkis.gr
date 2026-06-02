import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type { UploadItem } from "@/lib/admin/types";

import type { UploadItem } from "@/lib/admin/types";
import { uploadContent as uploadContentAction } from "@/actions/admin/content";

/**
 * Upload one or more content items (blogs, files, images) via Server Action.
 */
export async function uploadContent(items: UploadItem[]) {
  const result = await uploadContentAction(items);
  if (!result.success) {
    return { success: false as const, error: result.error ?? "Upload failed" };
  }
  return { success: true as const };
}

function greekToLatin(str: string) {
  const map: Record<string, string> = {
    α: "a",
    β: "b",
    γ: "g",
    δ: "d",
    ε: "e",
    ζ: "z",
    η: "i",
    θ: "th",
    ι: "i",
    κ: "k",
    λ: "l",
    μ: "m",
    ν: "n",
    ξ: "x",
    ο: "o",
    π: "p",
    ρ: "r",
    σ: "s",
    τ: "t",
    υ: "y",
    φ: "f",
    χ: "ch",
    ψ: "ps",
    ω: "o",
    ά: "a",
    έ: "e",
    ή: "i",
    ί: "i",
    ό: "o",
    ύ: "y",
    ώ: "o",
    ς: "s",
    Ά: "A",
    Έ: "E",
    Ή: "I",
    Ί: "I",
    Ό: "O",
    Ύ: "Y",
    Ώ: "O",
  };
  return str
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

export function slugify(title: string): string {
  const latinTitle = greekToLatin(title.toLowerCase());
  return latinTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
