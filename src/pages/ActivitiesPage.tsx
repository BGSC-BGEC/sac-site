import { useMemo, useState } from "react";
import { mockActivities } from "@/mock/mockActivities";

const categories = ["All", "Sports", "Fitness", "Recreation"];

const ActivitiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredActivities = useMemo(() => {
    if (selectedCategory === "All") return mockActivities;

    return mockActivities.filter(
      (activity) => activity.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          SAC Activities
        </h1>

        <p className="mt-3 text-slate-600">
          Explore sports, fitness, and recreational facilities available on campus.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Cover Image */}
            <img
              src={activity.coverImageUrl}
              alt={activity.name}
              className="h-52 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5">
              {/* Category Badge */}
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {activity.category}
              </span>

              {/* Name */}
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                {activity.name}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activity.description}
              </p>

              {/* Timing Summary */}
              <div className="mt-5 rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-800">
                  Timings
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {activity.timings[0].openTime} -{" "}
                  {activity.timings[0].closeTime}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesPage;