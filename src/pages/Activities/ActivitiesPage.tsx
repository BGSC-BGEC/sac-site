import { useMemo, useState } from "react";

import { mockActivities } from "@/mock/mockActivities";

import ActivityCard from "./ActivityCard";

const categories = [
  "All",
  "Sports",
  "Fitness",
  "Recreation",
];

const ActivitiesPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredActivities = useMemo(() => {
    if (selectedCategory === "All") {
      return mockActivities;
    }

    return mockActivities.filter(
      (activity) =>
        activity.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section className="min-h-screen bg-[#050816] px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        {/* HEADING */}

        <div className="mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Sports Activities Centre
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            SAC Activities
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-400">
            Explore sports, fitness, and recreational
            facilities available across the BITS Goa
            campus.
          </p>
        </div>

        {/* FILTERS */}

        <div className="mb-10 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`rounded-2xl border px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-400/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ACTIVITIES GRID */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesPage;