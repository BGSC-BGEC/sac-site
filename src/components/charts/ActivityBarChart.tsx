import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { participationData } from "@/mock/mockStats";

const ActivityBarChart = () => {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={participationData}>
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="participants"
            radius={[10, 10, 0, 0]}
            fill="#8b5cf6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityBarChart;