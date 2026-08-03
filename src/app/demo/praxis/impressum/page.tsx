import type { Metadata } from "next";
import { ImpressumPage } from "@/components/demo/legal-page";
import { tone, business } from "../legal-config";

export const metadata: Metadata = { title: "Impressum — Praxis am Lindenplatz" };

export default function Page() {
  return <ImpressumPage tone={tone} business={business} />;
}
