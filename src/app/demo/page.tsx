import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unbounded, archivo, plexMono } from "./fonts";
import { BOOKING_URL, SITE_URL } from "@/lib/site";
import {
  RestaurantPreview,
  PraxisPreview,
  HandwerkPreview,
} from "@/components/concept-previews";

export const metadata: Metadata = {
  title: { absolute: "Konzepte für lokale Unternehmen — Krysoc" },
};

const CONCEPTS = [
  {
    href: "/demo/restaurant/",
    kicker: "Gastronomie",
    name: "Trattoria Salvia",
    body: "Speisekarte, die sich pflegen lässt, Mittagstisch der Woche, Öffnungszeiten mit Live-Status und Reservierung an das bestehende Tischbuch angebunden.",
    features: ["Speisekarte", "Live-Öffnungsstatus", "Reservierung"],
    Preview: RestaurantPreview,
  },
  {
    href: "/demo/praxis/",
    kicker: "Arztpraxis",
    name: "Praxis am Lindenplatz",
    body: "Online-Terminbuchung sichtbar an erster Stelle — angebunden an Doctolib, samedi, Jameda oder Dr. Flex. Dazu Rezeptanforderung, Sprechzeiten und Notfallnummern.",
    features: ["Doctolib-Anbindung", "Rezept online", "Sprechzeiten live"],
    Preview: PraxisPreview,
  },
  {
    href: "/demo/handwerk/",
    kicker: "Handwerk",
    name: "Hartmann Haustechnik",
    body: "Notdienstnummer immer sichtbar, Förderrechner für die Wärmepumpe, Angebotsanfrage in drei Feldern und ein Karrierebereich, der wirklich Bewerbungen bringt.",
    features: ["Förderrechner", "24-h-Notdienst", "Azubi-Gewinnung"],
    Preview: HandwerkPreview,
  },
];

const INCLUDED = [
  {
    h: "Hosting in Deutschland",
    b: "Server in deutschen Rechenzentren, Auftragsverarbeitungsvertrag inklusive. Keine Datenübertragung in die USA.",
  },
  {
    h: "Impressum & Datenschutz",
    b: "Rechtssicher aufgesetzt, inklusive der berufsrechtlichen Pflichtangaben für Ärzte und Handwerksbetriebe.",
  },
  {
    h: "Ohne Cookie-Banner",
    b: "Kein Tracking, keine externen Schriften oder Karten. Deshalb braucht keine dieser Seiten ein Banner.",
  },
  {
    h: "Auf dem Handy zuerst",
    b: "Zwei Drittel Ihrer Besucher kommen vom Telefon. Genau dafür sind diese Seiten gebaut.",
  },
  {
    h: "An Ihre Systeme angebunden",
    b: "Terminbuchung, Tischreservierung, Warenwirtschaft — wir binden an, was Sie schon bezahlen.",
  },
  {
    h: "Sie können es selbst ändern",
    b: "Speisekarte, Sprechzeiten, Stellenanzeigen: Änderungen sind Ihre Sache, nicht ein Ticket bei der Agentur.",
  },
];

