import { llmsFull } from "@/lib/agent-markdown";

// The whole site, every write-up included, as one Markdown file for AI agents.
export function GET() {
  return new Response(llmsFull(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
