import { notFound } from "next/navigation";
import Link from "next/link";
import { CHANNEL_META, LANE_META, RULE_META } from "@/lib/kadenz/schema";
import {
  auditForTenant,
  rulesForTenant,
  runsForTenant,
  tenantBySlug,
  tenants,
  topicsForTenant,
} from "@/lib/kadenz/fixtures";
import { PageHeader, StatusPill } from "@/components/kadenz/ui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Required by `output: 'export'` — every dynamic route must be enumerable at
// build time. Once fixtures become Supabase queries this reads from the DB.
export function generateStaticParams() {
  return tenants.map((t) => ({ slug: t.slug }));
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = tenantBySlug(slug);
  if (!tenant) notFound();

  const rules = rulesForTenant(tenant.id);
  const topics = topicsForTenant(tenant.id);
  const runs = runsForTenant(tenant.id);
  const audit = auditForTenant(tenant.id);

  return (
    <>
      <PageHeader eyebrow={tenant.status} title={tenant.name} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Rules — the learned brand brain. This is the sales screen. */}
          <section className="card p-6">
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-lg text-ivory">
                What Kadenz has learned
              </h2>
              <span className="eyebrow">{rules.length} rules</span>
            </div>
            <p className="mb-5 text-sm text-stone-dim">
              Every rule came from a rejection. Each one is injected at the
              pipeline stage that can act on it.
            </p>

            <ul className="space-y-3">
              {rules.map((rule) => (
                <li
                  key={rule.id}
                  className="rounded-lg border border-line-soft p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold-deep px-2.5 py-0.5 text-xs text-gold">
                      {RULE_META[rule.type].label}
                    </span>
                    <span className="eyebrow">
                      applied at {RULE_META[rule.type].stage}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-ivory">
                    {rule.content}
                  </p>
                  <p className="mt-2 text-xs text-stone-dim">
                    {rule.sourceRunId
                      ? `from ${rule.sourceRunId}`
                      : "set at onboarding"}{" "}
                    · {new Date(rule.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6">
            <h2 className="mb-4 font-display text-lg text-ivory">
              Recent runs
            </h2>
            <ul className="divide-y divide-line-soft">
              {runs.map((run) => (
                <li key={run.id} className="flex items-center gap-4 py-3">
                  <Link
                    href={`/kadenz/runs/${run.id}/`}
                    className="flex-1 truncate text-sm text-ivory hover:text-gold"
                  >
                    {run.slides[0]?.headline ?? run.id}
                  </Link>
                  <span className="hidden text-xs text-stone-dim sm:block">
                    {LANE_META[run.lane].label}
                  </span>
                  <StatusPill status={run.status} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card p-6">
            <h2 className="mb-4 font-display text-base text-ivory">
              Brand kit
            </h2>
            <div className="mb-4 flex gap-1.5">
              {Object.entries(tenant.brandKit.palette).map(([name, hex]) => (
                <span
                  key={name}
                  className="h-8 w-8 rounded-md border border-line"
                  style={{ background: hex }}
                  title={`${name}: ${hex}`}
                />
              ))}
            </div>
            <p className="eyebrow mb-2">Voice</p>
            <ul className="space-y-1 text-sm text-stone">
              {tenant.brandKit.voiceRules.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </section>

          <section className="card p-6">
            <h2 className="mb-4 font-display text-base text-ivory">Schedule</h2>
            <ul className="space-y-3 text-sm">
              {tenant.schedule.map((slot, i) => (
                <li key={i}>
                  <p className="text-ivory">{LANE_META[slot.lane].label}</p>
                  <p className="text-stone-dim">
                    {slot.time} {slot.timezone} ·{" "}
                    {slot.daysOfWeek.length
                      ? slot.daysOfWeek.map((d) => DAYS[d]).join(" ")
                      : "daily"}
                  </p>
                  <p className="text-stone-dim">
                    {slot.channels.map((c) => CHANNEL_META[c].label).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line-soft pt-4 text-xs text-stone-dim">
              Approval: {tenant.approvalMode.replace("_", " ")} ·{" "}
              {tenant.autoApproveAfterHours === null
                ? "never auto-approves"
                : `auto-approves after ${tenant.autoApproveAfterHours}h`}
            </p>
          </section>

          <section className="card p-6">
            <h2 className="mb-2 font-display text-base text-ivory">
              Topic bank
            </h2>
            <p className="text-sm text-stone-dim">
              {topics.filter((t) => t.status === "unused").length} unused ·{" "}
              {topics.length} total
            </p>
            {audit ? (
              // The audit detail screen is the next build step; no link yet
              // rather than a link into a 404.
              <p className="mt-3 text-sm text-stone">
                Derived from an audit of {audit.sources.length} competitors.
              </p>
            ) : null}
          </section>
        </aside>
      </div>
    </>
  );
}
