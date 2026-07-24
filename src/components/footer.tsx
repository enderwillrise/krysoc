import Link from "next/link";
import { CONTACT_EMAIL, type Locale } from "@/lib/site";
import type { Dict } from "@/content/dictionary";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const other: Locale = locale === "en" ? "de" : "en";
  return (
    <footer className="overflow-hidden border-t border-line-soft bg-coal">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-ivory">
            krysoc<span className="text-gold">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
            {dict.footer.tagline}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block font-mono text-xs tracking-wide text-gold hover:text-gold-soft"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-dim">
            {dict.footer.nav}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: `/${locale}/#services`, label: dict.nav.services },
              { href: `/${locale}/#work`, label: dict.nav.work },
              { href: `/${locale}/#pricing`, label: dict.nav.pricing },
              { href: `/${locale}/#faq`, label: dict.nav.faq },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-stone transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-dim">
            {dict.footer.legal}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href={`/${locale}/imprint/`}
                className="text-stone transition-colors hover:text-ivory"
              >
                {dict.footer.imprint}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/privacy/`}
                className="text-stone transition-colors hover:text-ivory"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`/${other}/`}
                className="text-stone transition-colors hover:text-ivory"
              >
                {dict.footer.language}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="watermark -mb-6">
        KRYSOC
      </div>
      <div className="relative border-t border-line-soft bg-coal">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-stone-dim">
          © {new Date().getFullYear()} Krysoc
        </p>
      </div>
    </footer>
  );
}
