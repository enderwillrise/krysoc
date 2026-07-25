import Link from "next/link";
import { CHANNEL_META, LANE_META } from "@/lib/kadenz/schema";
import { runsForTenant, tenants } from "@/lib/kadenz/fixtures";
import { Button, PageHeader, StatusPill } from "@/components/kadenz/ui";

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Krysoc"
        title="Brands"
        action={<Button href="/kadenz/brands/new/">Run an audit</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {tenants.map((tenant) => {
          const tenantRuns = runsForTenant(tenant.id);
          const pending = tenantRuns.filter(
            (r) => r.status === "awaiting_approval",
          );
          const failing = tenantRuns.filter(
            (r) => r.status === "publish_failed" || r.status === "qa_failed",
          );
          // Most recent by slot — "what's happening now", not the oldest
          // unresolved run.
          const latest = [...tenantRuns].sort((a, b) =>
            b.scheduledFor.localeCompare(a.scheduledFor),
          )[0];

          return (
            <Link
              key={tenant.id}
              href={`/kadenz/brands/${tenant.slug}/`}
              className="card card-hover block p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ivory">
                    {tenant.name}
                  </h2>
                  <p className="mt-1 text-sm text-stone-dim">
                    {tenant.websiteUrl?.replace("https://", "")}
                  </p>
                </div>
                <span
                  className="rounded-full border border-line px-2.5 py-1 text-xs text-stone"
                  style={
                    tenant.status === "onboarding"
                      ? { borderColor: "var(--color-gold-deep)", color: "var(--color-gold)" }
                      : undefined
                  }
                >
                  {tenant.status}
                </span>
              </div>

              {/* Brand palette — the fastest visual check that a tenant is
                  actually skinned and not inheriting another brand's kit. */}
              <div className="mb-4 flex gap-1.5">
                {Object.entries(tenant.brandKit.palette).map(([name, hex]) => (
                  <span
                    key={name}
                    className="h-6 w-6 rounded-md border border-line"
                    style={{ background: hex }}
                    title={`${name}: ${hex}`}
                  />
                ))}
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-stone-dim">Lanes</dt>
                  <dd className="text-right text-stone">
                    {tenant.schedule
                      .map((s) => LANE_META[s.lane].label)
                      .join(", ") || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-stone-dim">Channels</dt>
                  <dd className="text-right text-stone">
                    {[
                      ...new Set(tenant.schedule.flatMap((s) => s.channels)),
                    ]
                      .map((c) => CHANNEL_META[c].label)
                      .join(", ") || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-stone-dim">Latest</dt>
                  <dd className="text-right">
                    {latest ? <StatusPill status={latest.status} /> : "—"}
                  </dd>
                </div>
              </dl>

              {(pending.length > 0 || failing.length > 0) && (
                <div className="mt-4 flex gap-2 border-t border-line-soft pt-4 text-xs">
                  {pending.length > 0 && (
                    <span className="rounded-full bg-gold px-2.5 py-1 font-medium text-obsidian">
                      {pending.length} awaiting approval
                    </span>
                  )}
                  {failing.length > 0 && (
                    <span className="rounded-full bg-rust px-2.5 py-1 font-medium text-obsidian">
                      {failing.length} failing
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
