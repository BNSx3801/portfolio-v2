import type { Metadata } from "next";
import { ProofSeriesPartPage } from "@/components/ProofArticle";
import { proofArticle, proofSeriesParams } from "@/lib/site";

export function generateStaticParams() {
  return proofSeriesParams("case-studies");
}

export async function generateMetadata({ params }: PageProps<"/proof-of-work/case-studies/[slug]/[part]">): Promise<Metadata> {
  const { slug, part } = await params;
  const title = proofArticle("case-studies", slug)?.article?.parts?.find((p) => p.slug === part)?.title;
  return { title: title ? `${title} · Bal Narayan Singh (BNS)` : undefined };
}

export default async function Page({ params }: PageProps<"/proof-of-work/case-studies/[slug]/[part]">) {
  const { slug, part } = await params;
  return <ProofSeriesPartPage section="case-studies" slug={slug} part={part} />;
}
