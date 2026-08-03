import type { Metadata } from "next";
import Link from "next/link";
import { bodoni, jost, plexMono } from "../fonts";
import { ConceptBar } from "@/components/demo/concept-bar";
import { OpenStatus, type WeekHours } from "@/components/demo/open-status";
import { MenuTabs } from "@/components/demo/menu-tabs";
import { Photo } from "@/components/demo/photo";

export const metadata: Metadata = {
  title: "Trattoria Salvia — Restaurant",
};

// Mo closed; Tue–Sat lunch + dinner; Sun lunch only. Index 0 = Sunday.
const HOURS: WeekHours = [
  [{ from: "12:00", to: "21:00" }],
  [],
  [{ from: "11:30", to: "14:30" }, { from: "17:30", to: "23:00" }],
  [{ from: "11:30", to: "14:30" }, { from: "17:30", to: "23:00" }],
  [{ from: "11:30", to: "14:30" }, { from: "17:30", to: "23:00" }],
  [{ from: "11:30", to: "14:30" }, { from: "17:30", to: "23:30" }],
  [{ from: "17:30", to: "23:30" }],
];

const HOURS_TABLE = [
  { day: "Montag", time: "Ruhetag" },
  { day: "Dienstag – Donnerstag", time: "11:30 – 14:30 · 17:30 – 23:00" },
  { day: "Freitag", time: "11:30 – 14:30 · 17:30 – 23:30" },
  { day: "Samstag", time: "17:30 – 23:30" },
  { day: "Sonntag", time: "12:00 – 21:00" },
];

const LUNCH = [
  { day: "Di", dish: "Pasta e Fagioli", note: "Bohnensuppe, Rosmarinöl", price: "11,50" },
  { day: "Mi", dish: "Pollo al Limone", note: "Zitronenhähnchen, Ofenkartoffeln", price: "12,90" },
  { day: "Do", dish: "Lasagne della Casa", note: "Wie immer, nur besser", price: "12,50" },
  { day: "Fr", dish: "Frittura di Pesce", note: "Fritto misto, Aioli", price: "14,50" },
];

const NAV = [
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#mittagstisch", label: "Mittagstisch" },
  { href: "#haus", label: "Das Haus" },
  { href: "#anfahrt", label: "Anfahrt" },
];

