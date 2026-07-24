import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { getDict } from "@/content/dictionary";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const de = locale === "de";

  // TODO before launch: replace with a full GDPR privacy policy once analytics,
  // booking embeds and contact forms are final. This skeleton covers the current
  // static site (no cookies, no analytics, external booking link).
  const sections = de
    ? [
        {
          h: "Verantwortlicher",
          p: "Verantwortlich für die Datenverarbeitung auf dieser Website ist der im Impressum genannte Betreiber.",
        },
        {
          h: "Hosting",
          p: "Diese Website wird bei Vercel gehostet. Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs) in Server-Logfiles auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
        },
        {
          h: "Cookies & Tracking",
          p: "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste.",
        },
        {
          h: "Externe Links",
          p: "Für Terminbuchungen verlinken wir auf externe Anbieter. Beim Aufruf dieser Links gelten die Datenschutzerklärungen der jeweiligen Anbieter.",
        },
        {
          h: "Ihre Rechte",
          p: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Beschwerderecht bei einer Aufsichtsbehörde.",
        },
      ]
    : [
        {
          h: "Controller",
          p: "The operator named in the imprint is responsible for data processing on this website.",
        },
        {
          h: "Hosting",
          p: "This website is hosted by Vercel. When you visit the site, the hosting provider processes technically necessary data (e.g. IP address, time of access) in server log files on the basis of Art. 6(1)(f) GDPR.",
        },
        {
          h: "Cookies & tracking",
          p: "This website sets no cookies and uses no analytics or tracking services.",
        },
        {
          h: "External links",
          p: "For appointment booking we link to external providers. When you follow these links, the privacy policies of the respective providers apply.",
        },
        {
          h: "Your rights",
          p: "You have the right to access, rectification, erasure and restriction of processing of your personal data, and the right to lodge a complaint with a supervisory authority.",
        },
      ];

  return (
    <>
      <Nav locale={locale} dict={dict} />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-ivory">
          {de ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg font-bold text-ivory">{s.h}</h2>
              <p className="mt-2">{s.p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
