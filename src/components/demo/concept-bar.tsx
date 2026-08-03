import { BOOKING_URL } from "@/lib/site";

/**
 * The bar that sits on top of every concept demo.
 *
 * It does two jobs at once and must never be removed:
 *  1. It states plainly that the business below is invented, so a demo page
 *     cannot be mistaken for a real restaurant or medical practice.
 *  2. It is the sales CTA — the prospect is looking at their own future site,
 *     and the way to get it is one click away.
 */
export function ConceptBar({ label }: { label: string }) {
  return (
    <div className="concept-bar sticky top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-ks-mono text-[11px] font-medium tracking-tight text-ks-ivory">
            krysoc<span className="text-ks-gold">.</span>
          </span>
          <span aria-hidden className="h-3 w-px shrink-0 bg-white/15" />
          <p className="truncate font-ks-mono text-[10px] uppercase tracking-[0.14em] text-ks-stone">
            <span className="text-ks-gold">Konzept</span>
            <span className="hidden sm:inline"> · {label} · Beispiel, frei erfunden</span>
          </p>
        </div>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-ks-gold px-3 py-1 font-ks-mono text-[10px] font-semibold uppercase tracking-wider text-ks-obsidian transition-opacity hover:opacity-85"
        >
          So eine Website<span className="hidden sm:inline"> für mich</span> →
        </a>
      </div>
    </div>
  );
}
