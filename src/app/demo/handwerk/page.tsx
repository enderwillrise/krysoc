import type { Metadata } from "next";
import Link from "next/link";
import { barlowCondensed, barlow, plexMono } from "../fonts";
import { ConceptBar } from "@/components/demo/concept-bar";
import { FoerderRechner } from "@/components/demo/foerder-rechner";

export const metadata: Metadata = {
  title: "Hartmann Haustechnik — Sanitär, Heizung, Klima",
};

const LEISTUNGEN = [
  {
    num: "01",
    title: "Wärmepumpe",
    body: "Beratung, Auslegung, Einbau und Förderantrag — Luft-Wasser und Sole-Wasser. Wir prüfen vorher, ob Ihr Haus dafür taugt, und sagen es ehrlich, wenn nicht.",
    tags: ["Förderantrag inklusive", "Heizlastberechnung"],
  },
  {
    num: "02",
    title: "Heizung & Wartung",
    body: "Gas, Öl, Pellets und Hybrid. Wartungsvertrag mit festem Termin im Jahr und Vorrang im Notdienst.",
    tags: ["Wartungsvertrag", "Notdienst 24 h"],
  },
  {
    num: "03",
    title: "Bad & Sanitär",
    body: "Vom tropfenden Hahn bis zum kompletten Bad — inklusive Fliesen, Elektro und Trockenbau über unsere Partnerbetriebe.",
    tags: ["Komplettbad", "Barrierefrei"],
  },
  {
    num: "04",
    title: "Trinkwasserhygiene",
    body: "Legionellenprüfung nach TrinkwV für Vermieter und Hausverwaltungen, mit Probenahme und Dokumentation.",
    tags: ["Nach TrinkwV", "Für Verwaltungen"],
  },
];

const ABLAUF = [
  { step: "Anruf oder Formular", note: "Sie schildern kurz, worum es geht." },
  { step: "Termin vor Ort", note: "Innerhalb von 5 Werktagen, kostenlos." },
  { step: "Festpreisangebot", note: "Schriftlich, innerhalb von 48 Stunden." },
  { step: "Ausführung", note: "Fester Termin, ein Ansprechpartner." },
];

const REFERENZEN = [
  { title: "Altbau, Bj. 1932", note: "Ölkessel raus, Luft-Wasser-Wärmepumpe rein", meta: "München-Giesing · 2025" },
  { title: "Doppelhaushälfte", note: "Komplettbad barrierefrei, 9 Tage Bauzeit", meta: "Ottobrunn · 2025" },
  { title: "Mehrfamilienhaus, 14 Parteien", note: "Heizungstausch im laufenden Betrieb", meta: "München-Sendling · 2024" },
];

const GEBIET = ["München", "Ottobrunn", "Unterhaching", "Neubiberg", "Grünwald", "Pullach", "Taufkirchen", "Haar"];

