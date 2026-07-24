import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { LOCALES, SITE_URL, isLocale, type Locale } from "@/lib/site";
import { getDict } from "@/content/dictionary";
import { RevealObserver } from "@/components/reveal-observer";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const dict = getDict(safeLocale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s — Krysoc",
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: { en: "/en", de: "/de" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${safeLocale}`,
      siteName: "Krysoc",
      locale: safeLocale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  return (
    <html lang={lang}>
      <body
        className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable} antialiased`}
      >
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
