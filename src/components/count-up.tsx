"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

// Animates a stat value ("10,000+" / "10.000+") from 0 when it scrolls into
// view. Renders the final string for no-JS, reduced motion, and tiny numbers.
export function CountUp({ value, locale }: { value: string; locale: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const digits = value.replace(/[^\d]/g, "");
    const target = Number(digits);
    if (!Number.isFinite(target) || target < 100) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const suffix = value.endsWith("+") ? "+" : "";
    const fmt = new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US");
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(fmt.format(Math.round(target * eased)) + suffix);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(fmt.format(0) + suffix);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, locale]);

  return <span ref={ref}>{display}</span>;
}