export default function HandwerkDemo() {
  return (
    <div className={`${barlowCondensed.variable} ${barlow.variable} ${plexMono.variable} bg-hwk-white font-hwk-body text-hwk-slate`}>
      <ConceptBar label="Handwerksbetrieb" />

      {/* ---------- Notdienst band ---------- */}
      <div className="hwk-stripe h-1.5" aria-hidden />
      <div className="bg-hwk-steel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2.5">
          <p className="font-hwk-body text-sm text-hwk-white">
            <span className="font-semibold text-hwk-signal">24-Stunden-Notdienst</span>
            <span className="text-hwk-grey"> · Rohrbruch, Heizungsausfall, kein Warmwasser</span>
          </p>
          <a
            href="tel:+498900000000"
            className="font-hwk-display text-lg font-bold tracking-wide text-hwk-white transition-colors hover:text-hwk-signal"
          >
            089 000 00 00
          </a>
        </div>
      </div>

      {/* ---------- Nav ---------- */}
      <header className="border-b border-hwk-line bg-hwk-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <span className="font-hwk-display text-xl font-bold uppercase tracking-wide text-hwk-steel">
            Hartmann <span className="text-hwk-signal">Haustechnik</span>
          </span>
          <div className="hidden items-center gap-7 lg:flex">
            {[
              { href: "#leistungen", label: "Leistungen" },
              { href: "#foerderung", label: "Förderung" },
              { href: "#referenzen", label: "Referenzen" },
              { href: "#karriere", label: "Karriere" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-hwk-display text-sm font-semibold uppercase tracking-wider text-hwk-slate transition-colors hover:text-hwk-signal"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#angebot"
            className="bg-hwk-signal px-5 py-2.5 font-hwk-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-hwk-flame"
          >
            Angebot anfordern
          </a>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hwk-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="d-rise d-rise-1 font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
              Meisterbetrieb seit 1998 · SHK-Innung München
            </p>
            <h1 className="d-rise d-rise-2 mt-5 font-hwk-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-hwk-white sm:text-6xl lg:text-7xl">
              Heizung kaputt?
              <span className="mt-1 block text-hwk-signal">Wir sind schon unterwegs.</span>
            </h1>
            <p className="d-rise d-rise-3 mt-7 max-w-lg text-lg leading-relaxed text-hwk-fog/80">
              14 Monteure, elf eigene Fahrzeuge und ein Lager, in dem die
              gängigen Teile liegen. Deshalb dauert bei uns eine Reparatur
              selten länger als einen Tag.
            </p>
            <div className="d-rise d-rise-4 mt-9 flex flex-wrap gap-4">
              <a
                href="#angebot"
                className="bg-hwk-signal px-7 py-4 font-hwk-display text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-hwk-flame"
              >
                Kostenloses Angebot
              </a>
              <a
                href="tel:+498900000000"
                className="border-2 border-hwk-white/30 px-7 py-4 font-hwk-display text-base font-bold uppercase tracking-wider text-hwk-white transition-colors hover:border-hwk-signal"
              >
                089 000 00 00
              </a>
            </div>
            <dl className="d-rise d-rise-4 mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-7">
              {[
                ["48 h", "bis zum Angebot"],
                ["14", "eigene Monteure"],
                ["27", "Jahre Meisterbetrieb"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-hwk-display text-3xl font-bold text-hwk-signal">{value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-hwk-fog/70">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="d-rise d-rise-3 space-y-4">
            <div className="hwk-photo aspect-4/3 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <div className="hwk-photo aspect-square rounded-lg" />
              <div className="hwk-photo aspect-square rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Leistungen ---------- */}
      <section id="leistungen" className="scroll-mt-16 bg-hwk-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
              Leistungen
            </p>
            <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-steel sm:text-5xl">
              Was wir machen
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-hwk-line md:grid-cols-2">
            {LEISTUNGEN.map((item) => (
              <article key={item.num} className="d-reveal group bg-hwk-white p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-hwk-display text-2xl font-bold text-hwk-line transition-colors group-hover:text-hwk-signal">
                    {item.num}
                  </span>
                  <h3 className="font-hwk-display text-2xl font-bold uppercase tracking-tight text-hwk-steel">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-hwk-grey">{item.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-hwk-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-hwk-grey"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Förderrechner ---------- */}
      <section id="foerderung" className="scroll-mt-16 border-y border-hwk-line bg-hwk-fog">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
              Förderung
            </p>
            <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-steel sm:text-5xl">
              Was kostet die Wärmepumpe wirklich?
            </h2>
            <p className="mt-5 leading-relaxed text-hwk-grey">
              Bis zu 70 % der Kosten übernimmt der Staat — aber nur, wenn der
              Antrag stimmt und vor Auftragsvergabe gestellt ist. Rechnen Sie
              hier grob durch, den Rest machen wir.
            </p>
          </div>
          <div className="d-reveal mt-12 rounded-xl border border-hwk-line bg-hwk-white p-7 sm:p-9">
            <FoerderRechner />
          </div>
        </div>
      </section>

      {/* ---------- Ablauf ---------- */}
      <section className="bg-hwk-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
              Ablauf
            </p>
            <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-steel">
              Vier Schritte, keine Überraschungen
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABLAUF.map((item, i) => (
              <li key={item.step} className="d-reveal border-t-4 border-hwk-signal pt-5">
                <span className="font-mono text-xs text-hwk-grey">
                  Schritt {i + 1}
                </span>
                <h3 className="mt-2 font-hwk-display text-xl font-bold uppercase tracking-tight text-hwk-steel">
                  {item.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-hwk-grey">{item.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Referenzen ---------- */}
      <section id="referenzen" className="scroll-mt-16 bg-hwk-steel">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
              Referenzen
            </p>
            <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-white">
              Zuletzt gebaut
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {REFERENZEN.map((ref) => (
              <article key={ref.title} className="d-reveal">
                <div className="hwk-photo aspect-4/3 rounded-lg" />
                <h3 className="mt-5 font-hwk-display text-xl font-bold uppercase tracking-tight text-hwk-white">
                  {ref.title}
                </h3>
                <p className="mt-1.5 text-sm text-hwk-fog/75">{ref.note}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-hwk-grey">
                  {ref.meta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Karriere ---------- */}
      <section id="karriere" className="scroll-mt-16 border-y border-hwk-line bg-hwk-fog">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
                Karriere
              </p>
              <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-steel sm:text-5xl">
                Wir suchen Anlagenmechaniker <span className="text-hwk-signal">(m/w/d)</span>
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-hwk-grey">
                Unbefristet, 36-Stunden-Woche, eigenes Fahrzeug ab dem ersten
                Tag. Kein Montageeinsatz über Nacht — wir arbeiten im Umkreis
                von 25 Kilometern.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-hwk-grey">
                Und wir bilden aus: zwei Ausbildungsplätze zum 1. September,
                auch für Quereinsteiger mit Praktikum vorab.
              </p>
              <a
                href="#angebot"
                className="mt-8 inline-block bg-hwk-steel px-7 py-4 font-hwk-display text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-hwk-signal"
              >
                Initiativ bewerben
              </a>
            </div>
            <ul className="space-y-px overflow-hidden rounded-lg bg-hwk-line">
              {[
                ["Anlagenmechaniker SHK", "Vollzeit · unbefristet"],
                ["Kundendiensttechniker", "Vollzeit · Notdienst-Zulage"],
                ["Auszubildende SHK", "ab 1. September · 2 Plätze"],
              ].map(([role, meta]) => (
                <li
                  key={role}
                  className="flex items-center justify-between gap-4 bg-hwk-white px-6 py-5"
                >
                  <div>
                    <p className="font-hwk-display text-lg font-bold uppercase tracking-tight text-hwk-steel">
                      {role}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-hwk-grey">
                      {meta}
                    </p>
                  </div>
                  <span aria-hidden className="font-hwk-display text-xl text-hwk-signal">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Angebot ---------- */}
      <section id="angebot" className="scroll-mt-16 bg-hwk-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hwk-signal">
                Angebot anfordern
              </p>
              <h2 className="mt-4 font-hwk-display text-4xl font-bold uppercase leading-tight tracking-tight text-hwk-steel sm:text-5xl">
                Sagen Sie kurz, worum es geht
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-hwk-grey">
                Wir melden uns am selben Werktag. Für den Termin vor Ort
                brauchen Sie nichts vorzubereiten — Fotos helfen, sind aber
                kein Muss.
              </p>

              <div className="mt-10">
                <p className="font-hwk-display text-sm font-semibold uppercase tracking-wider text-hwk-grey">
                  Einsatzgebiet
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {GEBIET.map((ort) => (
                    <span
                      key={ort}
                      className="border border-hwk-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-hwk-grey"
                    >
                      {ort}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-2 border-hwk-steel bg-hwk-fog p-7">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {["Wärmepumpe", "Heizung", "Bad", "Notfall"].map((topic, i) => (
                    <span
                      key={topic}
                      className={`px-4 py-2.5 text-center font-hwk-display text-sm font-bold uppercase tracking-wider ${
                        i === 0
                          ? "bg-hwk-signal text-white"
                          : "border border-hwk-line bg-hwk-white text-hwk-grey"
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                {[
                  { label: "Name", value: "Vor- und Nachname" },
                  { label: "Telefon", value: "Für Rückfragen" },
                  { label: "Adresse des Objekts", value: "Straße, PLZ, Ort" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="font-hwk-display text-xs font-semibold uppercase tracking-wider text-hwk-grey">
                      {field.label}
                    </label>
                    <div className="mt-1.5 border border-hwk-line bg-hwk-white px-4 py-2.5 text-sm text-hwk-grey">
                      {field.value}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full bg-hwk-signal px-5 py-3.5 font-hwk-display text-base font-bold uppercase tracking-wider text-white"
                >
                  Anfrage senden
                </button>
                <p className="text-center font-mono text-[10px] uppercase tracking-wider text-hwk-grey">
                  Vorschau · im Livebetrieb direkt ins Büro
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-hwk-steel">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-hwk-display text-xl font-bold uppercase tracking-wide text-hwk-white">
              Hartmann <span className="text-hwk-signal">Haustechnik</span>
            </p>
            <p className="mt-1 text-sm text-hwk-grey">
              Tegernseer Landstraße 88 · 81541 München · 089 000 00 00
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/demo/handwerk/impressum/" className="text-hwk-grey hover:text-hwk-white">
              Impressum
            </Link>
            <Link href="/demo/handwerk/datenschutz/" className="text-hwk-grey hover:text-hwk-white">
              Datenschutz
            </Link>
            <Link href="/demo/" className="text-hwk-grey hover:text-hwk-white">
              Alle Konzepte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
