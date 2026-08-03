"use client";

import { useState } from "react";

/**
 * Heat-pump subsidy estimator for the SHK concept.
 *
 * This is the demo's "why would a customer stay on this page" moment: every
 * German homeowner replacing a heating system asks the same first question,
 * and no local Handwerker website answers it.
 *
 * The percentages follow the BEG structure (base + speed bonus + income bonus,
 * capped, against a capped eligible cost). They are ILLUSTRATIVE — funding
 * rules change and the on-page disclaimer says so. Before this ships for a real
 * client, re-verify every figure against the current BEG/BAFA/KfW guidance.
 */

const BASE = 30; // Grundförderung
const SPEED_BONUS = 20; // Klimageschwindigkeitsbonus — alte fossile Heizung
const INCOME_BONUS = 30; // Einkommensbonus
const CAP = 70; // Förderhöchstsatz
const ELIGIBLE_CAP = 30_000; // förderfähige Kosten, Einfamilienhaus

export function FoerderRechner() {
  const [cost, setCost] = useState(28_000);
  const [oldHeating, setOldHeating] = useState(true);
  const [lowIncome, setLowIncome] = useState(false);

  const rate = Math.min(
    CAP,
    BASE + (oldHeating ? SPEED_BONUS : 0) + (lowIncome ? INCOME_BONUS : 0)
  );
  const eligible = Math.min(cost, ELIGIBLE_CAP);
  const subsidy = Math.round((eligible * rate) / 100);
  const own = cost - subsidy;

  const fmt = new Intl.NumberFormat("de-DE");

  const parts = [
    { label: "Grundförderung", value: BASE, on: true },
    { label: "Klimageschwindigkeitsbonus", value: SPEED_BONUS, on: oldHeating },
    { label: "Einkommensbonus", value: INCOME_BONUS, on: lowIncome },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      {/* --- Inputs --- */}
      <div>
        <label className="block">
          <span className="font-hwk-display text-sm font-semibold uppercase tracking-wider text-hwk-grey">
            Investitionssumme
          </span>
          <span className="mt-1 block font-hwk-display text-4xl font-bold text-hwk-steel">
            {fmt.format(cost)} €
          </span>
        </label>
        <input
          type="range"
          min={12_000}
          max={45_000}
          step={500}
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="mt-4 w-full accent-hwk-signal"
          aria-label="Investitionssumme"
        />
        <p className="mt-2 font-hwk-body text-xs text-hwk-grey">
          Wärmepumpe inkl. Einbau, Hydraulik und Inbetriebnahme
        </p>

        <div className="mt-8 space-y-3">
          {[
            {
              on: oldHeating,
              set: setOldHeating,
              title: "Alte Gas- oder Ölheizung wird ersetzt",
              note: "Heizung älter als 20 Jahre",
            },
            {
              on: lowIncome,
              set: setLowIncome,
              title: "Haushaltseinkommen unter 40.000 €",
              note: "zu versteuerndes Jahreseinkommen",
            },
          ].map((opt) => (
            <button
              key={opt.title}
              type="button"
              onClick={() => opt.set(!opt.on)}
              aria-pressed={opt.on}
              className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                opt.on
                  ? "border-hwk-signal bg-hwk-signal/5"
                  : "border-hwk-line bg-hwk-white hover:border-hwk-grey"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                  opt.on
                    ? "border-hwk-signal bg-hwk-signal"
                    : "border-hwk-line bg-hwk-white"
                }`}
              >
                {opt.on ? (
                  <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                    <path
                      d="M2 6.5 4.8 9.2 10 3.4"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <span>
                <span className="block font-hwk-body text-sm font-semibold text-hwk-steel">
                  {opt.title}
                </span>
                <span className="block font-hwk-body text-xs text-hwk-grey">
                  {opt.note}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Result --- */}
      <div className="rounded-xl bg-hwk-steel p-7 text-hwk-white">
        <p className="font-hwk-display text-sm font-semibold uppercase tracking-wider text-hwk-signal">
          Ihre mögliche Förderung
        </p>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-hwk-display text-6xl font-bold leading-none text-hwk-white">
            {rate}
          </span>
          <span className="font-hwk-display text-2xl font-semibold text-hwk-signal">%</span>
          <span className="ml-auto text-right">
            <span className="block font-hwk-display text-3xl font-bold text-hwk-white">
              {fmt.format(subsidy)} €
            </span>
            <span className="font-hwk-body text-xs text-hwk-grey">Zuschuss</span>
          </span>
        </div>

        <div className="mt-6 space-y-2">
          {parts.map((part) => (
            <div key={part.label} className="flex items-center gap-3">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  part.on ? "bg-hwk-signal" : "bg-hwk-grey/40"
                }`}
              />
              <span
                className={`flex-1 font-hwk-body text-xs ${
                  part.on ? "text-hwk-white" : "text-hwk-grey line-through"
                }`}
              >
                {part.label}
              </span>
              <span
                className={`font-hwk-body text-xs font-semibold ${
                  part.on ? "text-hwk-signal" : "text-hwk-grey"
                }`}
              >
                +{part.value} %
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-white/15 pt-5">
          <div className="flex items-baseline justify-between">
            <span className="font-hwk-body text-sm text-hwk-grey">Ihr Eigenanteil</span>
            <span className="font-hwk-display text-2xl font-bold text-hwk-white">
              {fmt.format(own)} €
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-hwk-signal transition-[width] duration-500"
              style={{ width: `${Math.round((subsidy / cost) * 100)}%` }}
            />
          </div>
          {cost > ELIGIBLE_CAP ? (
            <p className="mt-3 font-hwk-body text-xs text-hwk-grey">
              Förderfähig sind maximal {fmt.format(ELIGIBLE_CAP)} € beim
              Einfamilienhaus — darüber hinausgehende Kosten tragen Sie selbst.
            </p>
          ) : null}
        </div>

        <p className="mt-6 font-hwk-body text-[11px] leading-relaxed text-hwk-grey">
          Unverbindliche Beispielrechnung nach der aktuellen Förderstruktur für
          Einfamilienhäuser. Förderfähigkeit, Sätze und Höchstgrenzen prüfen wir
          vor Antragstellung individuell — den Antrag stellen wir für Sie.
        </p>
      </div>
    </div>
  );
}
