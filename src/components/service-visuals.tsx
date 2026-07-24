import type { Locale } from "@/lib/site";

// One distinct animated mini-demo per service. Pure markup + CSS
// (keyframes in globals.css) — no client JS, reduced-motion safe.

function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-xl border border-line-soft bg-obsidian/80 px-4 py-3">
      {children}
    </div>
  );
}

/* 01 — Workflow automation: a tool-to-tool flow with traveling dots */
const FLOW_LABELS: Record<Locale, [string, string]> = {
  en: ["NEW INVOICE", "BOOKED"],
  de: ["NEUE RECHNUNG", "VERBUCHT"],
};

export function FlowDemo({ locale }: { locale: Locale }) {
  const [input, output] = FLOW_LABELS[locale];
  return (
    <DemoShell>
      <svg viewBox="0 0 340 110" className="h-full w-full" aria-hidden>
        <path
          id="flow-a"
          d="M 96 40 C 130 40, 140 55, 170 55"
          fill="none"
          stroke="#2c261b"
          strokeWidth="1.5"
        />
        <path
          id="flow-b"
          d="M 196 55 C 226 55, 236 70, 260 70"
          fill="none"
          stroke="#2c261b"
          strokeWidth="1.5"
        />
        <circle r="3" fill="#e6b963" className="pipeline-dot">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 96 40 C 130 40, 140 55, 170 55" />
        </circle>
        <circle r="3" fill="#f1d9a6" className="pipeline-dot">
          <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M 196 55 C 226 55, 236 70, 260 70" />
        </circle>

        <rect x="8" y="24" width="88" height="32" rx="9" fill="#14110c" stroke="#2c261b" />
        <text x="52" y="43" textAnchor="middle" fill="#a69c87" fontSize="9" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.08em">
          {input}
        </text>

        <g className="animate-node-pulse">
          <circle cx="183" cy="55" r="13" fill="#191510" stroke="#e6b963" strokeWidth="1.3" />
          <text x="183" y="59.5" textAnchor="middle" fill="#e6b963" fontSize="11" fontWeight="700" fontFamily="var(--font-unbounded), sans-serif">
            K
          </text>
        </g>

        <rect x="260" y="54" width="72" height="32" rx="9" fill="#14110c" stroke="#3a3222" />
        <path d="M 271 70 l 3 3.5 l 5.5 -6.5" fill="none" stroke="#e6b963" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="284" y="74" fill="#c9bfa9" fontSize="8.5" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.05em">
          {output}
        </text>
      </svg>
    </DemoShell>
  );
}

/* 02 — AI agents: a support chat that answers itself */
const CHAT: Record<Locale, { q: string; a: string; tag: string }> = {
  en: {
    q: "Where is my order #4712?",
    a: "Shipped today — tracking is in your inbox. Anything else?",
    tag: "AI AGENT · 3S",
  },
  de: {
    q: "Wo ist meine Bestellung #4712?",
    a: "Heute versandt — Tracking ist in Ihrem Postfach. Sonst noch etwas?",
    tag: "KI-AGENT · 3S",
  },
};

export function ChatDemo({ locale }: { locale: Locale }) {
  const t = CHAT[locale];
  return (
    <DemoShell>
      <div className="flex h-full flex-col justify-center gap-2">
        <div className="chat-b1 max-w-[80%] self-start rounded-xl rounded-bl-sm border border-line-soft bg-coal px-3 py-1.5 text-[11px] text-stone">
          {t.q}
        </div>
        <div className="chat-typing flex gap-1 self-end pr-1" aria-hidden>
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-jade-deep" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-jade-deep" style={{ animationDelay: "0.15s" }} />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-jade-deep" style={{ animationDelay: "0.3s" }} />
        </div>
        <div className="chat-b2 max-w-[85%] self-end rounded-xl rounded-br-sm border border-jade-deep/60 bg-[#0f1e17] px-3 py-1.5 text-[11px] text-ivory">
          {t.a}
          <span className="mt-1 block font-mono text-[8px] tracking-widest text-jade">
            {t.tag}
          </span>
        </div>
      </div>
    </DemoShell>
  );
}

/* 03 — Custom AI apps: an API call typing itself out, then deploying */
const CODE_LINES: Record<Locale, [string, string, string]> = {
  en: [
    "POST /api/quote  {docs: 42}",
    "→ Claude analyzes 42 documents",
    "✓ offer.pdf generated · 1.2s",
  ],
  de: [
    "POST /api/angebot  {docs: 42}",
    "→ Claude analysiert 42 Dokumente",
    "✓ angebot.pdf erstellt · 1,2s",
  ],
};

export function BuildDemo({ locale }: { locale: Locale }) {
  const lines = CODE_LINES[locale];
  return (
    <DemoShell>
      <div className="flex h-full flex-col justify-center gap-2.5 font-mono text-[10.5px]">
        <p className="type-line type-line-1 text-stone">{lines[0]}</p>
        <p className="type-line type-line-2 text-stone-dim">{lines[1]}</p>
        <p className="type-line type-line-3 text-amethyst">{lines[2]}</p>
      </div>
      <span aria-hidden className="type-caret absolute bottom-3 left-4 h-3 w-1.5 bg-amethyst" />
    </DemoShell>
  );
}

/* 04 — Audits: a scanner sweeping a process map, flagging the bottleneck */
const AUDIT_CELLS = ["CRM", "MAIL", "XLS", "PDF", "ERP", "CAL", "DOCS", "BANK"];
const AUDIT_CHIP: Record<Locale, string> = { en: "−80 h/yr", de: "−80 h/Jahr" };

export function AuditDemo({ locale }: { locale: Locale }) {
  return (
    <DemoShell>
      <div className="relative h-full">
        <div className="grid h-full grid-cols-4 content-center gap-2">
          {AUDIT_CELLS.map((cell, i) => (
            <div
              key={cell}
              className={`flex h-10 items-center justify-center rounded-lg border font-mono text-[9px] tracking-widest ${
                i === 5
                  ? "audit-target border-gold-deep text-gold"
                  : "border-line-soft text-stone-dim"
              }`}
            >
              {cell}
              {i === 5 ? (
                <span className="audit-chip absolute -top-1 right-6 rounded-full border border-gold-deep bg-obsidian px-2 py-0.5 font-mono text-[9px] text-gold">
                  {AUDIT_CHIP[locale]}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div aria-hidden className="scan-beam pointer-events-none absolute inset-y-0 w-12" />
      </div>
    </DemoShell>
  );
}
