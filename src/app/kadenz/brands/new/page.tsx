import { PageHeader } from "@/components/kadenz/ui";

/** Stub — the 4-step audit wizard lands next. */
export default function NewBrandPage() {
  const steps = [
    ["Brand", "Name, website, channels. Ingesting the site drafts the kit."],
    ["Competitors", "2–5 handles. Shows scope and cost before it runs."],
    ["Findings", "Formats, themes, hooks, antipatterns — each with evidence."],
    ["Spec", "Editable topic bank + exclusions, then 5 sample posts."],
  ];

  return (
    <>
      <PageHeader eyebrow="New brand" title="Audit" />
      <ol className="space-y-3">
        {steps.map(([title, blurb], i) => (
          <li key={title} className="card flex gap-4 p-5">
            <span className="font-display text-2xl text-gold-deep">{i + 1}</span>
            <div>
              <p className="font-display text-ivory">{title}</p>
              <p className="mt-1 text-sm text-stone">{blurb}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