export default function DemoHub() {
  return (
    <div
      className={`${unbounded.variable} ${archivo.variable} ${plexMono.variable} min-h-screen bg-ks-obsidian font-ks-body text-ks-ivory`}
    >
      {/* ---------- Nav ---------- */}
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <span className="font-ks-display text-lg font-bold tracking-tight">
            krysoc<span className="text-ks-gold">.</span>
          </span>
          <div className="flex items-center gap-6">
            <a
              href={SITE_URL}
              className="font-ks-mono text-xs uppercase tracking-widest text-ks-stone transition-colors hover:text-ks-ivory"
            >
              krysoc.com
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ks-gold px-4 py-2 text-sm font-semibold text-ks-obsidian transition-opacity hover:opacity-85"
            >
              Gespräch buchen
            </a>
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] sm:py-24">
          <div>
            <p className="d-rise d-rise-1 font-ks-mono text-[11px] uppercase tracking-[0.2em] text-ks-gold">
              Konzeptstudien
            </p>
            <h1 className="d-rise d-rise-2 mt-6 font-ks-display text-3xl font-bold leading-[1.25] sm:text-4xl">
              So könnte Ihre Website aussehen.
              <span className="mt-2 block text-ks-gold">Gebaut und gehostet in Deutschland.</span>
            </h1>
            <p className="d-rise d-rise-3 mt-7 max-w-xl text-lg leading-relaxed text-ks-stone">
              Drei Beispiele aus Branchen, in denen die Website mehr können muss
              als gut aussehen: Gäste sollen reservieren, Patienten sollen
              Termine buchen, Kunden sollen anrufen. Alle drei Unternehmen sind
              erfunden — die Technik dahinter ist echt.
            </p>
            <div className="d-rise d-rise-4 mt-9 flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ks-gold px-7 py-3.5 font-semibold text-ks-obsidian transition-opacity hover:opacity-85"
              >
                Kostenloses Erstgespräch
              </a>
              <a
                href="#konzepte"
                className="rounded-full border border-white/20 px-7 py-3.5 transition-colors hover:border-ks-gold"
              >
                Konzepte ansehen
              </a>
            </div>
          </div>

          {/* The three worlds these concepts are built for. */}
          <div className="d-rise d-rise-3 grid grid-cols-2 gap-4">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image
                src="/img/rst-room.webp"
                alt="Gastraum einer Trattoria am Abend"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="mt-10 space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/img/prx-reception.webp"
                  alt="Empfang einer Hausarztpraxis"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="/img/hwk-waermepumpe.webp"
                  alt="Wärmepumpe an einem Einfamilienhaus"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Concepts ---------- */}
      <section id="konzepte" className="scroll-mt-6">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {CONCEPTS.map((concept) => (
              <Link
                key={concept.href}
                href={concept.href}
                className="d-reveal group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-ks-gold/50"
              >
                <div className="p-4 pb-0">
                  <div className="overflow-hidden rounded-lg ring-1 ring-white/10">
                    <concept.Preview />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-ks-mono text-[10px] uppercase tracking-[0.18em] text-ks-gold">
                    {concept.kicker}
                  </p>
                  <h2 className="mt-3 font-ks-display text-lg font-semibold leading-snug">
                    {concept.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ks-stone">
                    {concept.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {concept.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-white/15 px-3 py-1 font-ks-mono text-[10px] uppercase tracking-wider text-ks-stone"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ks-gold">
                    Konzept öffnen
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Included ---------- */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-ks-mono text-[11px] uppercase tracking-[0.2em] text-ks-gold">
              In jedem Projekt enthalten
            </p>
            <h2 className="mt-4 font-ks-display text-2xl font-bold leading-snug sm:text-3xl">
              Was Sie bei jeder dieser Websites bekommen
            </h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <div key={item.h} className="d-reveal border-t border-white/10 pt-5">
                <h3 className="font-ks-display text-base font-semibold">{item.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ks-stone">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="d-reveal font-ks-display text-2xl font-bold leading-snug sm:text-3xl">
            Ihre Branche ist nicht dabei?
          </h2>
          <p className="d-reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ks-stone">
            Wir bauen dieselbe Sache für Kanzleien, Physiotherapie, Autohäuser
            oder Friseure. Bringen Sie 20 Minuten mit und Ihre aktuelle Website
            — wir sagen Ihnen ehrlich, was sich lohnt.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="d-reveal mt-9 inline-block rounded-full bg-ks-gold px-8 py-4 font-semibold text-ks-obsidian transition-opacity hover:opacity-85"
          >
            Kostenloses Erstgespräch buchen
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ks-mono text-xs text-ks-stone">
            © {new Date().getFullYear()} Krysoc · Konzeptstudien
          </p>
          <p className="font-ks-mono text-xs text-ks-stone">
            Alle gezeigten Unternehmen sind frei erfunden.
          </p>
        </div>
      </footer>
    </div>
  );
}
