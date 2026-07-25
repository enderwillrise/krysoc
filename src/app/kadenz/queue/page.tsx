import Link from "next/link";
import { LANE_META } from "@/lib/kadenz/schema";
import { runs, tenants } from "@/lib/kadenz/fixtures";
import { PageHeader, StatusPill } from "@/components/kadenz/ui";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function QueuePage() {
  const sorted = [...runs].sort((a, b) =>
    b.scheduledFor.localeCompare(a.scheduledFor),
  );
  const name = (id: string) => tenants.find((t) => t.id === id)?.name ?? id;

  return (
    <>
      <PageHeader eyebrow="All brands" title="Queue" />

      <div className="card scroll-x">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              {["Scheduled", "Brand", "Lane", "Status", "Cost", ""].map((h) => (
                <th key={h} className="eyebrow px-5 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((run) => (
              <tr
                key={run.id}
                className="border-b border-line-soft last:border-0"
              >
                <td className="px-5 py-4 whitespace-nowrap text-stone">
                  {fmt(run.scheduledFor)}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-ivory">
                  {name(run.tenantId)}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-stone">
                  {LANE_META[run.lane].label}
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={run.status} />
                </td>
                <td className="px-5 py-4 whitespace-nowrap font-mono text-stone-dim">
                  {run.costCents !== null
                    ? `€${(run.costCents / 100).toFixed(2)}`
                    : "—"}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/kadenz/runs/${run.id}/`}
                    className="text-gold hover:text-gold-soft"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-stone-dim">
        Cost is per post, from the provider invoice — not an estimate.
      </p>
    </>
  );
}
