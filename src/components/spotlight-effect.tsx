"use client";

import { useEffect } from "react";

// Delegated cursor tracking: any element with class "spot" gets --mx/--my
// CSS vars for its radial-gradient spotlight overlay (see globals.css).
export function SpotlightEffect() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
