"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site";

const RATE = 35; // €/hour staff cost
const WEEKS = 46; // working weeks per year
const SPRINT = 2900; // build sprint price

export function RoiWidget({
  locale,
  strings,
}: {
  locale: Locale;
  strings: {
    title: string;
    hours: string;
    assumption: string;
    yearly: string;
    paybackPrefix: string;
    paybackSuffix: string;
  };
}) {
  const [hours, setHours] = useState(10);
  const fmt = new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US");
  const yearly = hours * RATE * WEEKS;
  const paybackWeeks = Math.max(1, Math.ceil(SPRINT / (hours * RATE)));

  return (
    <div className="spot rounded-2xl border border-line bg-card p-7">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-ivory">
            {strings.title}
          </h3>
          <label className="mt-6 block font-mono text-xs uppercase tracking-widest text-stone">
            {strings.hours}
            <span className="ml-2 text-gold">{hours}h</span>
          </label>
          <input
            type="range"
            min={2}
            max={40}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
          <p className="mt-3 font-mono text-[11px] text-stone-dim">{strings.assumption}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line-soft bg-obsidian/70 p-5">
            <p className="font-display text-3xl font-bold tracking-tight text-gold">
              €{fmt.format(yearly)}
            </p>
            <p className="mt-2 text-sm leading-snug text-stone">{strings.yearly}</p>
          </div>
          <div className="rounded-xl border border-gold-deep bg-obsidian/70 p-5">
            <p className="font-display text-3xl font-bold tracking-tight text-gold">
              ~{paybackWeeks} {strings.paybackSuffix}
            </p>
            <p className="mt-2 text-sm leading-snug text-stone">{strings.paybackPrefix}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
