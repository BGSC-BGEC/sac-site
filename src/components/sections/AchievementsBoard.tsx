// src/components/sections/AchievementsBoard.tsx
// #wins — three named results as a flat editorial list.
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { getRecentAchievements, getAchievementCount } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

const LEVEL_CHIP: Record<string, string> = {
  National: "bg-volt text-ink border-transparent font-semibold",
  State: "text-volt border-line-volt font-medium",
  "Inter-NIT": "text-cream-dim border-line-strong font-medium",
  Campus: "text-fg-muted border-line font-medium",
};
const CHIP_FALLBACK = LEVEL_CHIP.Campus;

const ROW =
  "group relative isolate overflow-hidden -mx-5 px-5 py-6 border-t border-line transition-colors duration-(--dur-fast) ease-out-quint hover:border-line-strong hover:bg-raised/40 focus-within:bg-raised/40 grid grid-cols-[1fr_auto] gap-x-4 lg:grid-cols-[5.5rem_1fr_auto] lg:gap-x-8 lg:items-start";
const BAR =
  "pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-volt -translate-x-full transition-transform duration-(--dur-std) ease-out-quint group-hover:translate-x-0 group-focus-within:translate-x-0 motion-reduce:translate-x-0 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-(--dur-fast) motion-reduce:group-hover:opacity-100";

function AchievementsBoard() {
  const reduce = useReducedMotion();
  const items = getRecentAchievements(3);
  if (items.length === 0) return null;
  const remaining = getAchievementCount() - items.length;

  const rows = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
  const row = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: OUT_QUINT } } };
  const groupProps = reduce ? {} : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } as const };

  return (
    <section id="wins" aria-labelledby="wins-title" className="scroll-mt-24 bg-deep py-(--space-section)">
      <div className="mx-auto w-full max-w-(--container) px-(--gutter)">
        <motion.div {...groupProps} transition={{ staggerChildren: 0.06 }} className="mb-10 grid gap-6 md:mb-14 lg:mb-20 lg:grid-cols-12">
          <motion.div variants={row} className="lg:col-span-7">
            <p className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-volt">
              <span aria-hidden="true" className="mr-2">▸</span>RESULTS
            </p>
            <h2 id="wins-title" className="max-w-[14ch] font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-fg">
              Names on the board.
            </h2>
          </motion.div>
          <motion.p variants={row} className="max-w-[38ch] text-lead text-fg-muted lg:col-start-9 lg:col-span-4 lg:self-end lg:pb-2">
            Five results across four levels. The three most recent are here.
          </motion.p>
        </motion.div>

        <motion.ol variants={rows} {...groupProps} className="list-none">
          {items.map((a) => (
            <motion.li key={a.id} variants={row} className={ROW}>
              <span aria-hidden="true" className={BAR} />
              <span className="font-display text-title font-semibold tabular-nums tracking-[-0.03em] text-volt lg:pt-0.5">
                {a.achievedAt.slice(0, 4)}
              </span>
              <div className="order-3 col-span-2 lg:order-none lg:col-span-1">
                <h3 className="font-display text-title font-semibold leading-[1.1] tracking-[-0.03em] text-fg">
                  {a.studentName}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-body text-fg-muted">{a.title}</p>
                <p className="mt-3 text-meta text-fg-muted">
                  {a.activityName}
                  <span aria-hidden="true" className="mx-2 text-fg-faint">·</span>
                  <time dateTime={a.achievedAt}>{formatDate(a.achievedAt)}</time>
                </p>
              </div>
              <span className={`h-fit whitespace-nowrap rounded-full border px-3.5 py-1.5 text-eyebrow uppercase tracking-[0.2em] ${LEVEL_CHIP[a.level] ?? CHIP_FALLBACK}`}>
                <span className="sr-only">Level: </span>{a.level}
              </span>
            </motion.li>
          ))}

          <motion.li variants={row} className={`${ROW} border-b`}>
            <span aria-hidden="true" className={BAR} />
            {remaining > 0 && (
              <span className="font-display text-title tabular-nums text-fg-faint">+{remaining}</span>
            )}
            <Link
              to="/achievements"
              className="order-3 col-span-2 flex min-h-12 items-center justify-between gap-4 text-title font-display font-semibold tracking-[-0.03em] text-fg transition-colors duration-(--dur-fast) ease-out-quint hover:text-volt lg:order-none lg:col-span-2 lg:contents"
            >
              <span>All achievements{remaining > 0 && <span className="sr-only">, {remaining} more</span>}</span>
              <span aria-hidden="true" className="pr-1 text-volt transition-transform duration-(--dur-fast) ease-out-quint group-hover:translate-x-(--lift) motion-reduce:group-hover:translate-x-0">→</span>
            </Link>
          </motion.li>
        </motion.ol>
      </div>
    </section>
  );
}

export default AchievementsBoard;
