// src/components/charts/ActivityTrendChart.tsx
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTrendSeries } from "@/lib/content";
import { chart } from "./chartTokens";

const nf = new Intl.NumberFormat("en-IN");
const series = getTrendSeries();

const TrendTip = ({ active, label, payload }: { active?: boolean; label?: string; payload?: { value?: number | null }[] }) => {
  const v = payload?.[0]?.value;
  if (!active || v == null) return null;
  return (
    <div className="rounded-sm border border-line bg-deep px-3 py-2 shadow-lift">
      <p className="text-meta text-fg-muted">{label}</p>
      <p className="text-meta font-display tabular-nums text-fg">{nf.format(v)} participants</p>
    </div>
  );
};

function ActivityTrendChart({ animate = true }: { animate?: boolean }) {
  return (
    <div className="aspect-[4/3] max-h-[380px] min-h-[240px] w-full sm:aspect-[16/9]" role="presentation" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0.28 }} />
              <stop offset="100%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 6" stroke={chart.grid} vertical={false} />
          <XAxis dataKey="month" stroke={chart.axis} tick={chart.tick} tickLine={false} axisLine={false} dy={8} interval={0} minTickGap={4} />
          <YAxis stroke={chart.axis} tick={chart.tick} tickLine={false} axisLine={false} width={44}
            domain={[0, 1800]} ticks={[0, 600, 1200, 1800]} tickFormatter={(v: number) => nf.format(v)} />
          <Tooltip content={<TrendTip />} cursor={chart.cursor} animationDuration={chart.dur.fast} />
          <Area
            type="monotone" dataKey="value" stroke={chart.series[0]} strokeWidth={2}
            fill="url(#trendFill)" fillOpacity={1} connectNulls={false} dot={false}
            activeDot={{ r: 4, fill: "var(--color-volt)", stroke: "var(--color-void)", strokeWidth: 2 }}
            isAnimationActive={animate} animationDuration={chart.dur.slow} animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityTrendChart;
