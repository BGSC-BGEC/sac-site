// src/components/cards/AchievementCard.tsx
// Typographic, no image (zero records have imageUrl). Volt eyebrow level.
import type { Achievement } from "@/types/achievement.types";
import { formatDate } from "@/lib/format";

const LEVEL_CHIP: Record<string, string> = {
  National: "bg-volt text-ink border-transparent font-semibold",
  State: "text-volt border-line-volt font-medium",
  "Inter-NIT": "text-cream-dim border-line-strong font-medium",
  Campus: "text-fg-muted border-line font-medium",
};
const CHIP_FALLBACK = LEVEL_CHIP.Campus;

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-line bg-deep p-6 transition-colors duration-(--dur-fast) ease-out-quint hover:border-line-strong hover:bg-raised">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line-volt" />
      <div className="mb-4 flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-eyebrow uppercase tracking-[0.2em] ${LEVEL_CHIP[achievement.level] ?? CHIP_FALLBACK}`}>
          <span className="sr-only">Level: </span>{achievement.level}
        </span>
      </div>
      <h3 className="font-display text-title font-semibold tracking-[-0.03em] text-fg">{achievement.title}</h3>
      <p className="mt-2 text-body text-fg-muted">{achievement.studentName}</p>
      <p className="mt-3 text-meta text-fg-muted">
        {achievement.activityName}
        <span aria-hidden="true" className="mx-2 text-fg-faint">·</span>
        <time dateTime={achievement.achievedAt}>{formatDate(achievement.achievedAt)}</time>
      </p>
    </article>
  );
}

export default AchievementCard;
