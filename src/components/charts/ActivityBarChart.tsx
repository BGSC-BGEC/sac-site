// src/components/charts/ActivityBarChart.tsx
import { getStatSummary } from "@/lib/content";
import { chart } from "./chartTokens";

const nf = new Intl.NumberFormat("en-IN");
const { participation: participationData } = getStatSummary();

function ActivityBarChart() {
  const max = Math.max(...participationData.map((d) => d.participants));
  return (
    <div className="space-y-3">
      {participationData.map((d) => {
        const pct = (d.participants / max) * 100;
        const isTop = d.participants === max;
        return (
          <div key={d.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-meta text-fg-muted">{d.name}</span>
            <div className="relative h-8 flex-1 overflow-hidden rounded-xs bg-raised">
              <div
                className="absolute inset-y-0 left-0 rounded-xs transition-all duration-(--dur-slow) ease-out-quint"
                style={{ width: `${pct}%`, backgroundColor: isTop ? chart.series[0] : chart.series[1] }}
              />
            </div>
            <span className="w-12 shrink-0 text-right font-display text-meta tabular-nums text-fg">{nf.format(d.participants)}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityBarChart;
