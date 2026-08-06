// src/components/sections/ActivitiesRail.tsx
// #activities — asymmetric editorial spread: feature card + compact stack.
// Mobile: horizontal snap rail.
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  getActivities,
  getActivityCategories,
  getActivitiesByCategory,
  getCategoryCounts,
} from "@/lib/content";
import ActivityCard, { ACTIVITY_GRID } from "@/components/cards/ActivityCard";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

const CATS = ["All", ...getActivityCategories()] as const;
const COUNTS = getCategoryCounts();

function ActivitiesRail() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const railRef = useRef<HTMLUListElement>(null);

  const list = cat === "All" ? getActivities() : getActivitiesByCategory(cat);
  const feature = list[0];
  const rest = list.slice(1);
  // R23: below 3 results, every card is compact in a 2-col grid
  const sparse = list.length < 3;

  const { scrollXProgress } = useScroll({ container: railRef, axis: "x" });
  const x = useTransform(scrollXProgress, [0, 1], ["0%", `${Math.max(0, list.length - 1) * 100}%`]);

  const up = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DUR.fast } } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: OUT_QUINT } } };

  const groupProps = reduce
    ? {}
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.35 } };

  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className="relative scroll-mt-24 border-t border-line bg-deep py-(--space-section)"
    >
      <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
        {/* Header */}
        <motion.div {...groupProps} transition={{ staggerChildren: 0.06 }} className="mb-8 lg:mb-12">
          <motion.p variants={up} className="text-eyebrow font-medium uppercase tracking-[0.2em] text-volt mb-4">
            <span aria-hidden="true" className="mr-2">▸</span>EXPLORE
          </motion.p>
          <motion.h2
            variants={up}
            id="activities-title"
            className="font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream max-w-[16ch]"
          >
            Five places to show up.
          </motion.h2>
          <motion.p variants={up} className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Courts, a full-size ground, an Olympic-standard pool and a strength floor that opens at 5:00 AM. Filter by what you're here for.
          </motion.p>
        </motion.div>

        {/* Filter chips */}
        <div role="group" aria-label="Filter activities by category" className="mb-8 flex flex-wrap gap-2 md:gap-3 lg:mb-12">
          {CATS.map((c) => {
            const on = c === cat;
            const n = c === "All" ? getActivities().length : COUNTS[c] ?? 0;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c)}
                className={`relative inline-flex h-12 items-center rounded-full border px-5 text-meta font-medium transition-colors duration-(--dur-fast) ease-out-quint md:h-10 md:px-4 ${
                  on
                    ? "border-transparent bg-volt text-ink active:bg-volt-600"
                    : "border-line bg-abyss text-fg-muted hover:border-line-strong hover:bg-raised hover:text-cream"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="activity-chip"
                    aria-hidden="true"
                    className="absolute inset-0 -z-[1] rounded-full bg-volt"
                    transition={{ duration: DUR.std, ease: EASE.inOutQuart }}
                  />
                )}
                <span className="relative">{c}</span>
                <span aria-hidden="true" className={`relative ml-2 font-display tabular-nums ${on ? "text-ink/65" : "text-fg-faint"}`}>
                  {n}
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">Showing {list.length} activities</p>

        {/* Desktop grid — feature + compact stack (or 2-col sparse) */}
        {!sparse && (
          <motion.div
            {...groupProps}
            transition={{ staggerChildren: 0.09 }}
            className={`${ACTIVITY_GRID} hidden gap-y-[4vh] lg:grid`}
          >
            <motion.div variants={up} className="col-span-7">
              <ActivityCard activity={feature} variant="feature" priority />
            </motion.div>
            <div className="col-span-5 grid auto-rows-fr gap-4">
              {rest.map((a) => (
                <motion.div key={a.id} variants={up}>
                  <ActivityCard activity={a} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {sparse && (
          <motion.div
            {...groupProps}
            transition={{ staggerChildren: 0.09 }}
            className="hidden grid-cols-2 gap-6 lg:grid"
          >
            {list.map((a) => (
              <motion.div key={a.id} variants={up}>
                <ActivityCard activity={a} variant="compact" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile rail */}
        <ul ref={railRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-(--gutter) px-(--gutter) pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          {list.map((a) => (
            <li key={a.id} className="w-[82vw] shrink-0 snap-start">
              <ActivityCard activity={a} variant="compact" />
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-line lg:hidden">
          <motion.div style={{ x, width: `${100 / list.length}%` }} className="h-full rounded-full bg-volt" />
        </div>

        {/* All activities link */}
        <div className="mt-10 lg:col-start-10 lg:flex lg:justify-end">
          <Link
            to="/activities"
            className="group inline-flex h-11 items-center gap-3 rounded-full border border-line-strong px-6 text-meta text-fg transition-colors duration-(--dur-fast) ease-out-quint hover:border-line-volt hover:text-volt"
          >
            All activities
            <ArrowRight aria-hidden="true" className="size-4 text-volt transition-transform duration-(--dur-fast) ease-out-quint group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ActivitiesRail;
