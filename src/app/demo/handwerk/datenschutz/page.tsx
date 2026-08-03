import type { Metadata } from "next";
import { DatenschutzPage } from "@/components/demo/legal-page";
import { tone, business } from "../legal-config";

export const metadata: Metadata = { title: "Datenschutz — Hartmann Haustechnik" };

export default function Page() {
  return <DatenschutzPage tone={tone} business={business} />;
}
