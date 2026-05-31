import type { Achievement } from "@/types/achievement.types";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({
  achievement,
}: AchievementCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#09111f] p-6">
      <div className="mb-4">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400">
          {achievement.level}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white">
        {achievement.title}
      </h3>

      <p className="mt-3 text-slate-300">
        {achievement.studentName}
      </p>

      <p className="mt-1 text-slate-400">
        {achievement.activityName}
      </p>

      <p className="mt-4 text-sm text-slate-500">
        {achievement.achievedAt}
      </p>
    </div>
  );
};

export default AchievementCard;