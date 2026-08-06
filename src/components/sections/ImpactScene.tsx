// src/components/sections/ImpactScene.tsx
// GSAP flagship #2 — #impact. Scrubbed stat rule + numeral reveal.
// No recharts (keeps the chart lib in the /stats chunk only).
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { getTrendSeries, getStatSummary } from "@/lib/content";
import { AnimatedNumber } from "@/components/impact/AnimatedNumber";
import { useImpactScrub } from "@/components/impact/useImpactScrub";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

// R29: drops card 3 "Top Activity / Basketball" — not a number
const { cards: overviewCards, trend: trendData } = getStatSummary();
const cards = overviewCards.filter((c) => c.id !== 3);
const series = getTrendSeries();

const reveal = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: OUT_QUINT } },
};

function ImpactScene() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  useImpactScrub(rootRef);

  const groupProps = reduce
    ? {}
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.4 } as const };

  // SVG trend chart — no recharts
  const maxVal = Math.max(...trendData);
  const chartW = 600;
  const chartH = 240;
  const pad = { l: 40, r: 10, t: 10, b: 24 };
  const plotW = chartW - pad.l - pad.r;
  const plotH = chartH - pad.t - pad.b;
  const xStep = plotW / (series.length - 1);
  const points = series.map((d, i) => ({
    x: pad.l + i * xStep,
    y: d.value == null ? null : pad.t + plotH - (d.value / maxVal) * plotH,
  }));
  const linePath = points
    .filter((p) => p.y !== null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const areaPath = points
    .filter((p) => p.y !== null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ") + ` L${points[points.length - 1].x},${pad.t + plotH} L${points[0].x},${pad.t + plotH} Z`;

  return (
    <section
      id="impact"
      ref={rootRef}
      aria-labelledby="impact-title"
      className="relative isolate overflow-hidden mesh-teal bg-void scroll-mt-24 py-(--space-section)"
      style={{ "--mesh-strength": 0.4 } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-(--container) px-(--gutter)">
        {/* Header */}
        <motion.div {...groupProps} transition={{ staggerChildren: 0.18 }} className="mb-12">
          <motion.p variants={reveal} className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-5">
            <span aria-hidden="true" className="mr-3 inline-block h-px w-6 align-middle bg-volt" />IMPACT
          </motion.p>
          <motion.h2
            variants={reveal}
            id="impact-title"
            className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[18ch] lg:col-span-7"
          >
            Participation is the only metric we care about.
          </motion.h2>
          <motion.p variants={reveal} className="text-lead text-fg-muted max-w-[42ch] mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
            Every booking, lap and rep rolls up into four numbers.
          </motion.p>
        </motion.div>

        {/* Stat rule */}
        <div data-stat-rule className="mt-16 h-px w-full origin-left bg-line-strong" />

        {/* Stat grid */}
        <div className="mt-0 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              data-stat-block
              className="bg-deep p-5 transition-colors duration-(--dur-fast) ease-out-quint hover:bg-raised md:p-6 lg:p-8"
            >
              <p className="font-display text-display-m font-semibold tabular-nums tracking-[-0.03em] leading-[0.92] text-volt mb-3">
                <AnimatedNumber value={card.value} />
              </p>
              <p className="text-meta uppercase tracking-[0.2em] text-fg-muted max-w-[14ch] mb-4">{card.title}</p>
              <span className="inline-flex items-center rounded-full border border-line-strong bg-abyss px-2.5 py-1 font-display text-meta tabular-nums text-cream-dim">
                {card.growth}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-meta text-fg-muted">Change since last month.</p>

        {/* Trend chart — SVG, no recharts */}
        <motion.figure {...groupProps} variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }} className="mt-12 rounded-lg border border-line bg-deep p-6 shadow-lift lg:p-8">
          <motion.div variants={reveal} className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-1">Monthly participation</h3>
              <p className="text-meta text-fg-muted max-w-[46ch]">
                January to November. December is not in the dataset yet.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full border border-line-strong bg-abyss px-3 py-1 text-meta text-cream-dim sm:ml-auto">
              Sample data
            </span>
          </motion.div>

          <div role="presentation" aria-hidden="true" className="w-full">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" style={{ maxHeight: "380px" }}>
              <defs>
                <linearGradient id="impactTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0.28 }} />
                  <stop offset="100%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <line key={t} x1={pad.l} x2={chartW - pad.r} y1={pad.t + plotH * t} y2={pad.t + plotH * t}
                  stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" />
              ))}
              <path d={areaPath} fill="url(#impactTrendFill)" />
              <path d={linePath} fill="none" stroke="var(--color-volt)" strokeWidth="2" />
              {series.map((d, i) => (
                <text key={i} x={pad.l + i * xStep} y={chartH - 6} textAnchor="middle"
                  fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-sans)">
                  {d.month}
                </text>
              ))}
              {[0, maxVal * 0.5, maxVal].map((v, i) => (
                <text key={i} x={pad.l - 6} y={pad.t + plotH - (v / maxVal) * plotH + 4} textAnchor="end"
                  fill="var(--color-fg-muted)" fontSize="11" fontFamily="var(--font-sans)">
                  {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
                </text>
              ))}
            </svg>
          </div>

          {/* Table alternative */}
          <details className="mt-6 border-t border-line pt-6">
            <summary className="min-h-12 cursor-pointer py-3 text-meta text-fg-muted hover:text-fg transition-colors">
              ▾ View the data as a table
            </summary>
            <table className="mt-4 w-full text-meta">
              <caption className="pb-4 text-left text-fg-muted">Monthly participation, January to November</caption>
              <thead>
                <tr>
                  <th scope="col" className="pb-3 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Month</th>
                  <th scope="col" className="pb-3 text-right text-eyebrow uppercase tracking-[0.2em] text-fg-muted">Participants</th>
                </tr>
              </thead>
              <tbody>
                {series.map((d) => (
                  <tr key={d.month} className="border-b border-line">
                    <td className="py-2.5 text-fg-muted">{d.month}</td>
                    <td className="py-2.5 text-right font-display tabular-nums text-fg">
                      {d.value == null ? <span className="text-fg-faint">Not recorded</span> : d.value.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>

          <figcaption className="mt-4 text-meta text-fg-muted">
            <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-volt" />
            Participants
          </figcaption>
        </motion.figure>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/stats"
            className="group inline-flex min-h-12 w-full items-center justify-center border-b border-line-volt text-body text-volt transition-colors duration-(--dur-fast) ease-out-quint hover:border-volt hover:text-volt-600 lg:w-auto lg:justify-start lg:min-h-0"
          >
            Full stats
            <span aria-hidden="true" className="ml-2 transition-transform duration-(--dur-fast) ease-out-quint group-hover:translate-x-(--lift) motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ImpactScene;
