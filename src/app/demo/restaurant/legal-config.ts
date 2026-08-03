import { bodoni, jost, plexMono } from "../fonts";
import type { LegalBusiness, LegalTone } from "@/components/demo/legal-page";

export const tone: LegalTone = {
  page: `${bodoni.variable} ${jost.variable} ${plexMono.variable} min-h-screen bg-rst-ink font-rst-body text-rst-cream`,
  heading: "font-rst-display text-rst-cream",
  subheading: "font-rst-display text-rst-amber",
  body: "text-rst-sand",
  muted: "text-rst-sand/70",
  link: "text-rst-amber hover:text-rst-cream",
  rule: "bg-rst-line",
};

export const business: LegalBusiness = {
  name: "Trattoria Salvia",
  owner: "Matteo Salvia",
  street: "Milchstraße 14",
  city: "81667 München",
  phone: "089 000 00 00",
  email: "hallo@trattoria-salvia.example",
  extra: [{ label: "Umsatzsteuer-ID", value: "DE000000000" }],
  backHref: "/demo/restaurant/",
  conceptLabel: "Restaurant",
};
