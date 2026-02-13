import { readFileSync, existsSync } from "fs";
import path from "path";
import { allSlugs, getEntryBySlug } from "./menu-config";

const CONTENT_DIR =
  process.env.CONTENT_DIR ||
  path.join(process.cwd(), "..", "FrontendInterviewBook");

function getContentPath(file: string): string {
  return path.join(CONTENT_DIR, file);
}

export function getContentBySlug(slug: string): string | null {
  const entry = getEntryBySlug(slug);
  if (!entry) return null;
  const filePath = getContentPath(entry.file);
  if (!existsSync(filePath)) return null;
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function getStaticSlugs(): string[] {
  return allSlugs;
}

/** Rough word count for read time (words per minute) */
const WPM = 200;
export function estimateReadTime(markdown: string): number {
  const text = markdown.replace(/```[\s\S]*?```/g, "").replace(/[#*\[\]()_`]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WPM));
}
