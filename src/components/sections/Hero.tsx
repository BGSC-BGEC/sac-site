// src/components/sections/Hero.tsx
// The site's only --text-display-xl. Graphic-led: zero photography.
// Two CTAs, one live-context card.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";
import { getUpcomingEvents, getSiteCounts } from "@/lib/content";
import { formatDate, localISODate } from "@/lib/format";
import type { Event } from "@/types/event.types";

const H1_LINES = ["Every court,", "every lane,"] as const;
const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const next = getUpcomingEvents(1)[0];
  const { activities, categories } = getSiteCounts();
  const todayISO = localISODate(new Date());
  const isToday = next?.startDate === todayISO;
  const status = !next ? "Season break" : isToday ? "Happening today" : "Next up";

  const line = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DUR.fast } } }
    : { hidden: { y: "110%" }, show: { y: 0, transition: { duration: DUR.hero, ease: OUT_QUINT } } };
  const up = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DUR.fast } } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: OUT_QUINT } } };
  const card = reduce
    ? up
    : {
        hidden: { opacity: 0, y: REVEAL_Y, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: DUR.slow, ease: OUT_QUINT, delay: DUR.fast } },
      };

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      data-inview={inView}
      style={{ "--mesh-strength": 0.85 } as React.CSSProperties}
      className="mesh-volt relative isolate overflow-hidden min-h-[100svh]
                 pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[clamp(5.5rem,10vh,7rem)]"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: DUR.fast / 2 }}
        className="relative z-10 mx-auto grid w-full max-w-[var(--container)] grid-cols-1
                   items-end gap-x-6 gap-y-12 px-[var(--gutter)] md:grid-cols-8 lg:grid-cols-12"
      >
        <div className="md:col-span-8 lg:col-span-7 lg:self-end">
          {/* eyebrow */}
          <div className="flex items-center">
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: DUR.std, ease: OUT_QUINT } } }}
              className="mr-3 h-[2px] w-6 origin-left rounded-xs bg-volt"
            />
            <motion.span variants={up} className="text-eyebrow uppercase tracking-[0.2em] text-volt">
              BITS Pilani Goa <span className="mx-1 text-line-volt">·</span> Student Activity Centre
            </motion.span>
          </div>

          {/* H1 — 3 lines, per-line mask, final word volt */}
          <h1
            id="hero-title"
            aria-label="Every court, every lane, in motion."
            className="mt-8 font-display text-display-xl font-semibold leading-[0.92]
                       tracking-[-0.03em] text-cream"
          >
            {H1_LINES.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span variants={line} className="block">{l}</motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={line} className="block">
                in <span className="text-volt">motion.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={up} className="mt-6 max-w-[46ch] text-lead text-fg-muted">
            Basketball, football, swimming, badminton and a gym that opens at five.
            Five facilities, one campus, hours you can plan a week around.
          </motion.p>

          {/* EXACTLY TWO actions */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: DUR.fast / 3 } } }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"
          >
            <motion.a
              variants={up}
              href="#activities"
              className="inline-flex h-14 items-center justify-center rounded-full bg-volt px-8 py-4
                         text-body font-semibold tracking-[-0.01em] text-ink
                         transition-[transform,box-shadow,background-color]
                         duration-(--dur-fast) ease-out-quint
                         motion-safe:hover:-translate-y-(--lift) hover:shadow-glow
                         active:bg-volt-600 sm:h-auto"
            >
              Explore activities
            </motion.a>
            <motion.a
              variants={up}
              href="#events"
              className="group relative inline-flex h-14 items-center justify-center rounded-full
                         border border-line-strong px-2 py-4 text-body text-cream
                         sm:h-auto sm:border-0"
            >
              What's on this season
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-2 right-2 h-px origin-left
                           scale-x-0 bg-volt transition-transform duration-(--dur-fast)
                           ease-out-quint group-hover:scale-x-100
                           group-focus-visible:scale-x-100
                           motion-reduce:scale-x-100 motion-reduce:opacity-0
                           motion-reduce:group-hover:opacity-100"
              />
            </motion.a>
          </motion.div>
        </div>

        {/* live-context card — cols 9-12, bottom-aligned */}
        <motion.div
          variants={card}
          className="md:col-span-5 lg:col-start-9 lg:col-span-4 lg:max-w-[24rem] lg:self-end"
        >
          <CardShell event={next}>
            <div className="flex items-center">
              {next && (
                <span
                  aria-hidden="true"
                  data-pulse={isToday}
                  className="hero-loop mr-2 h-1.5 w-1.5 rounded-full bg-live"
                />
              )}
              <span className="text-eyebrow uppercase tracking-[0.2em] text-volt">{status}</span>
              <span className="ml-auto rounded-full border border-line px-2 py-0.5
                               text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
                Mock data
              </span>
            </div>

            {next ? (
              <>
                <p className="mt-6 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
                  {next.title}
                </p>
                <p className="mt-3 text-meta tabular-nums text-fg-muted">{formatDate(next.startDate)}</p>
                {next.venue && (
                  <p className="mt-1 flex items-center text-meta text-fg-muted">
                    {next.venue}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 text-volt transition-transform duration-(--dur-fast)
                                 ease-out-quint group-hover:translate-x-0.5
                                 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="mt-6 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
                  Nothing on the calendar
                </p>
                <p className="mt-3 text-meta text-fg-muted">Facility hours run as usual.</p>
              </>
            )}

            <div className="mt-6 border-t border-line pt-4 text-meta text-fg-muted">
              <span className="font-display tabular-nums text-volt">{activities}</span> activities
              {" · "}
              <span className="font-display tabular-nums text-volt">{categories}</span> categories
            </div>
          </CardShell>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: cueOpacity }}
        className="hero-cue hero-loop absolute bottom-5 left-1/2 h-12 w-px -translate-x-1/2
                   bg-line-volt sm:bottom-6 sm:left-[var(--gutter)] sm:translate-x-0"
      />
    </section>
  );
}

function CardShell({ event, children }: { event?: Event; children: React.ReactNode }) {
  const cls =
    "group block rounded-xl border border-line bg-deep/60 p-6 shadow-lift backdrop-blur-xl " +
    "transition-colors duration-(--dur-fast) ease-out-quint";
  return event ? (
    <Link
      to={`/events/${event.slug}`}
      aria-label={`${event.title}, ${formatDate(event.startDate)}${event.venue ? `, ${event.venue}` : ""}`}
      className={`${cls} hover:bg-raised`}
    >
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export default Hero;
