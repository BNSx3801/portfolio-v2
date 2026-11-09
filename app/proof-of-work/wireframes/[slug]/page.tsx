import type { Metadata } from "next";
import { ProofArticlePage } from "@/components/ProofArticle";
import { proofArticle, proofArticleParams } from "@/lib/site";

export function generateStaticParams() {
  return proofArticleParams("wireframes");
}

export async function generateMetadata({ params }: PageProps<"/proof-of-work/wireframes/[slug]">): Promise<Metadata> {
  const item = proofArticle("wireframes", (await params).slug);
  return { title: item ? `${item.title} · Bal Narayan Singh (BNS)` : undefined };
}

export default async function Page({ params }: PageProps<"/proof-of-work/wireframes/[slug]">) {
  return <ProofArticlePage section="wireframes" slug={(await params).slug} />;
}
