import { BOOKING_URL, CONTACT_EMAIL, type Locale } from "@/lib/site";
import type { Dict } from "@/content/dictionary";
import { Pipeline } from "@/components/pipeline";
import { CountUp } from "@/components/count-up";
import {
  AnkommoVisual,
  UniGetVisual,
  EinbuergerungVisual,
} from "@/components/work-visuals";
import {
  FlowDemo,
  ChatDemo,
  BuildDemo,
  AuditDemo,
} from "@/components/service-visuals";
import { RoiWidget } from "@/components/roi-widget";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{children}</p>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-ivory sm:text-3xl">
        {title}
      </h2>
      {sub ? <p className="mt-5 text-base leading-relaxed text-stone">{sub}</p> : null}
    </div>
  );
}

function StaggerWords({
  text,
  startDelay = 0,
}: {
  text: string;
  startDelay?: number;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="hero-rise inline-block"
          style={{ animationDelay: `${startDelay + i * 0.07}s` }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const wordCountA = dict.hero.titleA.split(" ").length;
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div aria-hidden className="aurora aurora-a" />
      <div aria-hidden className="aurora aurora-b" />
      <div aria-hidden className="aurora aurora-c" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="hero-rise hero-rise-1">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 flex flex-wrap gap-x-[0.3em] gap-y-2 font-display text-[1.7rem] font-bold leading-[1.22] text-ivory sm:text-4xl sm:leading-[1.18] lg:text-[2.6rem]">
            <StaggerWords text={dict.hero.titleA} startDelay={0.1} />
            <span className="flex flex-wrap gap-x-[0.3em] gap-y-2 text-gold">
              <StaggerWords
                text={dict.hero.titleGold}
                startDelay={0.1 + wordCountA * 0.07}
              />
            </span>
          </h1>
          <p className="hero-rise hero-rise-3 mt-7 max-w-xl text-lg leading-relaxed text-stone">
            {dict.hero.sub}
          </p>
          <div className="hero-rise hero-rise-4 mt-9 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-obsidian transition-colors hover:bg-gold-soft"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href={`/${locale}/#services`}
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

const MARQUEE_ITEMS = [
  "n8n",
  "Make",
  "Zapier",
  "Claude",
  "OpenAI",
  "HubSpot",
  "Slack",
  "Notion",
  "Airtable",
  "Stripe",
  "Gmail",
  "Excel",
  "WhatsApp",
];

export function Marquee() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {MARQUEE_ITEMS.map((item, i) => (
        <span
          key={item}
          className="flex items-center gap-10 pr-10 font-mono text-sm uppercase tracking-[0.2em] text-stone-dim"
        >
          {item}
          <span
            aria-hidden
            className={`text-[0.55rem] ${
              ["text-gold-deep", "text-jade-deep", "text-amethyst-deep"][i % 3]
            }`}
          >
            ◆
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y border-line-soft py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function Proof({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead eyebrow={dict.proof.eyebrow} title={dict.proof.title} sub={dict.proof.sub} />
        <dl className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {dict.proof.stats.map((s, i) => (
            <div key={s.label} className="spot bg-card px-6 py-7">
              <span
                aria-hidden
                className={`stat-accent mb-4 block h-0.5 w-10 ${
                  ["bg-gold", "bg-jade", "bg-amethyst", "bg-gold"][i] ?? "bg-gold"
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
              />
              <dd className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl">
                <CountUp value={s.value} locale={locale} />
              </dd>
              <dt className="mt-3 text-sm leading-snug text-stone">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const SERVICE_DEMOS = [FlowDemo, ChatDemo, BuildDemo, AuditDemo];

// Accent system: gold = primary, jade = agents/Ankommo, amethyst = custom/UniGet
const SERVICE_ACCENTS = [
  { hover: "hover:border-gold-deep", tag: "group-hover:text-gold", dot: "bg-gold" },
  { hover: "hover:border-jade-deep", tag: "group-hover:text-jade", dot: "bg-jade" },
  { hover: "hover:border-amethyst-deep", tag: "group-hover:text-amethyst", dot: "bg-amethyst" },
  { hover: "hover:border-gold-deep", tag: "group-hover:text-gold", dot: "bg-gold" },
];

export function Services({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          sub={dict.services.sub}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {dict.services.items.map((item, i) => {
            const Demo = SERVICE_DEMOS[i];
            const accent = SERVICE_ACCENTS[i] ?? SERVICE_ACCENTS[0];
            return (
              <article
                key={item.title}
                className={`spot reveal group rounded-2xl border border-line bg-card p-5 transition-colors sm:p-6 ${accent.hover}`}
              >
                {Demo ? (
                  <div className="mb-5">
                    <Demo locale={locale} />
                  </div>
                ) : null}
                <p className={`font-mono text-xs uppercase tracking-[0.18em] text-stone-dim transition-colors ${accent.tag}`}>
                  {item.tag}
                </p>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-stone-dim">
                  {dict.services.examplesLabel}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {item.examples.map((ex) => (
                    <li key={ex} className="flex gap-2 text-sm text-stone">
                      <span aria-hidden className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
                      {ex}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WORK_VISUALS = [AnkommoVisual, UniGetVisual, EinbuergerungVisual];

const WORK_ACCENTS = [
  { label: "text-jade", border: "border-jade-deep" },
  { label: "text-amethyst", border: "border-amethyst-deep" },
  { label: "text-gold", border: "border-gold-deep" },
];

export function Work({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="work" className="scroll-mt-24 border-y border-line-soft bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead eyebrow={dict.work.eyebrow} title={dict.work.title} sub={dict.work.sub} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {dict.work.items.map((item, i) => {
            const Visual = WORK_VISUALS[i];
            const accent = WORK_ACCENTS[i] ?? WORK_ACCENTS[2];
            return (
            <article
              key={item.name}
              className="spot reveal flex flex-col rounded-2xl border border-line bg-card p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
            >
              {Visual ? (
                <div className="mb-5">
                  <Visual locale={locale} />
                </div>
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-widest text-stone-dim">
                {item.domain}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ivory">
                {item.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
              <div className="mt-auto pt-6">
                <p className={`font-mono text-[11px] uppercase tracking-widest ${accent.label}`}>
                  {dict.work.resultLabel}
                </p>
                <p className={`mt-2 border-l-2 pl-3 text-sm leading-relaxed text-stone ${accent.border}`}>
                  {item.result}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEP_ACCENTS = [
  { station: "border-gold-deep text-gold", chip: "text-gold" },
  { station: "border-jade-deep text-jade", chip: "text-jade" },
  { station: "border-amethyst-deep text-amethyst", chip: "text-amethyst" },
];

export function Process({ dict }: { dict: Dict }) {
  return (
    <section id="process" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          sub={dict.process.sub}
          center
        />
        <div className="relative mt-16">
          <div
            aria-hidden
            className="conveyor absolute left-8 right-8 top-7 hidden h-px lg:block"
          />
          <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
            {dict.process.steps.map((step, i) => {
              const accent = STEP_ACCENTS[i] ?? STEP_ACCENTS[0];
              return (
              <li key={step.num} className="reveal relative lg:px-2">
                <div className="flex items-center gap-4">
                  <span
                    className={`station relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-obsidian font-display text-sm font-bold ${accent.station}`}
                    style={{ "--d": `${i * 1}s` } as React.CSSProperties}
                  >
                    {step.num}
                  </span>
                  <span className={`rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${accent.chip}`}>
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ivory">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
                  {step.body}
                </p>
              </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="pricing" className="scroll-mt-24 border-y border-line-soft bg-coal/60">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          eyebrow={dict.pricing.eyebrow}
          title={dict.pricing.title}
          sub={dict.pricing.sub}
          center
        />
        <div className="reveal mt-12">
          <RoiWidget locale={locale} strings={dict.pricing.roi} />
        </div>
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
          {dict.pricing.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`spot reveal relative rounded-2xl border p-7 ${
                tier.highlight
                  ? "border-gold-deep bg-card shadow-[0_0_60px_rgba(230,185,99,0.07)]"
                  : "border-line bg-card"
              }`}
            >
              {tier.highlight ? (
                <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-obsidian">
                  {dict.pricing.badge}
                </span>
              ) : null}
              <h3 className="font-display text-base font-semibold text-ivory">{tier.name}</h3>
              <p className="mt-5 font-display text-3xl font-bold tracking-tight text-gold">
                {tier.price}
              </p>
              <p className="mt-2 font-mono text-xs text-stone-dim">{tier.priceNote}</p>
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
                    ? "btn-shine bg-gold text-obsidian hover:bg-gold-soft"
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow={dict.faq.eyebrow} title={dict.faq.title} />
        </div>
        <div className="space-y-3">
          {dict.faq.items.map((item, i) => (
            <details key={item.q} className="faq reveal rounded-xl border border-line bg-card">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 text-base font-medium text-ivory">
                <span
                  aria-hidden
                  className={`font-mono text-[11px] ${
                    ["text-gold", "text-jade", "text-amethyst"][i % 3]
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.q}</span>
                <span aria-hidden className="faq-chevron shrink-0 text-gold">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 pl-[3.35rem] text-sm leading-relaxed text-stone">
                {item.a}
              </p>
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
        <h2 className="reveal font-display text-3xl font-bold leading-snug text-ivory sm:text-4xl">
          {dict.finalCta.title}
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone">
          {dict.finalCta.sub}
        </p>
        <div className="reveal mt-9">
          <div className="flex items-center justify-center gap-5">
            <span aria-hidden className="conveyor h-px max-w-36 flex-1" />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-block rounded-full bg-gold px-8 py-4 text-base font-semibold text-obsidian transition-colors hover:bg-gold-soft"
            >
              {dict.finalCta.cta}
            </a>
            <span
              aria-hidden
              className="conveyor h-px max-w-36 flex-1"
              style={{ animationDirection: "reverse" }}
            />
          </div>
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
