import type { Locale } from "@/lib/site";

const LABELS: Record<
  Locale,
  { inputs: string[]; outputs: string[]; core: string }
> = {
  en: {
    inputs: ["NEW LEAD", "INVOICE", "EMAIL", "TICKET"],
    outputs: ["CRM UPDATED", "REPLY SENT", "BOOKED"],
    core: "KRYSOC CORE",
  },
  de: {
    inputs: ["NEUER LEAD", "RECHNUNG", "E-MAIL", "TICKET"],
    outputs: ["CRM AKTUELL", "ANTWORT RAUS", "VERBUCHT"],
    core: "KRYSOC CORE",
  },
};

// Curved connectors: four inputs converge on the core, three outputs fan out.
const IN_PATHS = [
  "M 138 64 C 200 64, 208 200, 244 206",
  "M 138 158 C 196 158, 206 204, 244 209",
  "M 138 252 C 196 252, 206 216, 244 211",
  "M 138 346 C 200 346, 208 220, 244 214",
];
const OUT_PATHS = [
  "M 316 204 C 352 198, 360 112, 420 110",
  "M 316 210 C 356 210, 364 205, 420 205",
  "M 316 216 C 352 222, 360 300, 420 300",
];

const IN_Y = [47, 141, 235, 329];
const OUT_Y = [93, 188, 283];

export function Pipeline({ locale }: { locale: Locale }) {
  const t = LABELS[locale];
  return (
    <svg
      viewBox="0 0 560 400"
      role="img"
      aria-label="Diagram of an automation: incoming requests are processed by the Krysoc core and come out as finished work"
      className="h-auto w-full"
    >
      <defs>
        <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2c261b" />
        </pattern>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6b963" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e6b963" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="560" height="400" fill="url(#dotgrid)" opacity="0.5" />

      {/* connectors */}
      {IN_PATHS.map((d, i) => (
        <path
          key={`in-${i}`}
          d={d}
          id={`in-path-${i}`}
          fill="none"
          stroke="#2c261b"
          strokeWidth="1.5"
        />
      ))}
      {OUT_PATHS.map((d, i) => (
        <path
          key={`out-${i}`}
          d={d}
          id={`out-path-${i}`}
          fill="none"
          stroke="#2c261b"
          strokeWidth="1.5"
        />
      ))}

      {/* traveling dots */}
      {IN_PATHS.map((d, i) => (
        <circle key={`dot-in-${i}`} r="3.2" fill="#e6b963" className="pipeline-dot">
          <animateMotion
            dur="3.2s"
            begin={`${i * 0.8}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      ))}
      {OUT_PATHS.map((d, i) => (
        <circle key={`dot-out-${i}`} r="3.2" fill="#f1d9a6" className="pipeline-dot">
          <animateMotion
            dur="2.4s"
            begin={`${0.9 + i * 1.1}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      ))}

      {/* input chips */}
      {t.inputs.map((label, i) => (
        <g key={label}>
          <rect
            x="10"
            y={IN_Y[i]}
            width="128"
            height="34"
            rx="10"
            fill="#14110c"
            stroke="#2c261b"
          />
          <circle cx="28" cy={IN_Y[i] + 17} r="3" fill="#a69c87" opacity="0.7" />
          <text
            x="40"
            y={IN_Y[i] + 21}
            fill="#a69c87"
            fontSize="10"
            fontFamily="var(--font-plex-mono), monospace"
            letterSpacing="0.08em"
          >
            {label}
          </text>
        </g>
      ))}

      {/* core */}
      <circle cx="280" cy="210" r="70" fill="url(#coreGlow)" />
      <circle
        cx="280"
        cy="210"
        r="36"
        fill="#191510"
        stroke="#e6b963"
        strokeWidth="1.5"
        className="animate-node-pulse"
      />
      <circle
        cx="280"
        cy="210"
        r="46"
        fill="none"
        stroke="#e6b963"
        strokeWidth="0.75"
        strokeDasharray="3 6"
        opacity="0.5"
      />
      <text
        x="280"
        y="222"
        textAnchor="middle"
        fill="#e6b963"
        fontSize="30"
        fontWeight="700"
        fontFamily="var(--font-bricolage), sans-serif"
      >
        K
      </text>
      <text
        x="280"
        y="286"
        textAnchor="middle"
        fill="#6f6653"
        fontSize="9"
        fontFamily="var(--font-plex-mono), monospace"
        letterSpacing="0.16em"
      >
        {t.core}
      </text>

      {/* output chips */}
      {t.outputs.map((label, i) => (
        <g key={label}>
          <rect
            x="420"
            y={OUT_Y[i]}
            width="130"
            height="34"
            rx="10"
            fill="#14110c"
            stroke="#3a3222"
          />
          <path
            d={`M 432 ${OUT_Y[i] + 17} l 3.5 4 l 6 -7`}
            fill="none"
            stroke="#e6b963"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="448"
            y={OUT_Y[i] + 21}
            fill="#c9bfa9"
            fontSize="9.5"
            fontFamily="var(--font-plex-mono), monospace"
            letterSpacing="0.06em"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