export default function RestaurantDemo() {
  return (
    <div className={`${bodoni.variable} ${jost.variable} ${plexMono.variable} bg-rst-ink font-rst-body text-rst-cream`}>
      <ConceptBar label="Restaurant" />

      {/* ---------- Nav ---------- */}
      <header className="border-b border-rst-line/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <span className="font-rst-display text-lg tracking-wide text-rst-cream">
            Trattoria <span className="italic text-rst-amber">Salvia</span>
          </span>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-rst-sand transition-colors hover:text-rst-cream"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#reservierung"
            className="rounded-full border border-rst-amber px-4 py-2 text-sm text-rst-amber transition-colors hover:bg-rst-amber hover:text-rst-ink"
          >
            Tisch reservieren
          </a>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="rst-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="d-rise d-rise-1 font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
              Italienische Küche · München-Haidhausen
            </p>
            <h1 className="d-rise d-rise-2 mt-6 font-rst-display text-5xl leading-[1.05] text-rst-cream sm:text-6xl">
              Wie bei Nonna.
              <span className="mt-2 block italic text-rst-amber">Nur mit Reservierung.</span>
            </h1>
            <p className="d-rise d-rise-3 mt-7 max-w-md text-lg leading-relaxed text-rst-sand">
              Seit 1998 kochen wir, was gerade Saison hat: Pasta von Hand,
              Fisch vom Markt, Ragù, das vier Stunden Zeit bekommt. 42 Plätze,
              ein Ofen, keine Eile.
            </p>
            <div className="d-rise d-rise-4 mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#reservierung"
                className="rounded-full bg-rst-amber px-7 py-3.5 font-medium text-rst-ink transition-colors hover:bg-rst-cream"
              >
                Tisch reservieren
              </a>
              <a
                href="#speisekarte"
                className="rounded-full border border-rst-line px-7 py-3.5 text-rst-cream transition-colors hover:border-rst-amber"
              >
                Zur Speisekarte
              </a>
            </div>
            <div className="d-rise d-rise-4 mt-8">
              <OpenStatus
                hours={HOURS}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs"
                toneOpen="border-rst-olive/60 text-rst-olive"
                toneClosed="border-rst-line text-rst-sand"
              />
            </div>
          </div>

          <div className="d-rise d-rise-3 grid grid-cols-2 gap-4">
            <Photo
              src="/img/rst-pasta.webp"
              alt="Tagliatelle mit Ragù auf einem dunklen Holztisch"
              tint="rst-photo"
              className="aspect-3/4 rounded-2xl"
              priority
              sizes="(min-width: 1024px) 22vw, 45vw"
            />
            <div className="mt-10 space-y-4">
              <Photo
                src="/img/rst-room.webp"
                alt="Gastraum der Trattoria am Abend"
                tint="rst-photo rst-photo-olive"
                className="aspect-square rounded-2xl"
                sizes="(min-width: 1024px) 22vw, 45vw"
              />
              <Photo
                src="/img/rst-antipasti.webp"
                alt="Antipasti mit Burrata und Ofentomaten"
                tint="rst-photo rst-photo-wine"
                className="aspect-4/5 rounded-2xl"
                sizes="(min-width: 1024px) 22vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Speisekarte ---------- */}
      <section id="speisekarte" className="scroll-mt-16 border-t border-rst-line/60 bg-rst-night">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="d-reveal text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
              Speisekarte
            </p>
            <h2 className="mt-4 font-rst-display text-4xl text-rst-cream">
              Was diese Woche auf den Tisch kommt
            </h2>
            <div aria-hidden className="rst-rule mx-auto mt-7 w-40" />
          </div>
          <div className="d-reveal mt-12">
            <MenuTabs />
          </div>
        </div>
      </section>

      {/* ---------- Mittagstisch ---------- */}
      <section id="mittagstisch" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="d-reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
                Mittagstisch
              </p>
              <h2 className="mt-4 font-rst-display text-4xl leading-tight text-rst-cream">
                Jeden Mittag ein Gericht,<br />
                <span className="italic text-rst-amber">unter 15 Euro.</span>
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-rst-sand">
                Dienstag bis Freitag von 11:30 bis 14:30. Inklusive Wasser und
                Espresso. Ohne Reservierung — aber kommen Sie früh.
              </p>
            </div>
            <ul className="divide-y divide-rst-line/60 border-y border-rst-line/60">
              {LUNCH.map((item) => (
                <li key={item.day} className="flex items-center gap-5 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rst-olive/50 font-mono text-xs text-rst-olive">
                    {item.day}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-rst-display text-lg text-rst-cream">{item.dish}</p>
                    <p className="text-sm text-rst-sand">{item.note}</p>
                  </div>
                  <span className="font-rst-display text-lg text-rst-amber">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Das Haus ---------- */}
      <section id="haus" className="scroll-mt-16 border-y border-rst-line/60 bg-rst-night">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="d-reveal grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-4">
              <Photo
                src="/img/rst-pastamaking.webp"
                alt="Frische Pasta wird von Hand geschnitten"
                tint="rst-photo rst-photo-olive"
                className="aspect-4/5 rounded-2xl"
                sizes="(min-width: 1024px) 24vw, 45vw"
              />
              <Photo
                src="/img/rst-room.webp"
                alt="Blick in den Gastraum"
                tint="rst-photo"
                className="mt-8 aspect-4/5 rounded-2xl"
                sizes="(min-width: 1024px) 24vw, 45vw"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
                Das Haus
              </p>
              <h2 className="mt-4 font-rst-display text-4xl leading-tight text-rst-cream">
                Zwei Generationen,<br />eine Küche.
              </h2>
              <p className="mt-6 leading-relaxed text-rst-sand">
                1998 hat Rita Salvia den Laden in der Milchstraße übernommen —
                damals mit 18 Plätzen und einer Speisekarte auf einer Tafel.
                Heute steht ihr Sohn Matteo am Herd, das Ragù-Rezept ist
                unverändert.
              </p>
              <p className="mt-4 leading-relaxed text-rst-sand">
                Wir arbeiten mit acht Betrieben aus der Region und einem
                Fischhändler in der Großmarkthalle. Was nicht gut ist, kommt
                nicht auf die Karte.
              </p>
              <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-rst-line/60 pt-7">
                {[
                  ["1998", "gegründet"],
                  ["42", "Plätze"],
                  ["8", "Betriebe aus der Region"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-rst-display text-3xl text-rst-amber">{value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-rst-sand">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Reservierung ---------- */}
      <section id="reservierung" className="relative scroll-mt-16 overflow-hidden">
        <div aria-hidden className="rst-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="d-reveal grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
                Reservierung
              </p>
              <h2 className="mt-4 font-rst-display text-4xl leading-tight text-rst-cream">
                Ein Anruf genügt —<br />
                <span className="italic text-rst-amber">online geht auch.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-rst-sand">
                Für Gruppen ab 8 Personen rufen Sie uns bitte an, dann stellen
                wir die Tafel im hinteren Raum zusammen.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="tel:+498900000000"
                  className="rounded-full bg-rst-amber px-7 py-3.5 font-medium text-rst-ink transition-colors hover:bg-rst-cream"
                >
                  089 000 00 00
                </a>
                <a
                  href="#"
                  className="rounded-full border border-rst-line px-7 py-3.5 text-rst-cream transition-colors hover:border-rst-amber"
                >
                  Online reservieren
                </a>
              </div>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-rst-sand/70">
                Im Livebetrieb verbunden mit OpenTable, Quandoo, resmio oder
                Ihrem bestehenden Tischbuch.
              </p>
            </div>

            <div className="rounded-2xl border border-rst-line bg-rst-ink/70 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
                Öffnungszeiten
              </p>
              <dl className="mt-5 space-y-3">
                {HOURS_TABLE.map((row) => (
                  <div key={row.day} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-rst-sand">{row.day}</dt>
                    <dd
                      className={`text-right text-sm ${
                        row.time === "Ruhetag" ? "text-rst-wine" : "text-rst-cream"
                      }`}
                    >
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-rst-line pt-5">
                <OpenStatus
                  hours={HOURS}
                  className="inline-flex items-center gap-2 font-mono text-xs"
                  toneOpen="text-rst-olive"
                  toneClosed="text-rst-sand"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Anfahrt ---------- */}
      <section id="anfahrt" className="scroll-mt-16 border-t border-rst-line/60 bg-rst-night">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-3">
          {[
            {
              h: "Adresse",
              lines: ["Milchstraße 14", "81667 München-Haidhausen"],
            },
            {
              h: "Anfahrt",
              lines: ["U4 / U5 Max-Weber-Platz, 4 Min.", "Tram 19, Haltestelle Wörthstraße"],
            },
            {
              h: "Gut zu wissen",
              lines: ["Ebenerdiger Zugang", "Hunde willkommen", "Kartenzahlung möglich"],
            },
          ].map((block) => (
            <div key={block.h} className="d-reveal">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-rst-olive">
                {block.h}
              </p>
              <ul className="mt-4 space-y-1.5">
                {block.lines.map((line) => (
                  <li key={line} className="text-rst-sand">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-rst-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-rst-display text-lg text-rst-cream">
              Trattoria <span className="italic text-rst-amber">Salvia</span>
            </p>
            <p className="mt-1 text-sm text-rst-sand">
              Milchstraße 14 · 81667 München · 089 000 00 00
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/demo/restaurant/impressum/" className="text-rst-sand hover:text-rst-cream">
              Impressum
            </Link>
            <Link href="/demo/restaurant/datenschutz/" className="text-rst-sand hover:text-rst-cream">
              Datenschutz
            </Link>
            <Link href="/demo/" className="text-rst-sand hover:text-rst-cream">
              Alle Konzepte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
