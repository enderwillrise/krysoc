import Link from "next/link";
import {
  RUN_STATUS_META,
  type RunStatus,
  type PublishStatus,
} from "@/lib/kadenz/schema";

/* ------------------------------------------------------------------ */
/* Status                                                              */
/* ------------------------------------------------------------------ */

const TONE_COLOR = {
  neutral: "var(--color-stone-dim)",
  pending: "var(--color-gold)",
  good: "var(--color-jade)",
  bad: "var(--color-rust)",
} as const;

/**
 * Colour never carries meaning alone — the label is always rendered
 * alongside the dot.
 */
export function StatusPill({ status }: { status: RunStatus }) {
  const meta = RUN_STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-ivory">
      <span
        className="dot"
        style={{ background: TONE_COLOR[meta.tone] }}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}

const PUBLISH_TONE: Record<PublishStatus, keyof typeof TONE_COLOR> = {
  pending: "neutral",
  accepted: "pending",
  verified: "good",
  failed: "bad",
};

const PUBLISH_LABEL: Record<PublishStatus, string> = {
  pending: "Pending",
  accepted: "Accepted (unverified)",
  verified: "Verified live",
  failed: "Failed",
};

export function PublishPill({ status }: { status: PublishStatus }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-ivory">
      <span
        className="dot"
        style={{ background: TONE_COLOR[PUBLISH_TONE[status]] }}
        aria-hidden
      />
      {PUBLISH_LABEL[status]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ivory">
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  type,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
}) {
  const cls =
    variant === "primary"
      ? "bg-gold text-obsidian hover:bg-gold-soft"
      : "border border-line text-ivory hover:border-gold-deep";
  const base = `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${cls}`;
  if (href)
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  return (
    <button type={type ?? "button"} className={base}>
      {children}
    </button>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="card p-10 text-center text-stone">
      <p>{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mock imagery                                                        */
/* ------------------------------------------------------------------ */

/**
 * Fixture image URLs use a `mock:` scheme. Rather than fetch anything, we
 * render a deterministic gradient block derived from the key — so the
 * skeleton is obviously mock, works offline, and never depends on a CDN.
 */
export function MockImage({
  src,
  ratio = "3 / 4",
  label,
}: {
  src: string;
  ratio?: string;
  label?: string;
}) {
  const key = src.replace("mock:", "");
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 360;

  return (
    <div
      className="relative flex items-end overflow-hidden rounded-lg border border-line"
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(150deg, hsl(${hue} 22% 16%), hsl(${(hue + 40) % 360} 30% 9%))`,
      }}
      role="img"
      aria-label={label ?? `Placeholder image ${key}`}
    >
      {label ? (
        <p className="w-full p-3 font-display text-sm leading-snug text-ivory/90">
          {label}
        </p>
      ) : null}
      <span className="eyebrow absolute top-2 right-2 opacity-60">mock</span>
    </div>
  );
}
