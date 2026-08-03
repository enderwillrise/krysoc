import { newsreader, manrope, plexMono } from "../fonts";
import type { LegalBusiness, LegalTone } from "@/components/demo/legal-page";

export const tone: LegalTone = {
  page: `${newsreader.variable} ${manrope.variable} ${plexMono.variable} min-h-screen bg-prx-paper font-prx-body text-prx-body`,
  heading: "font-prx-display text-prx-ink",
  subheading: "font-prx-display text-prx-teal",
  body: "text-prx-body",
  muted: "text-prx-mute",
  link: "text-prx-teal hover:text-prx-teal-deep",
  rule: "bg-prx-line",
};

/**
 * Doctors have extra mandatory Impressum content in Germany (Berufsbezeichnung,
 * Kammer, KV, Berufsordnung) — a detail most practice websites get wrong, and
 * a good thing to show a prospect that we know about.
 */
export const business: LegalBusiness = {
  name: "Praxis am Lindenplatz",
  owner: "Dr. med. Julia Behrend",
  street: "Lindenplatz 6",
  city: "81371 München",
  phone: "089 000 00 00",
  email: "praxis@lindenplatz.example",
  extra: [
    { label: "Berufsbezeichnung", value: "Ärztin (verliehen in der Bundesrepublik Deutschland)" },
    { label: "Zuständige Kammer", value: "Bayerische Landesärztekammer, München" },
    { label: "Kassenärztliche Vereinigung", value: "Kassenärztliche Vereinigung Bayerns" },
    { label: "Berufsrechtliche Regelungen", value: "Berufsordnung für die Ärzte Bayerns, einsehbar bei der Landesärztekammer" },
  ],
  backHref: "/demo/praxis/",
  conceptLabel: "Arztpraxis",
};
