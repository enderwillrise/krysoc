import type { Metadata } from "next";
import { ImpressumPage } from "@/components/demo/legal-page";
import { tone, business } from "../legal-config";

export const metadata: Metadata = { title: "Impressum — Trattoria Salvia" };

export default function Page() {
  return <ImpressumPage tone={tone} business={business} />;
}
