import type { Metadata } from "next";
import Link from "next/link";
import { newsreader, manrope, plexMono } from "../fonts";
import { ConceptBar } from "@/components/demo/concept-bar";
import { OpenStatus, type WeekHours } from "@/components/demo/open-status";
import { BookingPanel } from "@/components/demo/booking-panel";

export const metadata: Metadata = {
  title: "Praxis am Lindenplatz — Hausarztpraxis",
};

/** Placeholder for the practice's own Doctolib profile URL. */
const BOOKING_URL = "https://www.doctolib.de/";

// Index 0 = Sunday. Wed afternoon closed, Fri short — a typical German practice.
const HOURS: WeekHours = [
  [],
  [{ from: "08:00", to: "12:00" }, { from: "15:00", to: "18:00" }],
  [{ from: "08:00", to: "12:00" }, { from: "15:00", to: "18:00" }],
  [{ from: "08:00", to: "12:00" }],
  [{ from: "08:00", to: "12:00" }, { from: "15:00", to: "18:00" }],
  [{ from: "08:00", to: "12:00" }],
  [],
];

const HOURS_TABLE = [
  { day: "Montag", time: "08:00 – 12:00 · 15:00 – 18:00" },
  { day: "Dienstag", time: "08:00 – 12:00 · 15:00 – 18:00" },
  { day: "Mittwoch", time: "08:00 – 12:00" },
  { day: "Donnerstag", time: "08:00 – 12:00 · 15:00 – 18:00" },
  { day: "Freitag", time: "08:00 – 12:00" },
  { day: "Samstag / Sonntag", time: "geschlossen" },
];

const LEISTUNGEN = [
  {
    title: "Hausärztliche Versorgung",
    body: "Akute Beschwerden, chronische Erkrankungen, Langzeitbetreuung — für die ganze Familie.",
  },
  {
    title: "Vorsorge & Check-up",
    body: "Gesundheits-Check-up ab 18, Hautkrebsscreening, Krebsfrüherkennung, Jugendvorsorge J1.",
  },
  {
    title: "Impfungen & Reisemedizin",
    body: "Alle STIKO-Impfungen, Grippeimpfung, Auffrischungen und Beratung vor Fernreisen.",
  },
  {
    title: "DMP-Programme",
    body: "Strukturierte Betreuung bei Diabetes Typ 2, KHK, Asthma und COPD.",
  },
  {
    title: "Labor & Diagnostik",
    body: "Blutabnahme im Haus, EKG, Belastungs-EKG, Langzeit-Blutdruck, Lungenfunktion.",
  },
  {
    title: "Hausbesuche",
    body: "Für Patientinnen und Patienten, die nicht in die Praxis kommen können.",
  },
];

const TEAM = [
  {
    name: "Dr. med. Julia Behrend",
    role: "Fachärztin für Allgemeinmedizin",
    note: "Praxisinhaberin, Schwerpunkt Diabetologie",
    tone: "bg-prx-mint text-prx-teal-deep",
  },
  {
    name: "Dr. med. Milan Kraft",
    role: "Facharzt für Innere Medizin",
    note: "Schwerpunkt Kardiologie, seit 2019 im Team",
    tone: "bg-prx-teal/10 text-prx-teal-deep",
  },
  {
    name: "Sabine Ortmann",
    role: "Leitende MFA",
    note: "Labor, DMP-Koordination, Terminorganisation",
    tone: "bg-prx-sun/15 text-prx-sun",
  },
];

