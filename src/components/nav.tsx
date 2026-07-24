import Link from "next/link";
import { BOOKING_URL, type Locale } from "@/lib/site";
import type { Dict } from "@/content/dictionary";

export function Nav({ locale, dict }: { locale: Locale; dict: Dict }) {
  const other: Locale = locale === "en" ? "de" : "en";
  const links = [
    { href: `/${locale}/#services`, label: dict.nav.services },
    { href: `/${locale}/#work`, label: dict.nav.work },
    { href: `/${locale}/#process`, label: dict.nav.process },
    { href: `/${locale}/#pricing`, label: dict.nav.pricing },
    { href: `/${locale}/#faq`, label: dict.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-soft bg-obsidian/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href={`/${locale}/`}
          className="font-display text-lg font-bold tracking-tight text-ivory"
        >
          krysoc<span className="text-gold">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-stone transition-colors hover:text-ivory"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/${other}/`}
            aria-label={other === "de" ? "Deutsche Version" : "English version"}
            className="font-mono text-xs uppercase tracking-widest text-stone transition-colors hover:text-gold"
          >
            {other}
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-soft"
          >
            {dict.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
