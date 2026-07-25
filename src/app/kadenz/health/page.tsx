import Link from "next/link";
import { publishAttempts, runs, tenants } from "@/lib/kadenz/fixtures";
import { Empty, PageHeader, PublishPill } from "@/components/kadenz/ui";

export default function HealthPage() {
  const problems = runs.filter(
    (r) => r.status === "publish_failed" || r.status === "qa_failed",
  );
  const unverified = publishAttempts.filter(
    (a) => a.status === "accepted" || a.status === "failed",
  );
  const name = (id: string) => tenants.find((t) => t.id === id)?.name ?? id;

  return (
    <>
      <PageHeader eyebrow="Operations" title="Health" />

      <section className="mb-10">
        <h2 className="mb-3 font-display text-lg text-ivory">Stopped runs</h2>
        {problems.length === 0 ? (
          <Empty>Nothing stopped. Every run reached a human or went live.</Empty>
        ) : (
          <div className="space-y-3">
            {problems.map((run) => {
              const failed = run.qaChecks.filter((c) => !c.passed);
              return (
                <Link
                  key={run.id}
                  href={`/kadenz/runs/${run.id}/`}
                  className="card card-hover block p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-ivory">
                      {name(run.tenantId)} · {run.id}
                    </span>
                    <span className="font-mono text-xs text-rust">
                      {run.status}
                    </span>
                  </div>
                  {failed.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-stone">
                      {failed.map((c) => (
                        <li key={c.name}>
                          {c.name}
                          {c.detail ? ` — ${c.detail}` : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-1 font-display text-lg text-ivory">
          Publish verification
        </h2>
        <p className="mb-3 text-sm text-stone-dim">
          &ldquo;Accepted&rdquo; only means the provider took the request.
          Anything not <em>verified</em> was never confirmed live.
        </p>
        <div className="card divide-y divide-line-soft">
          {unverified.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 p-5"
            >
              <div className="min-w-0">
                <p className="text-ivory">
                  {a.runId} · {a.channel}
                </p>
                {a.error ? (
                  <p className="mt-1 text-sm text-stone">{a.error}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-stone-dim">
                  {a.provider}
                </span>
                <PublishPill status={a.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
