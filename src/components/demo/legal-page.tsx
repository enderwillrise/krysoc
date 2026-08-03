import Link from "next/link";
import { ConceptBar } from "@/components/demo/concept-bar";

export interface LegalTone {
  /** Wrapper: background + font family + base text colour. */
  page: string;
  heading: string;
  subheading: string;
  body: string;
  muted: string;
  link: string;
  rule: string;
}

export interface LegalBusiness {
  name: string;
  owner: string;
  street: string;
  city: string;
  phone: string;
  email: string;
  /** Trade-specific required rows: Kammer, Berufsbezeichnung, USt-ID … */
  extra?: { label: string; value: string }[];
  backHref: string;
  conceptLabel: string;
}

function Section({
  tone,
  title,
  children,
}: {
  tone: LegalTone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className={`text-lg font-semibold ${tone.subheading}`}>{title}</h2>
      <div className={`mt-3 space-y-3 text-sm leading-relaxed ${tone.body}`}>
        {children}
      </div>
    </section>
  );
}

function Shell({
  tone,
  business,
  title,
  children,
}: {
  tone: LegalTone;
  business: LegalBusiness;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={tone.page}>
      <ConceptBar label={business.conceptLabel} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href={business.backHref} className={`text-sm ${tone.link}`}>
          ← Zurück zur Startseite
        </Link>
        <h1 className={`mt-6 text-4xl ${tone.heading}`}>{title}</h1>
        <div aria-hidden className={`mt-8 h-px w-full ${tone.rule}`} />
        {children}
        <p className={`mt-14 border-t pt-6 text-xs leading-relaxed ${tone.muted} ${tone.rule.replace("bg-", "border-")}`}>
          Hinweis: Dies ist eine Konzeptdemo von Krysoc. Unternehmen, Namen,
          Anschriften und Kontaktdaten auf dieser Seite sind frei erfunden. Für
          eine echte Website werden diese Angaben durch die tatsächlichen Daten
          des Betriebs ersetzt und vor Veröffentlichung geprüft.
        </p>
      </main>
    </div>
  );
}

/**
 * Impressum per §5 DDG. Every commercial German site needs one, and a missing
 * or incomplete Impressum is genuinely abmahnfähig — which is exactly why it
 * ships as part of the product rather than as an afterthought.
 */
export function ImpressumPage({
  tone,
  business,
}: {
  tone: LegalTone;
  business: LegalBusiness;
}) {
  return (
    <Shell tone={tone} business={business} title="Impressum">
      <Section tone={tone} title="Angaben gemäß § 5 DDG">
        <p>
          {business.name}
          <br />
          {business.owner}
          <br />
          {business.street}
          <br />
          {business.city}
        </p>
      </Section>

      <Section tone={tone} title="Kontakt">
        <p>
          Telefon: {business.phone}
          <br />
          E-Mail: {business.email}
        </p>
      </Section>

      {business.extra?.length ? (
        <Section tone={tone} title="Berufsrechtliche Angaben">
          <dl className="space-y-2">
            {business.extra.map((row) => (
              <div key={row.label}>
                <dt className={`text-xs uppercase tracking-wider ${tone.muted}`}>
                  {row.label}
                </dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      <Section tone={tone} title="Verantwortlich für den Inhalt">
        <p>
          {business.owner}
          <br />
          Anschrift wie oben
        </p>
      </Section>

      <Section tone={tone} title="Streitschlichtung">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Section>
    </Shell>
  );
}

/**
 * Datenschutzerklärung. Deliberately describes a site with no tracking, no
 * cookies and EU hosting — that is the product being sold, not a placeholder.
 */
export function DatenschutzPage({
  tone,
  business,
  health = false,
}: {
  tone: LegalTone;
  business: LegalBusiness;
  health?: boolean;
}) {
  return (
    <Shell tone={tone} business={business} title="Datenschutz">
      <Section tone={tone} title="Verantwortliche Stelle">
        <p>
          {business.name}
          <br />
          {business.street}, {business.city}
          <br />
          {business.email}
        </p>
      </Section>

      <Section tone={tone} title="Hosting">
        <p>
          Diese Website wird auf Servern in Deutschland betrieben. Beim Aufruf
          der Seite verarbeitet der Hoster technisch notwendige Daten
          (IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite) in
          Server-Logfiles auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Mit dem
          Hoster besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
          DSGVO. Eine Übermittlung in Drittländer findet nicht statt.
        </p>
      </Section>

      <Section tone={tone} title="Cookies und Analyse">
        <p>
          Diese Website setzt keine Cookies und verwendet keine Analyse-,
          Tracking- oder Werbedienste. Es werden keine Schriftarten, Karten
          oder Skripte von externen Servern nachgeladen.
        </p>
      </Section>

      <Section tone={tone} title="Kontaktaufnahme">
        <p>
          Wenn Sie uns per Telefon, E-Mail oder Formular kontaktieren, werden
          Ihre Angaben zur Bearbeitung der Anfrage und für den Fall von
          Anschlussfragen gespeichert (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).
          Wir geben diese Daten nicht ohne Ihre Einwilligung weiter und löschen
          sie, sobald der Zweck entfällt und keine Aufbewahrungspflichten
          entgegenstehen.
        </p>
      </Section>

      {health ? (
        <Section tone={tone} title="Gesundheitsdaten und Terminbuchung">
          <p>
            Gesundheitsdaten sind besonders geschützt (Art. 9 DSGVO). Über diese
            Website werden keine Gesundheitsdaten erhoben oder gespeichert.
          </p>
          <p>
            Die Online-Terminbuchung erfolgt über einen externen Dienstleister.
            Wenn Sie den Buchungs-Button anklicken, verlassen Sie diese Website;
            es gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Es
            werden dabei keine Daten von dieser Website an den Anbieter
            übertragen, solange Sie den Button nicht aktiv anklicken.
          </p>
        </Section>
      ) : null}

      <Section tone={tone} title="Externe Links">
        <p>
          Für verlinkte Angebote Dritter gelten deren Datenschutzerklärungen.
          Vor dem Anklicken eines solchen Links werden keine Daten an den
          Anbieter übertragen.
        </p>
      </Section>

      <Section tone={tone} title="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          sowie das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Für
          Bayern ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA)
          zuständig.
        </p>
      </Section>
    </Shell>
  );
}
