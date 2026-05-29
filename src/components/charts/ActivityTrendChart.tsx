import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { trendData } from "@/mock/mockStats";

const ActivityTrendChart = () => {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData}>
          <defs>
            <linearGradient
              id="colorActivity"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#8b5cf6"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#8b5cf6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="month"
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

          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#colorActivity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityTrendChart;