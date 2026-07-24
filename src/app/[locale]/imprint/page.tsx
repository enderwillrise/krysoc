import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { getDict } from "@/content/dictionary";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Imprint",
  robots: { index: false },
};

// TODO before launch: fill in the real legal details below (§5 DDG requires them).
const FIELDS = {
  name: "[Full legal name]",
  address: "[Street and number]\n[Postal code, City]\nGermany",
  email: "[Contact email]",
  vatId: "[VAT ID, if registered]",
};

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const de = locale === "de";

  return (
    <>
      <Nav locale={locale} dict={dict} />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-ivory">
          {de ? "Impressum" : "Imprint"}
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone">
          <section>
            <h2 className="font-display text-lg font-bold text-ivory">
              {de ? "Angaben gemäß § 5 DDG" : "Information pursuant to § 5 DDG"}
            </h2>
            <p className="mt-2 whitespace-pre-line">
              {FIELDS.name}
              {"\n"}
              {FIELDS.address}
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-ivory">
              {de ? "Kontakt" : "Contact"}
            </h2>
            <p className="mt-2">{FIELDS.email}</p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-ivory">
              {de ? "Umsatzsteuer-ID" : "VAT ID"}
            </h2>
            <p className="mt-2">{FIELDS.vatId}</p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-ivory">
              {de
                ? "Verantwortlich für den Inhalt"
                : "Responsible for content"}
            </h2>
            <p className="mt-2 whitespace-pre-line">
              {FIELDS.name}
              {"\n"}
              {FIELDS.address}
            </p>
          </section>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
