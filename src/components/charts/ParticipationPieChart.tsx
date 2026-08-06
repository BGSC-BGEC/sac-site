// src/components/charts/ParticipationPieChart.tsx
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { getStatSummary } from "@/lib/content";
import { chart } from "./chartTokens";

const { categories: categoryData } = getStatSummary();

const COLORS = [chart.series[2], chart.series[1], "var(--color-teal-700)"];

const PieTip = ({ active, payload }: { active?: boolean; payload?: { name?: string; value?: number }[] }) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="rounded-sm border border-line bg-deep px-3 py-2 shadow-lift">
      <p className="text-meta text-fg">{payload[0].name}: {payload[0].value}%</p>
    </div>
  );
};

function ParticipationPieChart({ animate = true }: { animate?: boolean }) {
  return (
    <div className="aspect-square max-h-[300px] w-full" role="presentation" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%"
            innerRadius={60} outerRadius={90} paddingAngle={2}
            isAnimationActive={animate} animationDuration={chart.dur.slow} animationEasing="ease-out">
            {categoryData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--color-void)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<PieTip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ParticipationPieChart;
