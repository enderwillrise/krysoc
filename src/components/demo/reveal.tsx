"use client";

import { useEffect } from "react";

/**
 * Scroll reveal for the concept demos.
 *
 * Separate from the marketing site's `RevealObserver` (which watches `.reveal`)
 * so a change to one can never affect the other. Same contract, and it is the
 * important one: content is visible by default and is only hidden once this
 * component has run and added `.js-reveal` to <html>. With JS off or broken,
 * nothing is ever invisible.
 */
export function DemoReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".d-reveal"));
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
