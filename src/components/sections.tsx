import { BOOKING_URL, CONTACT_EMAIL, type Locale } from "@/lib/site";
import type { Dict } from "@/content/dictionary";
import { Pipeline } from "@/components/pipeline";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{children}</p>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="reveal max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ivory sm:text-4xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-base leading-relaxed text-stone">{sub}</p> : null}
    </div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52rem 26rem at 70% -5%, rgba(230,185,99,0.09), transparent 60%), radial-gradient(40rem 20rem at 10% 110%, rgba(122,79,29,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="hero-rise hero-rise-1">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="hero-rise hero-rise-2 mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            {dict.hero.titleA}{" "}
            <span className="text-gold">{dict.hero.titleGold}</span>
          </h1>
          <p className="hero-rise hero-rise-3 mt-6 max-w-xl text-lg leading-relaxed text-stone">
            {dict.hero.sub}
          </p>
          <div className="hero-rise hero-rise-4 mt-8 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-obsidian transition-colors hover:bg-gold-soft"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href={`/${locale}#services`}
              className="rounded-full border border-line px-7 py-3.5 text-base text-ivory transition-colors hover:border-gold-deep"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <figure className="hero-rise hero-rise-3">
          <div className="rounded-3xl border border-line bg-coal/70 p-4 shadow-[0_0_80px_rgba(230,185,99,0.06)]">
            <Pipeline locale={locale} />
          </div>
          <figcaption className="mt-3 text-center font-mono text-xs text-stone-dim">
            {dict.hero.pipelineCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Proof({ dict }: { dict: Dict }) {
  return (
    <section className="border-y border-line-soft bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead eyebrow={dict.proof.eyebrow} title={dict.proof.title} sub={dict.proof.sub} />
        <dl className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {dict.proof.stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-7">
              <dd className="font-display text-4xl font-extrabold tracking-tight text-gold">
                {s.value}
              </dd>
              <dt className="mt-2 text-sm leading-snug text-stone">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Services({ dict }: { dict: Dict }) {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          sub={dict.services.sub}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {dict.services.items.map((item) => (
            <article
              key={item.title}
              className="reveal group rounded-2xl border border-line bg-card p-7 transition-colors hover:border-gold-deep"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-dim group-hover:text-gold">
                {item.tag}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-ivory">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-stone-dim">
                {dict.services.examplesLabel}
              </p>
              <ul className="mt-2 space-y-1.5">
                {item.examples.map((ex) => (
                  <li key={ex} className="flex gap-2 text-sm text-stone">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {ex}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work({ dict }: { dict: Dict }) {
  return (
    <section id="work" className="scroll-mt-24 border-y border-line-soft bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead eyebrow={dict.work.eyebrow} title={dict.work.title} sub={dict.work.sub} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {dict.work.items.map((item) => (
            <article
              key={item.name}
              className="reveal flex flex-col rounded-2xl border border-line bg-card p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-stone-dim">
                {item.domain}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ivory">
                {item.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
              <div className="mt-auto pt-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
                  {dict.work.resultLabel}
                </p>
                <p className="mt-2 border-l-2 border-gold-deep pl-3 text-sm leading-relaxed text-stone">
                  {item.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ dict }: { dict: Dict }) {
  return (
    <section id="process" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          sub={dict.process.sub}
        />
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {dict.process.steps.map((step) => (
            <li
              key={step.num}
              className="reveal relative rounded-2xl border border-line bg-card p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-5 right-5 font-display text-7xl font-extrabold text-line select-none"
              >
                {step.num}
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                {step.duration}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-ivory">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing({ dict }: { dict: Dict }) {
  return (
    <section id="pricing" className="scroll-mt-24 border-y border-line-soft bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.pricing.eyebrow}
          title={dict.pricing.title}
          sub={dict.pricing.sub}
        />
        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {dict.pricing.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`reveal rounded-2xl border p-7 ${
                tier.highlight
                  ? "border-gold-deep bg-card shadow-[0_0_60px_rgba(230,185,99,0.07)]"
                  : "border-line bg-card"
              }`}
            >
              <h3 className="font-display text-lg font-bold text-ivory">{tier.name}</h3>
              <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-gold">
                {tier.price}
              </p>
              <p className="mt-1 font-mono text-xs text-stone-dim">{tier.priceNote}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone">{tier.body}</p>
              <ul className="mt-5 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-stone">
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="mt-0.5 h-4 w-4 shrink-0"
                    >
                      <path
                        d="M3 8.5 6.5 12 13 4.5"
                        fill="none"
                        stroke="#e6b963"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlight
                    ? "bg-gold text-obsidian hover:bg-gold-soft"
                    : "border border-line text-ivory hover:border-gold-deep"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="reveal mt-6 font-mono text-xs text-stone-dim">{dict.pricing.footnote}</p>
      </div>
    </section>
  );
}

export function Faq({ dict }: { dict: Dict }) {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <SectionHead eyebrow={dict.faq.eyebrow} title={dict.faq.title} />
        <div className="mt-10 space-y-3">
          {dict.faq.items.map((item) => (
            <details key={item.q} className="faq reveal rounded-xl border border-line bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-medium text-ivory">
                {item.q}
                <span aria-hidden className="faq-chevron shrink-0 text-gold">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ dict }: { dict: Dict }) {
  return (
    <section className="relative overflow-hidden border-t border-line-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(44rem 22rem at 50% 120%, rgba(230,185,99,0.13), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
        <h2 className="reveal font-display text-4xl font-extrabold tracking-tight text-ivory sm:text-5xl">
          {dict.finalCta.title}
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone">
          {dict.finalCta.sub}
        </p>
        <div className="reveal mt-9">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gold px-8 py-4 text-base font-semibold text-obsidian transition-colors hover:bg-gold-soft"
          >
            {dict.finalCta.cta}
          </a>
          <p className="mt-5 text-sm text-stone-dim">
            {dict.finalCta.emailLabel}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono text-gold hover:text-gold-soft"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
