// src/pages/AchievementsPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { filterAchievements, getAchievementFilters } from "@/lib/content";
import AchievementCard from "@/components/cards/AchievementCard";

function AchievementsPage() {
  useDocumentTitle("Achievements · SAC Goa", "National, state, inter-NIT and campus results won by BITS Goa students across football, swimming, basketball, badminton and fitness.");
  const [params, setParams] = useSearchParams();
  const level = params.get("level") ?? "All";
  const activity = params.get("activity") ?? "All";
  const year = params.get("year") ?? "All";

  const filters = getAchievementFilters();
  const list = filterAchievements({ level, activity, year });

  const setFilter = (key: string, val: string) => {
    const next = new URLSearchParams(params);
    if (val === "All") next.delete(key);
    else next.set(key, val);
    setParams(next);
  };

  const clearFilters = () => setParams(new URLSearchParams());

  return (
    <>
      <section
        className="mesh-teal relative isolate overflow-hidden bg-void
                   pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[var(--space-section)]"
        style={{ "--mesh-strength": 0.35 } as React.CSSProperties}
      >
        <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
              <li className="flex items-center gap-2"><Link to="/" className="hover:text-volt transition-colors">Home</Link><span aria-hidden="true" className="text-fg-faint">/</span></li>
              <li><span aria-current="page" className="text-fg">Achievements</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">RESULTS</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">What the campus brought back</h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Podium finishes by SAC students, from campus meets to national tournaments.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <div className="mb-8 space-y-4">
            {[
              { label: "Level", key: "level", options: ["All", ...filters.levels], value: level },
              { label: "Activity", key: "activity", options: ["All", ...filters.activities], value: activity },
              { label: "Year", key: "year", options: ["All", ...filters.years], value: year },
            ].map((f) => (
              <fieldset key={f.key}>
                <legend className="mb-2 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">{f.label}</legend>
                <div role="group" aria-label={`Filter by ${f.label.toLowerCase()}`} className="flex flex-wrap gap-2">
                  {f.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={f.value === opt}
                      onClick={() => setFilter(f.key, opt)}
                      className={`inline-flex h-10 items-center rounded-full border px-4 text-meta font-medium transition-colors duration-(--dur-fast) ease-out-quint ${
                        f.value === opt
                          ? "border-transparent bg-volt text-ink"
                          : "border-line bg-deep text-fg-muted hover:border-line-strong hover:bg-raised hover:text-fg"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <p className="mb-6 text-meta text-fg-faint">{list.length} of 5 results</p>

          {list.length > 0 ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((a) => (
                <li key={a.id}><AchievementCard achievement={a} /></li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-deep px-6 py-14 text-center">
              <p className="text-lead font-semibold text-fg">No results match those filters</p>
              <p className="mt-2 text-meta text-fg-muted max-w-[42ch] mx-auto">
                Try a wider level or year — there are five results in total.
              </p>
              <button type="button" onClick={clearFilters} className="mt-6 inline-flex h-11 items-center rounded-full bg-volt px-6 text-meta font-semibold text-ink">
                Clear filters
              </button>
            </div>
          )}

          {/* NextStep */}
          <div className="mt-16 border-t border-line pt-8">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
            <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">Where they train</h2>
            <ul className="space-y-3">
              <li><Link to="/activities" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">Activities<ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" /></Link></li>
              <li><Link to="/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">Events<ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" /></Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default AchievementsPage;
