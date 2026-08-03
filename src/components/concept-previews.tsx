/**
 * Miniature previews of the three concept demos at /demo/*.
 *
 * Deliberately NOT the mini-screen treatment used by the Work section — those
 * show a product's internals (activity feed, match bars, quiz). These show a
 * whole website in miniature, so the visitor can see three genuinely different
 * designs at a glance and recognise their own industry.
 *
 * Colours here are literal hex on purpose: they are the DEMO brands' palettes
 * (rst-/prx-/hwk- in demo.css), not Krysoc tokens, and the marketing
 * stylesheet must not gain a fourth, fifth and sixth accent family to render a
 * preview. Same exemption the SVG stroke attributes already use. If a demo's
 * palette changes, mirror it here.
 */

function Chrome({
  url,
  bar,
  dot,
  children,
}: {
  url: string;
  bar: string;
  dot: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: bar }}>
        <span aria-hidden className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: dot }}
            />
          ))}
        </span>
        <span
          className="ml-1 truncate rounded px-2 py-0.5 text-[8px]"
          style={{ background: dot, color: bar }}
        >
          {url}
        </span>
      </div>
      <div className="relative h-44">{children}</div>
    </div>
  );
}

export function RestaurantPreview() {
  return (
    <Chrome url="trattoria-salvia.de" bar="#2c2016" dot="#c3ac93">
      <div className="h-full px-4 py-3.5" style={{ background: "#171009" }}>
        <p className="text-[7px] tracking-[0.2em]" style={{ color: "#8a9a63" }}>
          ITALIENISCHE KÜCHE
        </p>
        <p
          className="mt-1.5 font-serif text-lg leading-tight"
          style={{ color: "#f6ece0" }}
        >
          Wie bei Nonna.
          <span className="block italic" style={{ color: "#d9a05b" }}>
            Nur mit Reservierung.
          </span>
        </p>
        <span
          className="mt-2.5 inline-block rounded-full px-3 py-1 text-[8px]"
          style={{ background: "#d9a05b", color: "#171009" }}
        >
          Tisch reservieren
        </span>
        <div className="mt-3 space-y-1.5">
          {[
            ["Vitello Tonnato", "13,50"],
            ["Cacio e Pepe", "15,00"],
            ["Tiramisù della Casa", "8,50"],
          ].map(([dish, price]) => (
            <div key={dish} className="flex items-center gap-2">
              <span className="font-serif text-[9px]" style={{ color: "#f6ece0" }}>
                {dish}
              </span>
              <span
                aria-hidden
                className="h-px flex-1"
                style={{ background: "#3d2e21" }}
              />
              <span className="font-serif text-[9px]" style={{ color: "#d9a05b" }}>
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function PraxisPreview() {
  return (
    <Chrome url="praxis-am-lindenplatz.de" bar="#dde8e6" dot="#7d918f">
      <div className="h-full px-4 py-3.5" style={{ background: "#f5f8f8" }}>
        <p className="text-[7px] tracking-[0.2em]" style={{ color: "#10736a" }}>
          HAUSARZTPRAXIS
        </p>
        <p
          className="mt-1.5 font-serif text-base leading-tight"
          style={{ color: "#122e2c" }}
        >
          Termine, die sich
          <span className="block italic" style={{ color: "#10736a" }}>
            online buchen lassen.
          </span>
        </p>
        <div
          className="mt-2.5 rounded-md p-2"
          style={{ background: "#ffffff", border: "1px solid #dde8e6" }}
        >
          <p className="text-[7px]" style={{ color: "#7d918f" }}>
            NÄCHSTE FREIE TERMINE
          </p>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {["08:20", "10:20", "15:40", "09:00", "11:00", "16:20"].map((slot, i) => (
              <span
                key={slot + i}
                className="rounded py-0.5 text-center text-[7px]"
                style={
                  i === 1
                    ? { background: "#dcedea", color: "#0a4f49", border: "1px solid #10736a" }
                    : { background: "#f5f8f8", color: "#4c6362", border: "1px solid #dde8e6" }
                }
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
        <span
          className="mt-2 inline-block rounded-full px-3 py-1 text-[8px] font-semibold"
          style={{ background: "#10736a", color: "#ffffff" }}
        >
          Termin bei Doctolib buchen
        </span>
      </div>
    </Chrome>
  );
}

export function HandwerkPreview() {
  return (
    <Chrome url="hartmann-haustechnik.de" bar="#29323b" dot="#5d6a76">
      <div className="h-full" style={{ background: "#12171c" }}>
        <div
          aria-hidden
          className="h-1"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #f4531f 0 5px, #12171c 5px 10px)",
          }}
        />
        <div className="px-4 py-3">
          <p className="text-[7px] tracking-[0.2em]" style={{ color: "#f4531f" }}>
            MEISTERBETRIEB SEIT 1998
          </p>
          <p
            className="mt-1.5 text-lg font-bold uppercase leading-[0.95] tracking-tight"
            style={{ color: "#ffffff" }}
          >
            Heizung kaputt?
            <span className="block" style={{ color: "#f4531f" }}>
              Wir sind unterwegs.
            </span>
          </p>
          <span
            className="mt-2.5 inline-block px-3 py-1 text-[8px] font-bold uppercase"
            style={{ background: "#f4531f", color: "#ffffff" }}
          >
            Kostenloses Angebot
          </span>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["70 %", "Förderung"],
              ["48 h", "zum Angebot"],
              ["24 h", "Notdienst"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-sm font-bold" style={{ color: "#f4531f" }}>
                  {value}
                </p>
                <p className="text-[7px]" style={{ color: "#5d6a76" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}
