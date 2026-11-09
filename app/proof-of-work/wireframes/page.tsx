import type { Metadata } from "next";
import { ProofOfWorkPage } from "@/components/ProofOfWork";
import { proofTitle } from "@/lib/site";

export const metadata: Metadata = { title: proofTitle("wireframes") };

export default function Page() {
  return <ProofOfWorkPage slug="wireframes" />;
}
