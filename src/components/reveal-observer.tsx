"use client";

import { useEffect } from "react";

// Progressive scroll-reveal: content is fully visible unless JS runs and
// motion is allowed — then .reveal elements fade in as they enter the viewport.
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    document.documentElement.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
