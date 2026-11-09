import type { Metadata } from "next";
import { ProofArticlePage } from "@/components/ProofArticle";
import { proofArticle, proofArticleParams } from "@/lib/site";

export function generateStaticParams() {
  return proofArticleParams("research-writings");
}

export async function generateMetadata({ params }: PageProps<"/proof-of-work/research-writings/[slug]">): Promise<Metadata> {
  const item = proofArticle("research-writings", (await params).slug);
  return { title: item ? `${item.title} · Bal Narayan Singh (BNS)` : undefined };
}

export default async function Page({ params }: PageProps<"/proof-of-work/research-writings/[slug]">) {
  return <ProofArticlePage section="research-writings" slug={(await params).slug} />;
}
