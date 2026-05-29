import type { Activity } from "@/types/activity.types";
import { Link } from "react-router-dom";

type Props = {
  activity: Activity;
};

const ActivityCard = ({ activity }: Props) => {
  return (
    <Link
      to={`/activities/${activity.slug}`}
      className="group block overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={activity.coverImageUrl}
          alt={activity.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* CATEGORY BADGE */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
            {activity.category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {activity.name}
          </h2>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
            {activity.description}
          </p>
        </div>

        {/* TIMINGS */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Timings
          </p>

          <p className="mt-2 text-sm font-medium text-slate-200">
            {activity.timings[0].openTime} —{" "}
            {activity.timings[0].closeTime}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;