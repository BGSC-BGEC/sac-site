// src/pages/Stats/StatsPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { overviewCards, participationData, categoryData, topActivities } from "@/mock/mockStats";
import { getTrendSeries } from "@/lib/content";
import { formatGrowth } from "@/lib/format";
import ActivityBarChart from "@/components/charts/ActivityBarChart";
import ActivityTrendChart from "@/components/charts/ActivityTrendChart";
import ParticipationPieChart from "@/components/charts/ParticipationPieChart";

const DELTA_ICON = { up: "↑", down: "↓", flat: "→", none: null } as const;
const DELTA_COLOR = {
  up: "text-win",
  down: "text-fg-muted",
  flat: "text-fg-muted",
  none: "text-fg-muted",
} as const;

function StatsPage() {
  useDocumentTitle("Participation stats · SAC Goa", "Participation, session volume and monthly trend across SAC activities. Eleven months recorded, January to November.");
  const [sort, setSort] = useState<"most" | "alpha">("most");

  const sortedParticipation = sort === "most"
    ? [...participationData].sort((a, b) => b.participants - a.participants)
    : [...participationData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* PageIntro */}
      <section
        className="mesh-teal relative isolate overflow-hidden bg-void
                   pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[var(--space-section)]"
        style={{ "--mesh-strength": 0.35 } as React.CSSProperties}
      >
        <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
              <li className="flex items-center gap-2">
                <Link to="/" className="hover:text-volt transition-colors">Home</Link>
                <span aria-hidden="true" className="text-fg-faint">/</span>
              </li>
              <li><span aria-current="page" className="text-fg">Stats</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">PARTICIPATION</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            The numbers behind the noise
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Participation logged across SAC facilities: who turns up, how often, and where the hours land.
          </p>
          <p className="mt-6 text-meta text-fg-muted">Jan – Nov · 7 activities</p>
          <p className="mt-3 border-l-2 border-line-volt pl-3 text-meta text-cream-dim">
            Sample data for layout review. These figures are not live campus records.
          </p>
        </div>
      </section>

      {/* Stat cards */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {overviewCards.map((card) => {
              const g = formatGrowth(card.growth);
              const icon = DELTA_ICON[g.dir];
              return (
                <div key={card.id} className="border-l border-line pl-5 flex flex-col gap-1">
                  <p className="font-display text-display-m tabular-nums text-fg">{card.value}</p>
                  <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted">{card.title}</p>
                  {icon && (
                    <p className={`text-meta ${DELTA_COLOR[g.dir]}`}>
                      <span aria-hidden="true">{icon}</span> {g.label}
                      <span className="sr-only">{g.dir === "up" ? "up" : g.dir === "down" ? "down" : "no change"}</span>
                    </p>
                  )}
                  {!icon && (
                    <p className="text-meta text-fg-faint">{g.label}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Participation by activity */}
      <section className="bg-void section-y" aria-labelledby="participation-heading">
        <div className="shell">
          <div className="mb-6 flex items-center justify-between">
            <h2 id="participation-heading" className="font-display text-title font-semibold tracking-[-0.03em] text-fg">
              Participation by activity
            </h2>
            <div role="group" aria-label="Sort" className="flex gap-2">
              <button
                type="button"
                aria-pressed={sort === "most"}
                onClick={() => setSort("most")}
                className={`inline-flex h-10 items-center rounded-full px-4 text-meta transition-colors duration-(--dur-fast) ease-out-quint ${
                  sort === "most" ? "bg-volt text-ink" : "border border-line text-fg-muted hover:text-fg"
                }`}
              >
                Most first
              </button>
              <button
                type="button"
                aria-pressed={sort === "alpha"}
                onClick={() => setSort("alpha")}
                className={`inline-flex h-10 items-center rounded-full px-4 text-meta transition-colors duration-(--dur-fast) ease-out-quint ${
                  sort === "alpha" ? "bg-volt text-ink" : "border border-line text-fg-muted hover:text-fg"
                }`}
              >
                A–Z
              </button>
            </div>
          </div>
          <ActivityBarChart key={sort} />
          <details className="mt-6 border-t border-line pt-6">
            <summary className="min-h-12 cursor-pointer py-3 text-meta text-fg-muted hover:text-fg transition-colors">
              ▾ Read as a table
            </summary>
            <table className="mt-4 w-full text-meta">
              <caption className="pb-4 text-left text-fg-muted">Participation by activity, 2026</caption>
              <thead>
                <tr>
                  <th scope="col" className="pb-3 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Activity</th>
                  <th scope="col" className="pb-3 text-right text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Participants</th>
                </tr>
              </thead>
              <tbody>
                {sortedParticipation.map((d) => (
                  <tr key={d.name} className="border-b border-line">
                    <td className="py-2.5 text-fg-muted">{d.name}</td>
                    <td className="py-2.5 text-right font-display tabular-nums text-fg">{d.participants.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      </section>

      {/* Programme share + Monthly trend */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Pie */}
            <div>
              <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-1">Programme share</h2>
              <p className="text-meta text-fg-muted mb-6">Share of logged participation by programme type.</p>
              <ParticipationPieChart />
              <ul className="mt-4 space-y-1 text-meta text-fg-muted">
                {categoryData.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span aria-hidden="true" className="inline-block size-2 rounded-full" style={{ backgroundColor: [chart_series(2), chart_series(1), "var(--color-teal-700)"][i] }} />
                    {c.name}: {c.value}%
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-meta text-fg-faint">Recreation covers activities not yet individually listed. Programme type, not an activity category.</p>
              <details className="mt-4 border-t border-line pt-4">
                <summary className="min-h-12 cursor-pointer py-3 text-meta text-fg-muted hover:text-fg transition-colors">▾ Read as a table</summary>
                <table className="mt-4 w-full text-meta">
                  <caption className="pb-4 text-left text-fg-muted">Programme share</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="pb-3 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Programme</th>
                      <th scope="col" className="pb-3 text-right text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((c) => (
                      <tr key={c.name} className="border-b border-line">
                        <td className="py-2.5 text-fg-muted">{c.name}</td>
                        <td className="py-2.5 text-right font-display tabular-nums text-fg">{c.value}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </div>

            {/* Trend */}
            <div>
              <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-1">Monthly trend</h2>
              <p className="text-meta text-fg-muted mb-6">January to November. December is not in the dataset.</p>
              <ActivityTrendChart />
              <details className="mt-4 border-t border-line pt-4">
                <summary className="min-h-12 cursor-pointer py-3 text-meta text-fg-muted hover:text-fg transition-colors">▾ Read as a table</summary>
                <table className="mt-4 w-full text-meta">
                  <caption className="pb-4 text-left text-fg-muted">Monthly participation, January to November</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="pb-3 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Month</th>
                      <th scope="col" className="pb-3 text-right text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TrendRows />
                  </tbody>
                </table>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Top activities table */}
      <section className="bg-void section-y">
        <div className="shell">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg">Top activities</h2>
            <Link to="/activities" className="inline-flex h-11 items-center rounded-full border border-line-strong px-6 text-meta text-fg hover:border-line-volt hover:text-volt transition-colors">
              All activities
              <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt" />
            </Link>
          </div>
          <table className="w-full text-meta">
            <caption className="sr-only">Top activities by participation</caption>
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="pb-3 text-left text-eyebrow uppercase tracking-[0.2em] text-fg-muted">#</th>
                <th scope="col" className="pb-3 text-left text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Activity</th>
                <th scope="col" className="pb-3 text-right text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Participants</th>
              </tr>
            </thead>
            <tbody>
              {topActivities.map((a, i) => (
                <tr key={a.activity} className="border-b border-line">
                  <td className="py-3 font-display tabular-nums text-fg-faint">{i + 1}</td>
                  <td className="py-3 text-fg">{a.activity}</td>
                  <td className="py-3 text-right font-display tabular-nums text-fg">{a.participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function chart_series(i: number): string {
  return ["var(--color-volt)", "var(--color-teal-500)", "var(--color-teal-300)"][i];
}

function TrendRows() {
  const trend = getTrendSeries();
  return (
    <>
      {trend.map((d) => (
        <tr key={d.month} className="border-b border-line">
          <td className="py-2.5 text-fg-muted">{d.month}</td>
          <td className="py-2.5 text-right font-display tabular-nums text-fg">
            {d.value == null ? <span className="text-fg-faint">Not recorded</span> : d.value.toLocaleString("en-IN")}
          </td>
        </tr>
      ))}
    </>
  );
}

export default StatsPage;
