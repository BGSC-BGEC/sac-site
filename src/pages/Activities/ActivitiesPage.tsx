// src/pages/Activities/ActivitiesPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  getActivities,
  getActivityCategories,
  getActivitiesByCategory,
  getCategoryCounts,
} from "@/lib/content";
import ActivityCard from "@/components/cards/ActivityCard";
import { ArrowRight } from "lucide-react";

const CATS = ["All", ...getActivityCategories()] as const;
const COUNTS = getCategoryCounts();

function ActivitiesPage() {
  useDocumentTitle("Activities · SAC Goa", "Basketball, football, badminton, swimming and the gym — timings, facilities and photos for all five SAC activities.");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = cat === "All" ? getActivities() : getActivitiesByCategory(cat);

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
              <li><span aria-current="page" className="text-fg">Activities</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">FACILITIES</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            Where the campus trains
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Courts, a full-size ground, an Olympic pool, and the gym. Pick a discipline, check the hours, turn up.
          </p>
          <p className="mt-6 text-meta text-fg-muted">
            {getActivities().length} facilities · {getActivityCategories().length} categories
          </p>
          <p className="mt-3 border-l-2 border-line-volt pl-3 text-meta text-cream-dim">
            Hours shown are the Monday schedule — other days are not in the current data set.
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <div role="group" aria-label="Filter activities by category" className="mb-8 flex flex-wrap gap-2 md:gap-3">
            {CATS.map((c) => {
              const on = c === cat;
              const n = c === "All" ? getActivities().length : COUNTS[c] ?? 0;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c)}
                  className={`inline-flex h-12 items-center rounded-full border px-5 text-meta font-medium transition-colors duration-(--dur-fast) ease-out-quint md:h-10 md:px-4 ${
                    on
                      ? "border-transparent bg-volt text-ink"
                      : "border-line bg-deep text-fg-muted hover:border-line-strong hover:bg-raised hover:text-fg"
                  }`}
                >
                  {c}
                  <span aria-hidden="true" className={`ml-2 font-display tabular-nums ${on ? "text-ink/65" : "text-fg-faint"}`}>{n}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="sr-only">Showing {list.length} activities</p>
          <p className="mb-6 text-meta text-fg-faint">{list.length} of {getActivities().length} results</p>

          {list.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((a) => (
                <li key={a.id}><ActivityCard activity={a} variant="compact" /></li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-abyss px-6 py-14 text-center">
              <p className="text-lead font-semibold text-fg">Nothing under that category</p>
              <p className="mt-2 text-meta text-fg-muted max-w-[42ch] mx-auto">
                The SAC runs Sports and Fitness activities only. Clear the filter to see all five.
              </p>
              <button
                type="button"
                onClick={() => setCat("All")}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-volt px-6 text-meta font-semibold text-ink"
              >
                Show all activities
              </button>
            </div>
          )}

          <div className="mt-16 border-t border-line pt-8">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
            <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">
              See it in use
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to="/gallery" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                  Galleries
                  <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link to="/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                  Events
                  <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default ActivitiesPage;
