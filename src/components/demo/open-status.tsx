"use client";

import { useEffect, useState } from "react";

export interface Range {
  from: string; // "11:30"
  to: string; // "23:00"
}

/** Index 0 = Sunday, matching Date.getDay(). */
export type WeekHours = Range[][];

const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

interface Status {
  open: boolean;
  /** "bis 23:00" when open, "Di 11:30" when closed. */
  detail: string;
}

function computeStatus(hours: WeekHours, now: Date): Status {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (const range of hours[day] ?? []) {
    if (minutes >= toMinutes(range.from) && minutes < toMinutes(range.to)) {
      return { open: true, detail: `bis ${range.to}` };
    }
  }

  // Next opening: later today, else scan forward up to a full week.
  const laterToday = (hours[day] ?? []).find(
    (r) => toMinutes(r.from) > minutes
  );
  if (laterToday) return { open: false, detail: `heute ${laterToday.from}` };

  for (let step = 1; step <= 7; step++) {
    const next = (day + step) % 7;
    const first = hours[next]?.[0];
    if (first) return { open: false, detail: `${DAYS[next]} ${first.from}` };
  }
  return { open: false, detail: "" };
}

/**
 * Live "open now" pill. Renders a neutral placeholder until mounted — the
 * server has no idea what time it is in the visitor's timezone, and rendering
 * a guess would hydrate-mismatch.
 *
 * A real deployment should pin this to Europe/Berlin rather than the visitor's
 * clock; for a concept demo the local clock reads correctly to anyone in DE.
 */
export function OpenStatus({
  hours,
  openLabel = "Jetzt geöffnet",
  closedLabel = "Geschlossen",
  className = "",
  toneOpen,
  toneClosed,
}: {
  hours: WeekHours;
  openLabel?: string;
  closedLabel?: string;
  className?: string;
  toneOpen: string;
  toneClosed: string;
}) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(computeStatus(hours, new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (!status) {
    return (
      <span className={`${className} ${toneClosed} opacity-0`} aria-hidden>
        &nbsp;
      </span>
    );
  }

  return (
    <span className={`${className} ${status.open ? toneOpen : toneClosed}`}>
      <span
        aria-hidden
        className={`live-dot inline-block h-1.5 w-1.5 rounded-full ${
          status.open ? "bg-current" : "bg-current opacity-60"
        }`}
      />
      {status.open ? openLabel : closedLabel}
      {status.detail ? (
        <span className="opacity-70">· {status.detail}</span>
      ) : null}
    </span>
  );
}
