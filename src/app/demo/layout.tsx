import type { Metadata } from "next";
import { DemoReveal } from "@/components/demo/reveal";
import "./demo.css";

/**
 * Concept-demo root layout — a THIRD root layout, sibling to
 * `[locale]/layout.tsx` (marketing) and `kadenz/layout.tsx` (internal tool).
 * There is still no `src/app/layout.tsx`; adding one would break all three.
 *
 * These pages are sales collateral: fictional businesses shown to prospects so
 * they can see what their own site would look like. They deliberately share
 * NOTHING visual with the Krysoc site — own stylesheet (`demo.css`), own
 * palettes, own fonts (declared per page, since each demo uses a different
 * pair and there is no reason to ship six families to every page).
 *
 * German-only, on purpose: the audience is German local businesses. These are
 * exempt from the `dictionary.ts` bilingual rule the marketing site follows.
 *
 * `noindex` is mandatory. A fictional Arztpraxis must never surface in search
 * or be mistaken for a real practice — that, plus the concept bar on every
 * page, is what keeps these honest.
 */

export const metadata: Metadata = {
  title: {
    default: "Konzepte — Krysoc",
    template: "%s — Konzept von Krysoc",
  },
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <DemoReveal />
        {children}
      </body>
    </html>
  );
}
