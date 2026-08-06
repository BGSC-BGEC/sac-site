// src/components/sections/FeaturedEvent.tsx
// #events — full-bleed 50/50 band. Date-first featured event with honest tense.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CalendarDays, Clock3, Radio, CircleCheck, MapPin, ArrowRight } from "lucide-react";
import { getFeaturedEvent, type EventStatus } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";
import { MediaFrame } from "@/components/primitives/MediaFrame";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

const EYEBROW: Record<EventStatus, string> = {
  upcoming: "NEXT UP",
  today: "HAPPENING TODAY",
  past: "LATEST RECAP",
};
const STATUS_TEXT: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  today: "Happening today",
  past: "Concluded",
};
const STATUS_ICON = { upcoming: Clock3, today: Radio, past: CircleCheck } as const;

const reveal = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: OUT_QUINT } },
};

function FeaturedEvent() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  const featured = getFeaturedEvent();

  if (!featured) {
    return (
      <section id="events" aria-labelledby="events-title"
        className="mesh-teal relative w-full border-y border-line bg-abyss py-(--space-section)">
        <div className="shell text-center">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">EVENTS</p>
          <h2 id="events-title" className="font-display text-display-m font-semibold text-cream">Nothing on the board yet.</h2>
          <p className="mt-4 text-lead text-fg-muted max-w-[48ch] mx-auto">
            The next fixture goes up here the moment it is scheduled.
          </p>
          <Link to="/events" className="mt-8 inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-body text-fg hover:border-line-volt hover:text-volt transition-colors">
            All events
          </Link>
        </div>
      </section>
    );
  }

  const { event, status } = featured;
  const StatusIcon = STATUS_ICON[status];
  const groupProps = reduce ? {} : { initial: "hidden" as const, whileInView: "in" as const, viewport: { once: true, margin: "-15% 0px" } as const };

  return (
    <section
      id="events"
      ref={ref}
      data-inview={inView}
      aria-labelledby="events-title"
      className="mesh-teal relative w-full border-y border-line bg-abyss py-(--space-section)"
      style={{ "--mesh-strength": 0.32 } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-0">
        {/* media — bleeds left */}
        <Link
          to={`/events/${event.slug}`}
          aria-hidden="true"
          tabIndex={-1}
          className="group relative block w-full overflow-hidden aspect-[3/2] md:aspect-[16/10] lg:w-[min(50vw,43rem)] lg:aspect-[4/5] lg:justify-self-start lg:rounded-r-(--radius-lg) bg-teal-900"
        >
          <MediaFrame
            src={event.coverImageUrl}
            alt={`${event.title}${event.venue ? ` at ${event.venue}` : ""}`}
            ratio="4/5"
            radius="none"
            width={880}
            priority={false}
            className="[filter:grayscale(1)_contrast(1.06)] transition-transform duration-(--dur-slow) ease-out-quint motion-safe:lg:group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-color opacity-[0.82] bg-teal-700" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_0%,color-mix(in_oklab,var(--color-void)_45%,transparent)_28%,transparent_58%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,var(--color-abyss)_0%,transparent_34%)]" />
        </Link>

        {/* copy */}
        <motion.div
          {...groupProps}
          variants={{ in: { transition: { staggerChildren: 0.09 } } }}
          className="px-4 md:px-(--gutter) lg:max-w-[34rem] lg:self-center lg:pl-[clamp(2rem,4.5vw,4.5rem)] lg:pr-(--gutter) lg:px-0"
        >
          <motion.div variants={reveal} className="mb-6 flex flex-wrap items-center gap-3">
            <span data-mode={status} className="status-dot" />
            <span className="text-eyebrow font-sans uppercase tracking-[0.2em] text-volt">{EYEBROW[status]}</span>
            <span className="rounded-full border border-line px-2.5 py-1 text-meta text-fg-faint sm:ml-auto">
              <span className="sr-only">Sample data: this event is placeholder content.</span>
              <span aria-hidden="true">Sample data</span>
            </span>
          </motion.div>

          <motion.h2
            variants={reveal}
            id="events-title"
            className="font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream"
          >
            {event.title}
          </motion.h2>

          <motion.dl variants={reveal} className="mt-10 border-b border-line">
            <div className="grid min-h-[3.25rem] grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 border-t border-line py-4 lg:grid-cols-[1.25rem_5.5rem_1fr]">
              <CalendarDays aria-hidden="true" className="size-4 text-volt" strokeWidth={1.5} />
              <dt className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint">Date</dt>
              <dd className="text-right text-body text-fg lg:text-left">
                <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
              </dd>
            </div>
            <div className="grid min-h-[3.25rem] grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 border-t border-line py-4 lg:grid-cols-[1.25rem_5.5rem_1fr]">
              <StatusIcon aria-hidden="true" className="size-4 text-volt" strokeWidth={1.5} />
              <dt className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint">Status</dt>
              <dd className="text-right text-body text-fg lg:text-left">
                <span className={status === "today" ? "text-live" : undefined}>{STATUS_TEXT[status]}</span>
              </dd>
            </div>
            {event.venue && (
              <div className="grid min-h-[3.25rem] grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 border-t border-line py-4 lg:grid-cols-[1.25rem_5.5rem_1fr]">
                <MapPin aria-hidden="true" className="size-4 text-volt" strokeWidth={1.5} />
                <dt className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint">Venue</dt>
                <dd className="text-right text-body text-fg lg:text-left">{event.venue}</dd>
              </div>
            )}
          </motion.dl>

          {event.description && (
            <motion.p variants={reveal} className="mt-8 max-w-[54ch] text-lead text-fg-muted">
              {event.description}
            </motion.p>
          )}

          <motion.div variants={reveal} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to={`/events/${event.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-(--radius-sm) bg-volt px-6 text-body font-medium text-ink transition-[transform,box-shadow] duration-(--dur-fast) ease-out-quint motion-safe:hover:-translate-y-(--lift) hover:shadow-glow active:bg-volt-600"
            >
              Event details
            </Link>
            <Link
              to="/events"
              className="group inline-flex h-12 items-center justify-center rounded-(--radius-sm) border border-line-strong px-5 text-body text-fg transition-colors duration-(--dur-fast) ease-out-quint hover:border-line-volt hover:bg-raised"
            >
              All events
              <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt transition-transform duration-(--dur-fast) ease-out-quint motion-safe:group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedEvent;
