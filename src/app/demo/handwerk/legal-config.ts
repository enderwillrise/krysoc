import { barlowCondensed, barlow, plexMono } from "../fonts";
import type { LegalBusiness, LegalTone } from "@/components/demo/legal-page";

export const tone: LegalTone = {
  page: `${barlowCondensed.variable} ${barlow.variable} ${plexMono.variable} min-h-screen bg-hwk-white font-hwk-body text-hwk-slate`,
  heading: "font-hwk-display font-bold uppercase tracking-tight text-hwk-steel",
  subheading: "font-hwk-display uppercase tracking-tight text-hwk-signal",
  body: "text-hwk-grey",
  muted: "text-hwk-grey",
  link: "text-hwk-signal hover:text-hwk-flame",
  rule: "bg-hwk-line",
};

/** Handwerk carries its own mandatory Impressum rows: Handwerkskammer + Meister. */
export const business: LegalBusiness = {
  name: "Hartmann Haustechnik GmbH",
  owner: "Geschäftsführer: Tobias Hartmann",
  street: "Tegernseer Landstraße 88",
  city: "81541 München",
  phone: "089 000 00 00",
  email: "buero@hartmann-haustechnik.example",
  extra: [
    { label: "Registereintrag", value: "Amtsgericht München, HRB 000000" },
    { label: "Umsatzsteuer-ID", value: "DE000000000" },
    { label: "Berufsbezeichnung", value: "Installateur- und Heizungsbauermeister (verliehen in Deutschland)" },
    { label: "Zuständige Kammer", value: "Handwerkskammer für München und Oberbayern" },
    { label: "Eintragung", value: "Handwerksrolle der HWK München, Anlage A" },
  ],
  backHref: "/demo/handwerk/",
  conceptLabel: "Handwerksbetrieb",
};
