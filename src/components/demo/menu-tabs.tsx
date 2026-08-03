"use client";

import { useState } from "react";

interface Dish {
  name: string;
  note: string;
  price: string;
  tags?: ("v" | "vg" | "neu")[];
}

const MENU: { id: string; label: string; dishes: Dish[] }[] = [
  {
    id: "antipasti",
    label: "Antipasti",
    dishes: [
      { name: "Vitello Tonnato", note: "Kalbsrücken, Thunfischcreme, Kapern", price: "13,50" },
      { name: "Burrata Pugliese", note: "Ofentomaten, Basilikum, Olivenöl", price: "12,00", tags: ["v"] },
      { name: "Carpaccio di Manzo", note: "Rind, Rucola, Parmesan, Zitrone", price: "14,50" },
      { name: "Verdure alla Griglia", note: "Gegrilltes Gemüse, Salsa verde", price: "10,50", tags: ["vg"] },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    dishes: [
      { name: "Tagliatelle al Ragù", note: "Geschmortes Rind, 4 Stunden", price: "17,50" },
      { name: "Cacio e Pepe", note: "Pecorino Romano, schwarzer Pfeffer", price: "15,00", tags: ["v"] },
      { name: "Ravioli di Salvia", note: "Ricotta, Salbeibutter, Haus-Spezialität", price: "18,00", tags: ["v", "neu"] },
      { name: "Linguine alle Vongole", note: "Venusmuscheln, Weißwein, Petersilie", price: "21,00" },
    ],
  },
  {
    id: "secondi",
    label: "Secondi",
    dishes: [
      { name: "Saltimbocca alla Romana", note: "Kalb, Salbei, Rohschinken, Kartoffelpüree", price: "26,50" },
      { name: "Branzino al Forno", note: "Ganzer Wolfsbarsch, Zitrone, Rosmarin", price: "28,00" },
      { name: "Melanzane alla Parmigiana", note: "Aubergine, Tomate, Büffelmozzarella", price: "19,50", tags: ["v"] },
    ],
  },
  {
    id: "dolci",
    label: "Dolci",
    dishes: [
      { name: "Tiramisù della Casa", note: "Nach dem Rezept von Nonna Rita", price: "8,50", tags: ["v"] },
      { name: "Panna Cotta", note: "Waldbeeren, Tonkabohne", price: "7,50", tags: ["v"] },
      { name: "Affogato al Caffè", note: "Vanilleeis, Espresso, Amaretto", price: "7,00", tags: ["v"] },
    ],
  },
];

const TAG_LABEL: Record<string, string> = {
  v: "vegetarisch",
  vg: "vegan",
  neu: "neu",
};

export function MenuTabs() {
  const [active, setActive] = useState(MENU[0]!.id);
  const current = MENU.find((c) => c.id === active) ?? MENU[0]!;

  return (
    <div>
      <div role="tablist" aria-label="Speisekarte" className="flex flex-wrap gap-2">
        {MENU.map((cat) => {
          const selected = cat.id === active;
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(cat.id)}
              className={`rounded-full border px-5 py-2 font-rst-body text-sm tracking-wide transition-colors ${
                selected
                  ? "border-rst-amber bg-rst-amber text-rst-ink"
                  : "border-rst-line text-rst-sand hover:border-rst-amber hover:text-rst-cream"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 space-y-7">
        {current.dishes.map((dish) => (
          <li key={dish.name} className="group">
            <div className="flex items-baseline gap-3">
              <h3 className="font-rst-display text-xl text-rst-cream">{dish.name}</h3>
              {dish.tags?.map((tag) => (
                <span
                  key={tag}
                  title={TAG_LABEL[tag]}
                  className={`rounded-full px-2 py-0.5 font-rst-body text-[10px] uppercase tracking-widest ${
                    tag === "neu"
                      ? "bg-rst-wine/70 text-rst-cream"
                      : "border border-rst-olive/60 text-rst-olive"
                  }`}
                >
                  {tag === "neu" ? "neu" : tag}
                </span>
              ))}
              <span
                aria-hidden
                className="mx-1 hidden h-px flex-1 self-end bg-rst-line sm:block"
              />
              <span className="ml-auto shrink-0 font-rst-display text-lg text-rst-amber sm:ml-0">
                {dish.price}
              </span>
            </div>
            <p className="mt-1 max-w-xl font-rst-body text-sm leading-relaxed text-rst-sand">
              {dish.note}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-rst-body text-xs leading-relaxed text-rst-sand/70">
        Alle Preise in Euro inkl. MwSt. Allergene und Zusatzstoffe weisen wir
        Ihnen auf Nachfrage gerne aus.
      </p>
    </div>
  );
}
