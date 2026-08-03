import {
  Bodoni_Moda,
  Jost,
  Newsreader,
  Manrope,
  Barlow_Condensed,
  Barlow,
  IBM_Plex_Mono,
  Unbounded,
  Archivo,
} from "next/font/google";

/**
 * One type pairing per concept, declared once and imported by that concept's
 * page + legal pages. Each demo applies only its own two families (plus the
 * shared mono used by the Krysoc concept bar), so no page ships fonts it
 * doesn't use.
 */

// Restaurant — high-contrast didone + geometric sans
export const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});
export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

// Arztpraxis — warm serif + humanist sans
export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Handwerk — condensed industrial + its regular-width sibling
export const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
export const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Shared — Krysoc concept bar
export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Krysoc's own faces — used only by the /demo hub, which IS a Krysoc page
export const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});
export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});
