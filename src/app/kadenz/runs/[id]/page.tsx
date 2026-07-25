import { notFound } from "next/navigation";
import { attemptsForRun, runs, tenants } from "@/lib/kadenz/fixtures";
import { MockImage, PageHeader, PublishPill, StatusPill } from "@/components/kadenz/ui";

// Required by `output: 'export'` — see the note in brands/[slug]/page.tsx.
export function generateStaticParams() {
  return runs.map((r) => ({ id: r.id }));
}

export default async function RunPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const run = runs.find((r) => r.id === id);
  if (!run) notFound();

  const tenant = tenants.find((t) => t.id === run.tenantId);
  const attempts = attemptsForRun(run.id);

  return (
    <>
      <PageHeader
        eyebrow={`${tenant?.name} · ${run.id}`}
        title={run.slides[0]?.headline ?? "Run"}
        action={<StatusPill status={run.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="scroll-x">
            <div className="flex gap-3 pb-2">
              {run.slides.map((s) => (
                <div key={s.index} className="w-44 flex-none">
                  <MockImage src={s.imageUrl} label={s.headline} />
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <p className="eyebrow mb-3">Caption</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-ivory">
              {run.caption}
            </p>
          </section>

          {run.rejection ? (
            <section className="card border-rust-deep p-6">
              <p className="eyebrow mb-2">Changes requested</p>
              <p className="text-sm text-ivory">{run.rejection.note}</p>
              <p className="mt-2 text-xs text-stone-dim">
                Logged as a {run.rejection.type} rule.
              </p>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <section className="card p-6">
            <h2 className="mb-4 font-display text-base text-ivory">QA gate</h2>
            <ul className="space-y-2 text-sm">
              {run.qaChecks.map((c) => (
                <li key={c.name} className="flex items-start gap-2">
                  <span
                    className="dot mt-1.5"
                    style={{
                      background: c.passed
                        ? "var(--color-jade)"
                        : "var(--color-rust)",
                    }}
                    aria-hidden
                  />
                  <span className={c.passed ? "text-stone" : "text-ivory"}>
                    {c.name}
                    {c.detail ? (
                      <span className="text-stone-dim"> — {c.detail}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6">
            <h2 className="mb-4 font-display text-base text-ivory">
              Citations
            </h2>
            {run.citations.length === 0 ? (
              <p className="text-sm text-stone-dim">No factual claims.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {run.citations.map((c, i) => (
                  <li key={i}>
                    <p className="text-ivory">{c.claim}</p>
                    <p className="text-stone-dim">{c.sourceName}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="card p-6">
            <h2 className="mb-4 font-display text-base text-ivory">
              Publishing
            </h2>
            {attempts.length === 0 ? (
              <p className="text-sm text-stone-dim">Not attempted yet.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {attempts.map((a) => (
                  <li key={a.id}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-stone">{a.channel}</span>
                      <PublishPill status={a.status} />
                    </div>
                    {a.error ? (
                      <p className="mt-1 text-xs text-rust">{a.error}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}
