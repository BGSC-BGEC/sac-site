import { useParams } from "react-router-dom";

import { mockActivities } from "@/mock/mockActivities";

const ActivityDetailPage = () => {
  const { slug } = useParams();

  const activity = mockActivities.find(
    (item) => item.slug === slug
  );

  if (!activity) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Activity not found
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        {/* BREADCRUMB */}

        <div className="mb-8 text-sm text-slate-500">
          Activities /{" "}
          <span className="text-white">
            {activity.name}
          </span>
        </div>

        {/* HERO */}

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#09111f]">
          {/* IMAGE */}

          <div className="relative">
            <img
              src={activity.coverImageUrl}
              alt={activity.name}
              className="h-[500px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/20 to-transparent" />
          </div>

          {/* CONTENT */}

          <div className="space-y-8 p-8 lg:p-12">
            {/* CATEGORY */}

            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              {activity.category}
            </span>

            {/* TITLE */}

            <div>
              <h1 className="text-5xl font-black tracking-tight lg:text-7xl">
                {activity.name}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                {activity.description}
              </p>
            </div>

            {/* INFO GRID */}

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-500">
                  Opening Time
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {activity.timings[0].openTime}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-500">
                  Closing Time
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {activity.timings[0].closeTime}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-500">
                  Category
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {activity.category}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY SECTION */}

        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold">
            Gallery Preview
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <img
              src={activity.coverImageUrl}
              className="h-72 w-full rounded-3xl object-cover"
            />

            <img
              src={activity.coverImageUrl}
              className="h-72 w-full rounded-3xl object-cover"
            />

            <img
              src={activity.coverImageUrl}
              className="h-72 w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityDetailPage;