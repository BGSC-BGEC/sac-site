import { useMemo, useState } from "react";
import {
  Clock3,
  LineChart as LineChartIcon,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  sacActivityStatsByRange,
  sacParticipationByRange,
  sacRangeLabels,
  type SacStatsRange,
} from "@/mock/mockSacStats";

const SacStatsPage = () => {
  const [range, setRange] = useState<SacStatsRange>("month");

  const activityStats = sacActivityStatsByRange[range];
  const participationData = sacParticipationByRange[range];

  const totals = useMemo(
    () =>
      activityStats.reduce(
        (acc, item) => ({
          participants: acc.participants + item.participants,
          sessions: acc.sessions + item.sessions,
        }),
        { participants: 0, sessions: 0 }
      ),
    [activityStats]
  );

  return (
    <section className="min-h-screen bg-[#030712] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-sm text-white/40">
              Home {" > "} Stats {" > "} SAC
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              SAC Participation Stats
            </h1>
            <p className="mt-3 max-w-2xl text-white/60">
              Track participation trends and per-activity engagement across SAC
              facilities.
            </p>
          </div>

          <div className="inline-flex rounded-2xl border border-white/10 bg-[#081120] p-1">
            {(["month", "semester"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  range === item
                    ? "bg-cyan-400 text-slate-950"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {sacRangeLabels[item]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
            <Users className="h-7 w-7 text-cyan-300" />
            <p className="mt-5 text-3xl font-bold">
              {totals.participants.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-white/50">Total participants</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
            <Clock3 className="h-7 w-7 text-emerald-300" />
            <p className="mt-5 text-3xl font-bold">{totals.sessions}</p>
            <p className="mt-1 text-sm text-white/50">Sessions conducted</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
            <LineChartIcon className="h-7 w-7 text-purple-300" />
            <p className="mt-5 text-3xl font-bold">
              {activityStats[0].activity}
            </p>
            <p className="mt-1 text-sm text-white/50">Highest participation</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#081120] p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Participation Over Months
              </h2>
              <p className="mt-1 text-sm text-white/50">
              Active student participation for {sacRangeLabels[range].toLowerCase()}.
              </p>
            </div>
            <span className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              {sacRangeLabels[range]}
            </span>
          </div>

          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={participationData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
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
                <Line
                  type="monotone"
                  dataKey="participants"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ fill: "#22d3ee", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Per-Activity Stats</h2>
            <p className="text-sm text-white/50">{sacRangeLabels[range]}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {activityStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.activity}
                  className="rounded-3xl border border-white/10 bg-[#081120] p-6 transition hover:border-cyan-400/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                      {item.trend}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{item.activity}</h3>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Participants</span>
                      <span className="font-semibold">{item.participants}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-white/50">Sessions</span>
                      <span className="font-semibold">{item.sessions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50">Hours logged</span>
                      <span className="font-semibold">{item.hours}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SacStatsPage;
