import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { categoryData } from "@/mock/mockStats";

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#3b82f6",
];

const ParticipationPieChart = () => {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
          >
            {categoryData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipationPieChart;