import type { Locale } from "@/lib/site";

// Animated mini-screens for the case-study cards. Pure markup + CSS
// (keyframes in globals.css) — no client JS, reduced-motion safe.

function MockFrame({
  label,
  live,
  children,
}: {
  label: string;
  live?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-soft bg-obsidian/80">
      <div className="flex items-center justify-between border-b border-line-soft px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </span>
        <span className="font-mono text-[9px] tracking-widest text-stone-dim">{label}</span>
        {live ? (
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-gold">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" />
            {live}
          </span>
        ) : (
          <span className="w-8" />
        )}
      </div>
      <div className="h-[8.9rem] px-3 py-2.5">{children}</div>
    </div>
  );
}

const FEED_ROWS: Record<Locale, [string, string][]> = {
  en: [
    ["07:10", "Blog post published"],
    ["07:12", "214 emails sent"],
    ["07:31", "Failed payment recovered"],
    ["07:58", "Audio clips generated"],
    ["08:05", "New signup tagged"],
    ["08:20", "Weekly digest queued"],
  ],
  de: [
    ["07:10", "Blogartikel veröffentlicht"],
    ["07:12", "214 E-Mails versendet"],
    ["07:31", "Zahlung zurückgeholt"],
    ["07:58", "Audioclips generiert"],
    ["08:05", "Neuer Nutzer getaggt"],
    ["08:20", "Wochen-Digest geplant"],
  ],
};

export function AnkommoVisual({ locale }: { locale: Locale }) {
  const rows = FEED_ROWS[locale];
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="space-y-1.5 pb-1.5">
      {rows.map(([time, text]) => (
        <li key={time} className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-stone-dim">{time}</span>
          <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0">
            <path
              d="M2 6.5 5 9.5 10 3"
              fill="none"
              stroke="#e6b963"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate text-stone">{text}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <MockFrame label="ops.ankommo.de" live="LIVE">
      <div className="feed-mask h-full overflow-hidden">
        <div className="feed-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </MockFrame>
  );
}

const UNIS: [string, number][] = [
  ["TU München", 94],
  ["RWTH Aachen", 88],
  ["Uni Heidelberg", 81],
];

export function UniGetVisual({ locale }: { locale: Locale }) {
  return (
    <MockFrame
      label="uniget"
      live={locale === "de" ? "6 ANTWORTEN" : "6 ANSWERS"}
    >
      <p className="font-mono text-[9px] uppercase tracking-widest text-stone-dim">
        {locale === "de" ? "Deine besten Matches" : "Your top matches"}
      </p>
      <ul className="mt-2 space-y-2.5">
        {UNIS.map(([name, score], i) => (
          <li key={name}>
            <div className="flex items-baseline justify-between font-mono text-[10px]">
              <span className="text-stone">{name}</span>
              <span className="text-gold">{score}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line-soft">
              <div
                className="mock-bar-fill h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
                style={{
                  "--w": `${score}%`,
                  transitionDelay: `${0.15 + i * 0.2}s`,
                } as React.CSSProperties}
              />
            </div>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

export function EinbuergerungVisual({ locale }: { locale: Locale }) {
  const options: { text: string; correct?: boolean }[] = [
    { text: "Bundesstaat", correct: true },
    { text: "Königreich" },
    { text: "Zentralstaat" },
  ];
  return (
    <MockFrame label="einbürgerungstest" live={locale === "de" ? "460 FRAGEN" : "460 QUESTIONS"}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-stone-dim">
          {locale === "de" ? "Frage 24 von 33" : "Question 24 of 33"}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line-soft">
          <div className="quiz-progress h-full rounded-full bg-gold-deep" />
        </div>
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-ivory">Deutschland ist ein …</p>
      <ul className="mt-1.5 space-y-1">
        {options.map((o) => (
          <li
            key={o.text}
            className={`flex items-center justify-between rounded-md border border-line-soft px-2 py-1 font-mono text-[10px] text-stone ${
              o.correct ? "quiz-correct" : ""
            }`}
          >
            {o.text}
            {o.correct ? (
              <svg aria-hidden viewBox="0 0 12 12" className="quiz-check h-2.5 w-2.5">
                <path
                  d="M2 6.5 5 9.5 10 3"
                  fill="none"
                  stroke="#e6b963"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}
