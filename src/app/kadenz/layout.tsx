import type { Metadata } from "next";
import Link from "next/link";
import { Unbounded, Archivo, IBM_Plex_Mono } from "next/font/google";
import { runs, tenants } from "@/lib/kadenz/fixtures";
import "../globals.css";

/**
 * Kadenz root layout — a SECOND root layout alongside `[locale]/layout.tsx`.
 *
 * Kadenz is an internal tool, not part of the marketing site: it is
 * English-only (deliberately outside the `dictionary.ts` bilingual rule),
 * noindexed, and shares only the design tokens. Keeping it on its own root
 * means a change here can never alter the marketing pages' document shell.
 *
 * Fonts are re-declared rather than imported from the locale layout because
 * each root layout owns its own <html>/<body>, and next/font sets its CSS
 * variables on <body>.
 */

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Kadenz", template: "%s — Kadenz" },
  description: "Daily branded social content, approved before it posts.",
  // Unlisted, not private. Keep this noindex until the tool moves to a host
  // with real auth — see CLAUDE.md § Kadenz.
  robots: { index: false, follow: false },
};

// `trailingSlash: true` — internal links need the slash or they cost a
// redirect hop on Pages.
const NAV = [
  { href: "/kadenz/", label: "Brands" },
  { href: "/kadenz/queue/", label: "Queue" },
  { href: "/kadenz/health/", label: "Health" },
];

export default function KadenzLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pending = runs.filter((r) => r.status === "awaiting_approval").length;
  const failing = runs.filter(
    (r) => r.status === "publish_failed" || r.status === "qa_failed",
  ).length;

  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${archivo.variable} ${plexMono.variable}`}
      >
        <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
          <aside className="border-b border-line bg-coal lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
            <div className="flex items-center gap-3 px-6 py-6">
              <span
                className="dot"
                style={{ background: "var(--color-gold)" }}
                aria-hidden
              />
              <span className="font-display text-lg font-semibold tracking-tight">
                Kadenz
              </span>
              <span className="eyebrow ml-auto">prototype</span>
            </div>

            <nav className="flex gap-1 px-3 pb-4 lg:flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-stone transition-colors hover:bg-card hover:text-ivory"
                >
                  <span>{item.label}</span>
                  {item.label === "Queue" && pending > 0 ? (
                    <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-obsidian">
                      {pending}
                    </span>
                  ) : null}
                  {item.label === "Health" && failing > 0 ? (
                    <span className="rounded-full bg-rust px-2 py-0.5 text-xs font-medium text-obsidian">
                      {failing}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="hidden px-6 lg:block">
              <p className="eyebrow mb-3">Brands</p>
              <ul className="space-y-1">
                {tenants.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/kadenz/brands/${t.slug}/`}
                      className="block rounded-lg px-3 py-1.5 text-sm text-stone transition-colors hover:bg-card hover:text-ivory"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden px-6 pt-8 lg:block">
              <p className="text-xs leading-relaxed text-stone-dim">
                Mock data. Nothing here is connected to a live account.
              </p>
            </div>
          </aside>

          <main className="px-6 py-8 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
