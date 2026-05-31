import { useMemo, useState } from "react";

import AchievementCard from "@/components/cards/AchievementCard";
import { mockAchievements } from "@/mock/mockAchievements";

const AchievementsPage = () => {
  const [selectedLevel, setSelectedLevel] =
    useState("All");

  const [selectedActivity, setSelectedActivity] =
    useState("All");

  const [selectedYear, setSelectedYear] =
    useState("All");

  const levels = [
    "All",
    ...new Set(
      mockAchievements.map(
        (achievement) => achievement.level
      )
    ),
  ];

  const activities = [
    "All",
    ...new Set(
      mockAchievements.map(
        (achievement) => achievement.activityName
      )
    ),
  ];

  const years = [
    "All",
    ...new Set(
      mockAchievements.map(
        (achievement) =>
          new Date(
            achievement.achievedAt
          ).getFullYear().toString()
      )
    ),
  ];

  const filteredAchievements = useMemo(() => {
    return mockAchievements.filter((achievement) => {
      const matchesLevel =
        selectedLevel === "All" ||
        achievement.level === selectedLevel;

      const matchesActivity =
        selectedActivity === "All" ||
        achievement.activityName === selectedActivity;

      const matchesYear =
        selectedYear === "All" ||
        new Date(
          achievement.achievedAt
        ).getFullYear().toString() === selectedYear;

      return (
        matchesLevel &&
        matchesActivity &&
        matchesYear
      );
    });
  }, [
    selectedLevel,
    selectedActivity,
    selectedYear,
  ]);

  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            Achievements
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Celebrating outstanding performances and sporting
            achievements by students across SAC activities.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`rounded-full px-4 py-2 text-sm transition ${selectedLevel === level
                ? "bg-cyan-400 text-black"
                : "bg-[#09111f] text-slate-300 hover:text-cyan-400"
                }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-sm font-medium text-slate-400">
            Activity
          </h3>

          <div className="flex flex-wrap gap-3">
            {activities.map((activity) => (
              <button
                key={activity}
                onClick={() =>
                  setSelectedActivity(activity)
                }
                className={`rounded-full px-4 py-2 text-sm transition ${selectedActivity === activity
                  ? "bg-cyan-400 text-black"
                  : "bg-[#09111f] text-slate-300 hover:text-cyan-400"
                  }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-3 text-sm font-medium text-slate-400">
            Year
          </h3>

          <div className="flex flex-wrap gap-3">
            {years.map((year) => (
              <button
                key={year}
                onClick={() =>
                  setSelectedYear(year)
                }
                className={`rounded-full px-4 py-2 text-sm transition ${selectedYear === year
                    ? "bg-cyan-400 text-black"
                    : "bg-[#09111f] text-slate-300 hover:text-cyan-400"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsPage;