import type { Metadata } from "next";
import { ProofArticlePage } from "@/components/ProofArticle";
import { proofArticle, proofArticleParams } from "@/lib/site";

export function generateStaticParams() {
  return proofArticleParams("case-studies");
}

export async function generateMetadata({ params }: PageProps<"/proof-of-work/case-studies/[slug]">): Promise<Metadata> {
  const item = proofArticle("case-studies", (await params).slug);
  return { title: item ? `${item.title} · Bal Narayan Singh (BNS)` : undefined };
}

export default async function Page({ params }: PageProps<"/proof-of-work/case-studies/[slug]">) {
  return <ProofArticlePage section="case-studies" slug={(await params).slug} />;
}
