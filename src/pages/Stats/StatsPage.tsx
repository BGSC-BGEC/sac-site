import {
  Activity,
  Clock3,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import {
  overviewCards,
  topActivities,
} from "@/mock/mockStats";

import ActivityBarChart from "@/components/charts/ActivityBarChart";
import ParticipationPieChart from "@/components/charts/ParticipationPieChart";
import ActivityTrendChart from "@/components/charts/ActivityTrendChart";

const iconMap = {
  users: Users,
  clock: Clock3,
  basketball: Trophy,
  activity: Activity,
  star: Star,
};

const StatsPage = () => {
  return (
    <section className="min-h-screen bg-[#030712] px-6 py-10 text-white">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="mb-3 text-sm text-white/40">
            Home {" > "} Stats {" > "} Overview
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Physical Activity Overview
          </h1>

          <p className="mt-3 text-white/60">
            Campus-wide participation and engagement.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-2xl border border-white/10 bg-[#081120] px-5 py-3 text-sm text-white/70 transition hover:border-cyan-400/30">
            This Month
          </button>
          <button className="rounded-2xl border border-white/10 bg-[#081120] px-5 py-3 text-sm text-white/70 transition hover:border-cyan-400/30">
            This Semester
          </button>

          <button className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-5 py-3 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20">
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        {overviewCards.map((card) => {
          const Icon =
            iconMap[card.icon as keyof typeof iconMap];

          return (
            <div
              key={card.id}
              className="group rounded-3xl border border-white/10 bg-[#081120] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                  <Icon className="h-7 w-7 text-purple-400" />
                </div>
              </div>

              <h2 className="text-3xl font-bold">
                {card.value}
              </h2>

              <p className="mt-1 text-sm text-white/60">
                {card.title}
              </p>

              <p className="mt-4 text-sm text-emerald-400">
                ↑ {card.growth}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Participation by Activity
              </h3>

              <p className="mt-1 text-sm text-white/50">
                Most active sports and programs.
              </p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60">
              Participants
            </button>
          </div>

          <ActivityBarChart />
        </div>

        {/* Pie Chart */}
        <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Participation by Category
              </h3>

              <p className="mt-1 text-sm text-white/50">
                Distribution of activities.
              </p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60">
              This Month
            </button>
          </div>

          <ParticipationPieChart />
        </div>

        {/* Trend Chart */}
        <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Activity Trend
              </h3>

              <p className="mt-1 text-sm text-white/50">
                Participation growth over months.
              </p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60">
              This Month
            </button>
          </div>

          <ActivityTrendChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Table */}
        <div className="rounded-3xl border border-white/10 bg-[#081120] p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Top Activities
            </h3>

            <button className="text-sm text-purple-400 transition hover:text-purple-300">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-white/40">
                  <th className="pb-4 font-medium">#</th>
                  <th className="pb-4 font-medium">Activity</th>
                  <th className="pb-4 font-medium">
                    Participants
                  </th>
                  <th className="pb-4 font-medium">
                    Sessions
                  </th>
                  <th className="pb-4 font-medium">
                    Hours Logged
                  </th>
                  <th className="pb-4 font-medium">
                    Avg / Week
                  </th>
                </tr>
              </thead>

              <tbody>
                {topActivities.map((activity) => (
                  <tr
                    key={activity.rank}
                    className="border-b border-white/5 text-sm transition hover:bg-white/[0.02]"
                  >
                    <td className="py-5 text-white/70">
                      {activity.rank}
                    </td>

                    <td className="py-5 font-medium">
                      {activity.activity}
                    </td>

                    <td className="py-5 text-white/70">
                      {activity.participants}
                    </td>

                    <td className="py-5 text-white/70">
                      {activity.sessions}
                    </td>

                    <td className="py-5 text-white/70">
                      {activity.hours}
                    </td>

                    <td className="py-5 text-white/70">
                      {activity.avg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-3xl border border-white/10 bg-[#081120] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Engagement Insights
            </h3>

            <button className="text-sm text-purple-400 transition hover:text-purple-300">
              View All
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <Users className="h-6 w-6 text-purple-400" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium">
                  High Participation Growth
                </h4>

                <p className="mt-1 text-sm text-white/50">
                  Active student participation increased by
                  12.5% this month.
                </p>
              </div>

              <span className="text-emerald-400">
                ↑ 12.5%
              </span>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <Clock3 className="h-6 w-6 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium">
                  More Hours Logged
                </h4>

                <p className="mt-1 text-sm text-white/50">
                  Total hours logged increased by 8.2%
                  compared to last month.
                </p>
              </div>

              <span className="text-emerald-400">
                ↑ 8.2%
              </span>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Activity className="h-6 w-6 text-emerald-400" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium">
                  Consistent Engagement
                </h4>

                <p className="mt-1 text-sm text-white/50">
                  Average sessions per week improved by 0.4
                  this month.
                </p>
              </div>

              <span className="text-emerald-400">
                ↑ 0.4
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsPage;