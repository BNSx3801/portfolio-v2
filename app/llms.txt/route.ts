import { llmsIndex } from "@/lib/agent-markdown";

// Index of the site for AI agents (llmstxt.org). Plain text so browsers show it instead of downloading it.
export function GET() {
  return new Response(llmsIndex(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
