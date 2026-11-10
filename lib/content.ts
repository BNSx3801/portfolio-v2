import { readFileSync } from "node:fs";
import path from "node:path";

// Markdown copy under content/, e.g. readContent("case-studies", "sui-network").
// Synchronous on purpose: async file reads would stop the pages and routes from prerendering.
export function readContent(...segments: string[]) {
  return readFileSync(path.join(process.cwd(), "content", ...segments) + ".md", "utf8");
}
