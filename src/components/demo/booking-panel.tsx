/**
 * Mock of the practice's online-booking embed.
 *
 * This is the single most important element of the Arztpraxis concept: almost
 * every German practice already pays for Doctolib, samedi, Jameda or Dr. Flex,
 * and the pitch is that the website finally puts that booking flow where
 * patients look for it instead of burying it behind a phone number.
 *
 * Deliberately not interactive — clicking a fake slot would promise a booking
 * that cannot happen. The panel previews what the patient sees; the one real
 * control is the button, which goes to the practice's actual scheduler.
 */

const REASONS = ["Sprechstunde", "Vorsorge", "Impfung", "Blutabnahme"];

const DAYS = [
  { label: "Mo", date: "28.", slots: ["08:20", "09:40", "11:00"] },
  { label: "Di", date: "29.", slots: ["08:00", "10:20", "15:40"] },
  { label: "Mi", date: "30.", slots: ["09:00", "—", "16:20"] },
];

const PARTNERS = ["Doctolib", "samedi", "Jameda", "Dr. Flex", "TerminApp"];

export function BookingPanel({ bookingUrl }: { bookingUrl: string }) {
  return (
    <div className="prx-card overflow-hidden rounded-2xl border border-prx-line bg-prx-white">
      <div className="flex items-center justify-between gap-4 border-b border-prx-line px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-prx-ink">Termin online buchen</p>
          <p className="mt-0.5 text-xs text-prx-mute">
            Rund um die Uhr, ohne Wartschleife
          </p>
        </div>
        <span className="rounded-full bg-prx-mint px-3 py-1 text-[11px] font-medium text-prx-teal-deep">
          freie Termine
        </span>
      </div>

      <div className="px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-wider text-prx-mute">
          Anliegen
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {REASONS.map((reason, i) => (
            <span
              key={reason}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                i === 0
                  ? "border-prx-teal bg-prx-teal text-white"
                  : "border-prx-line text-prx-body"
              }`}
            >
              {reason}
            </span>
          ))}
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-wider text-prx-mute">
          Nächste freie Termine
        </p>
        <div className="relative mt-3 grid grid-cols-3 gap-3">
          {DAYS.map((day, dayIndex) => (
            <div key={day.label}>
              <p className="text-center text-xs font-semibold text-prx-ink">
                {day.label} {day.date}
              </p>
              <div className="mt-2 space-y-2">
                {day.slots.map((slot, slotIndex) => {
                  const empty = slot === "—";
                  // The slot the animated cursor lands on.
                  const highlighted = dayIndex === 1 && slotIndex === 1;
                  return (
                    <div
                      key={`${day.label}-${slotIndex}`}
                      className={`prx-slot rounded-lg border py-2 text-center text-xs ${
                        empty
                          ? "border-dashed border-prx-line text-prx-line"
                          : highlighted
                            ? "prx-slot-pulse border-prx-line text-prx-teal-deep font-medium"
                            : "border-prx-line bg-prx-white text-prx-body"
                      }`}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Animated pointer landing on the highlighted slot */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="prx-cursor pointer-events-none absolute left-[46%] top-[62%] h-5 w-5 drop-shadow"
          >
            <path
              d="M5 3l14 8-6.5 1.6L9.8 19z"
              fill="#122e2c"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-full bg-prx-teal px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-prx-teal-deep"
        >
          Termin bei Doctolib buchen →
        </a>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-prx-mute">
          Im Livebetrieb ist hier Ihr eigener Kalender eingebunden. Es werden
          erst Daten übertragen, wenn Patienten aktiv klicken.
        </p>
      </div>

      <div className="border-t border-prx-line bg-prx-paper px-6 py-4">
        <p className="text-[11px] uppercase tracking-wider text-prx-mute">
          Funktioniert mit Ihrem bestehenden System
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {PARTNERS.map((p) => (
            <span key={p} className="text-xs font-medium text-prx-body">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