const NAV = [
  { href: "#termin", label: "Termin" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#team", label: "Team" },
  { href: "#rezept", label: "Rezept" },
  { href: "#praxis", label: "Praxis" },
];

export default function PraxisDemo() {
  return (
    <div className={`${newsreader.variable} ${manrope.variable} ${plexMono.variable} bg-prx-paper font-prx-body text-prx-body`}>
      <ConceptBar label="Arztpraxis" />

      {/* ---------- Nav ---------- */}
      <header className="sticky top-[38px] z-40 border-b border-prx-line bg-prx-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <span className="font-prx-display text-lg font-medium text-prx-ink">
            Praxis am Lindenplatz
          </span>
          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-prx-body transition-colors hover:text-prx-teal"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+498900000000"
              className="hidden text-sm font-medium text-prx-ink sm:block"
            >
              089 000 00 00
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-prx-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-prx-teal-deep"
            >
              Termin buchen
            </a>
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="prx-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="d-rise d-rise-1 font-mono text-[11px] uppercase tracking-[0.2em] text-prx-teal">
              Hausarztpraxis · München-Sendling
            </p>
            <h1 className="d-rise d-rise-2 mt-5 font-prx-display text-4xl leading-[1.15] text-prx-ink sm:text-5xl">
              Hausärztliche Betreuung,{" "}
              <span className="italic text-prx-teal">die sich Zeit nimmt.</span>
            </h1>
            <p className="d-rise d-rise-3 mt-6 max-w-lg text-lg leading-relaxed text-prx-body">
              Zwei Ärzte, ein eingespieltes Team und Termine, die Sie online
              buchen können — ohne in der Telefonschleife zu warten. Wir nehmen
              gesetzlich und privat Versicherte auf.
            </p>
            <div className="d-rise d-rise-4 mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-prx-teal px-7 py-3.5 font-semibold text-white transition-colors hover:bg-prx-teal-deep"
              >
                Termin online buchen
              </a>
              <a
                href="tel:+498900000000"
                className="rounded-full border border-prx-line bg-prx-white px-7 py-3.5 font-medium text-prx-ink transition-colors hover:border-prx-teal"
              >
                089 000 00 00
              </a>
            </div>
            <div className="d-rise d-rise-4 mt-7 flex flex-wrap items-center gap-4">
              <OpenStatus
                hours={HOURS}
                openLabel="Praxis geöffnet"
                closedLabel="Praxis geschlossen"
                className="inline-flex items-center gap-2 rounded-full border bg-prx-white px-4 py-1.5 font-mono text-xs"
                toneOpen="border-prx-teal/40 text-prx-teal"
                toneClosed="border-prx-line text-prx-mute"
              />
              <span className="text-xs text-prx-mute">
                Barrierefreier Zugang · Parkplätze im Hof
              </span>
            </div>
          </div>

          <div className="d-rise d-rise-3">
            <BookingPanel bookingUrl={BOOKING_URL} />
          </div>
        </div>
      </section>

      {/* ---------- Notfall ---------- */}
      <section className="border-y border-prx-line bg-prx-ink">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-7 sm:grid-cols-3">
          {[
            { label: "Notruf", value: "112", note: "Lebensgefahr, Notfall" },
            { label: "Ärztlicher Bereitschaftsdienst", value: "116 117", note: "außerhalb der Sprechzeiten" },
            { label: "Giftnotruf München", value: "089 19240", note: "rund um die Uhr" },
          ].map((item) => (
            <div key={item.value} className="flex items-baseline gap-3">
              <span className="font-prx-display text-2xl text-prx-white">{item.value}</span>
              <span className="text-xs leading-snug text-prx-mint/80">
                {item.label}
                <br />
                <span className="opacity-70">{item.note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Termin / Doctolib showcase ---------- */}
      <section id="termin" className="scroll-mt-28">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-prx-teal">
                Terminvergabe
              </p>
              <h2 className="mt-4 font-prx-display text-3xl leading-tight text-prx-ink sm:text-4xl">
                Drei Wege zum Termin —{" "}
                <span className="italic text-prx-teal">zwei davon ohne Telefon.</span>
              </h2>
              <ul className="mt-8 space-y-5">
                {[
                  {
                    h: "Online buchen",
                    b: "Über Doctolib, rund um die Uhr. Sie sehen sofort, was frei ist, und bekommen eine Erinnerung aufs Handy.",
                  },
                  {
                    h: "Anrufen",
                    b: "Montag bis Freitag ab 08:00. Für dringende Fälle halten wir jeden Tag Akuttermine frei.",
                  },
                  {
                    h: "Rezept ohne Termin",
                    b: "Folgerezepte und Überweisungen fordern Sie online an und holen sie am nächsten Werktag ab.",
                  },
                ].map((item, i) => (
                  <li key={item.h} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-prx-mint font-mono text-xs font-semibold text-prx-teal-deep">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-prx-ink">{item.h}</p>
                      <p className="mt-1 text-sm leading-relaxed text-prx-body">{item.b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-prx-line bg-prx-white p-7 prx-card">
              <p className="font-prx-display text-xl text-prx-ink">
                Warum das die Praxis entlastet
              </p>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                {[
                  ["~40 %", "der Anrufe sind reine Terminanfragen"],
                  ["24/7", "buchbar, auch am Wochenende"],
                  ["0", "Doppelbuchungen durch Kalender-Sync"],
                  ["1 Klick", "zur Absage — statt Nichterscheinen"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-prx-display text-3xl text-prx-teal">{value}</dt>
                    <dd className="mt-1 text-sm leading-snug text-prx-body">{label}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 border-t border-prx-line pt-5 text-xs leading-relaxed text-prx-mute">
                Beispielhafte Größenordnungen zur Veranschaulichung. Ihre
                tatsächlichen Zahlen sehen wir uns im Gespräch gemeinsam an.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Leistungen ---------- */}
      <section id="leistungen" className="scroll-mt-28 border-y border-prx-line bg-prx-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-prx-teal">
              Leistungen
            </p>
            <h2 className="mt-4 font-prx-display text-3xl leading-tight text-prx-ink sm:text-4xl">
              Was wir in der Praxis anbieten
            </h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {LEISTUNGEN.map((item) => (
              <div key={item.title} className="d-reveal border-t border-prx-line pt-5">
                <h3 className="font-prx-display text-xl text-prx-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-prx-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section id="team" className="scroll-mt-28">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-prx-teal">
              Team
            </p>
            <h2 className="mt-4 font-prx-display text-3xl leading-tight text-prx-ink sm:text-4xl">
              Die Menschen, die Sie behandeln
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="d-reveal prx-card rounded-2xl border border-prx-line bg-prx-white p-7"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full font-prx-display text-xl ${person.tone}`}
                >
                  {person.name
                    .replace(/Dr\. med\. /, "")
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <h3 className="mt-5 font-prx-display text-xl text-prx-ink">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-prx-teal">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-prx-body">{person.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Rezept ---------- */}
      <section id="rezept" className="scroll-mt-28 border-y border-prx-line bg-prx-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="d-reveal grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-prx-teal">
                Ohne Termin
              </p>
              <h2 className="mt-4 font-prx-display text-3xl leading-tight text-prx-ink sm:text-4xl">
                Folgerezept oder Überweisung anfordern
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-prx-body">
                Für Dauermedikation, die wir bereits verordnet haben. Anfragen
                bis 12:00 sind in der Regel am nächsten Werktag ab 10:00 zur
                Abholung bereit.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-prx-mute">
                Bitte keine medizinischen Fragen und keine Befunde über dieses
                Formular — dafür vereinbaren Sie bitte einen Termin.
              </p>
            </div>

            <div className="prx-card rounded-2xl border border-prx-line bg-prx-paper p-7">
              <div className="space-y-4">
                {[
                  { label: "Name", value: "Vor- und Nachname" },
                  { label: "Geburtsdatum", value: "TT.MM.JJJJ" },
                  { label: "Medikament", value: "Name und Dosierung" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-medium uppercase tracking-wider text-prx-mute">
                      {field.label}
                    </label>
                    <div className="mt-1.5 rounded-lg border border-prx-line bg-prx-white px-4 py-2.5 text-sm text-prx-mute">
                      {field.value}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3 pt-1">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-prx-line bg-prx-white" />
                  <span className="text-xs leading-relaxed text-prx-body">
                    Ich habe die Datenschutzhinweise gelesen und willige in die
                    Verarbeitung meiner Angaben zur Bearbeitung dieser Anfrage
                    ein.
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-prx-teal px-5 py-3 text-sm font-semibold text-white"
                >
                  Anfrage senden
                </button>
                <p className="text-center text-[11px] text-prx-mute">
                  Vorschau — im Livebetrieb verschlüsselt an die Praxis übermittelt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Praxis / Sprechzeiten / Anfahrt ---------- */}
      <section id="praxis" className="scroll-mt-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-3">
          <div className="d-reveal prx-card rounded-2xl border border-prx-line bg-prx-white p-7">
            <h3 className="font-prx-display text-xl text-prx-ink">Sprechzeiten</h3>
            <dl className="mt-5 space-y-2.5">
              {HOURS_TABLE.map((row) => (
                <div key={row.day} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-prx-body">{row.day}</dt>
                  <dd
                    className={`text-right text-sm ${
                      row.time === "geschlossen" ? "text-prx-mute" : "text-prx-ink"
                    }`}
                  >
                    {row.time}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-prx-line pt-4">
              <OpenStatus
                hours={HOURS}
                openLabel="Jetzt geöffnet"
                closedLabel="Zurzeit geschlossen"
                className="inline-flex items-center gap-2 font-mono text-xs"
                toneOpen="text-prx-teal"
                toneClosed="text-prx-mute"
              />
            </div>
          </div>

          <div className="d-reveal prx-card rounded-2xl border border-prx-line bg-prx-white p-7">
            <h3 className="font-prx-display text-xl text-prx-ink">Anfahrt</h3>
            <p className="mt-5 text-sm leading-relaxed text-prx-body">
              Lindenplatz 6
              <br />
              81371 München-Sendling
            </p>
            <ul className="mt-5 space-y-2 text-sm text-prx-body">
              <li>U3 / U6 Implerstraße, 5 Minuten zu Fuß</li>
              <li>Bus 132, Haltestelle Lindenplatz</li>
              <li>Parkplätze im Innenhof</li>
            </ul>
          </div>

          <div className="d-reveal prx-card rounded-2xl border border-prx-line bg-prx-white p-7">
            <h3 className="font-prx-display text-xl text-prx-ink">Gut zu wissen</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-prx-body">
              <li>Barrierefreier Zugang, Aufzug im Haus</li>
              <li>Gesetzliche und private Krankenversicherung</li>
              <li>Sprachen: Deutsch, Englisch, Türkisch</li>
              <li>Neue Patientinnen und Patienten willkommen</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-prx-line bg-prx-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-prx-display text-lg text-prx-ink">Praxis am Lindenplatz</p>
            <p className="mt-1 text-sm text-prx-body">
              Lindenplatz 6 · 81371 München · 089 000 00 00
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/demo/praxis/impressum/" className="text-prx-body hover:text-prx-teal">
              Impressum
            </Link>
            <Link href="/demo/praxis/datenschutz/" className="text-prx-body hover:text-prx-teal">
              Datenschutz
            </Link>
            <Link href="/demo/" className="text-prx-body hover:text-prx-teal">
              Alle Konzepte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
