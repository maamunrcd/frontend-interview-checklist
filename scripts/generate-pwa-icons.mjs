#!/usr/bin/env node
/**
 * Generates icon-192.png and icon-512.png from public/icon.svg for PWA.
 * Run: node scripts/generate-pwa-icons.mjs (requires: pnpm add -D sharp)
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const svgPath = join(publicDir, "icon.svg");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Run: pnpm add -D sharp");
    process.exit(1);
  }
  const svg = readFileSync(svgPath);
  for (const size of [192, 512]) {
    const out = join(publicDir, `icon-${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(out);
    console.log("Wrote", out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
