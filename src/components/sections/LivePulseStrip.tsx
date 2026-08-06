// src/components/sections/LivePulseStrip.tsx
// 72px band of current facts. CSS marquee, paused offscreen + on hover/focus.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE } from "@/lib/motion";
import { getUpcomingEvents, getOpenActivitiesNow, getStatSummary } from "@/lib/content";
import { formatDate, localISODate } from "@/lib/format";

type Chip = { lead?: string; volt?: string; tail?: string; live?: boolean };

const { cards: overviewCards, topActivities } = getStatSummary();

function buildChips(now: Date): Chip[] {
  const open = getOpenActivitiesNow(now).length;
  const next = getUpcomingEvents(1)[0];
  const isToday = next?.startDate === localISODate(now);
  const top = topActivities[0];

  const event: Chip = !next
    ? { lead: "Season wrap — nothing on the calendar" }
    : isToday
      ? { volt: "Live today", tail: ` — ${next.title}`, live: true }
      : { lead: `Next up — ${next.title}, `, volt: formatDate(next.startDate) };

  return [
    event,
    open === 0
      ? { lead: "Everything closed right now" }
      : { volt: String(open), tail: ` activit${open === 1 ? "y" : "ies"} open right now` },
    { lead: `${top.activity} leads — `, volt: String(top.participants), tail: " participants" },
    { volt: overviewCards[0].value, tail: " active students" },
  ];
}

function PulseRow({
  chips,
  dotClass,
  hidden,
  rowRef,
}: {
  chips: Chip[];
  dotClass: string;
  hidden?: boolean;
  rowRef?: React.Ref<HTMLUListElement>;
}) {
  return (
    <ul
      ref={rowRef}
      className="pulse-row flex w-max items-center"
      aria-hidden={hidden || undefined}
      inert={hidden ? true : undefined}
    >
      {chips.map((c, i) => (
        <li key={i} className="flex items-center whitespace-nowrap font-sans text-meta text-fg-muted transition-colors duration-(--dur-fast) ease-out-quint group-hover:text-fg">
          {c.live && <span aria-hidden="true" className={`pulse-dot relative mr-2 size-1.5 shrink-0 rounded-full ${dotClass}`} />}
          {c.lead && <span>{c.lead}</span>}
          {c.volt && <span className="font-display tabular-nums text-volt">{c.volt}</span>}
          {c.tail && <span>{c.tail}</span>}
          <span aria-hidden="true" className="mx-4 text-volt sm:mx-5 lg:mx-6" data-sep>·</span>
        </li>
      ))}
    </ul>
  );
}

function LivePulseStrip() {
  const reduced = useReducedMotion();
  const stripRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const strip = stripRef.current;
    if (!row || !strip) return;
    const measure = () => {
      const w = Math.round(row.getBoundingClientRect().width);
      if (!w) return;
      strip.style.setProperty("--row-w", String(w));
      setCopies(Math.max(2, Math.ceil((window.innerWidth * 2) / w)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const io = new IntersectionObserver(([e]) =>
      strip.setAttribute("data-inview", String(e.isIntersecting)),
    );
    io.observe(strip);
    return () => io.disconnect();
  }, []);

  const chips = buildChips(now);
  const open = getOpenActivitiesNow(now).length;
  const dotClass = open === 0 ? "bg-fg-faint" : "bg-volt";

  return (
    <motion.section
      ref={stripRef as React.RefObject<HTMLElement>}
      aria-label="Live campus pulse"
      id="pulse"
      data-inview="true"
      data-paused={paused}
      initial={reduced ? false : { opacity: 0, y: "var(--reveal-y)" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.std, ease: EASE.outQuint }}
      className="pulse-strip relative flex h-[64px] items-center overflow-hidden border-y border-line bg-abyss px-[var(--gutter)] sm:h-[68px] md:h-[72px]"
    >
      <div className="pulse-viewport min-w-0 flex-1">
        <div className="pulse-track flex w-max items-center">
          <PulseRow chips={chips} dotClass={dotClass} rowRef={rowRef} />
          {Array.from({ length: copies - 1 }).map((_, i) => (
            <PulseRow key={i} chips={chips} dotClass={dotClass} hidden />
          ))}
        </div>
      </div>

      <div className="relative z-10 ml-4 flex shrink-0 items-center rounded-sm border border-line-strong bg-abyss">
        <span className="px-3 py-1.5 font-sans text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
          <span className="hidden sm:inline">DEMO DATA</span>
          <span className="sm:hidden">DEMO</span>
        </span>
        <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-line-strong max-sm:hidden" />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume the live pulse" : "Pause the live pulse"}
          className="grid size-12 place-items-center rounded-xs text-fg-muted transition-colors duration-(--dur-fast) ease-out-quint hover:text-fg md:size-8"
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </motion.section>
  );
}

export default LivePulseStrip;
