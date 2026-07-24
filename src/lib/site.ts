// Central site configuration — swap these when the real accounts exist.

// TODO: replace with a Krysoc-specific booking page (Cal.com / Calendly / Topmate).
// Currently points at Abdullah's existing Topmate so the CTA works from day one.
export const BOOKING_URL = "https://topmate.io/abdidoesstuff/1444941?utm_source=krysoc";

// TODO: create this mailbox before launch (or swap for a real address).
export const CONTACT_EMAIL = "hello@krysoc.com";

// TODO: set to the real production domain once connected.
export const SITE_URL = "https://krysoc.com";

export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
