// src/components/cards/ActivityCard.tsx
// Two variants, one component. Root IS the <Link> (contract C3).
// Uses card-lift CSS utility (contract C2) for hover.
import { Link } from "react-router-dom";
import type { Activity } from "@/types/activity.types";
import { activityHours } from "@/lib/format";
import { MediaFrame } from "@/components/primitives/MediaFrame";

// Contract C5: one ordering expression, one grid. Exported so #focus mirrors.
export const ACTIVITY_GRID = "grid grid-cols-12 gap-x-6";
export const ACTIVITY_CELL = "col-span-4";

type Variant = "feature" | "compact";

type Props = {
  activity: Activity;
  variant?: Variant;
  priority?: boolean;
};

const SHELL =
  "group card-lift relative isolate block overflow-hidden border border-line bg-abyss";

const FRAME: Record<Variant, string> = {
  feature: "aspect-[4/5] rounded-(--radius-xl) lg:rounded-(--radius-2xl)",
  compact: "aspect-[3/2] rounded-(--radius-lg) lg:aspect-auto lg:h-full",
};

function ActivityCard({ activity, variant = "compact", priority = false }: Props) {
  const feature = variant === "feature";
  const w = feature ? 900 : 560;

  return (
    <Link to={`/activities/${activity.slug}`} className={`${SHELL} ${FRAME[variant]}`}>
      <MediaFrame
        src={activity.coverImageUrl}
        alt=""
        ratio={feature ? "4/5" : "3/2"}
        radius="none"
        width={w}
        priority={priority}
        className="absolute inset-0 size-full object-cover"
      />

      {/* legibility guarantee — flat wash + tonal scrim */}
      <span aria-hidden="true" className="absolute inset-0 bg-void/30" />
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-900 via-teal-900/55 to-transparent ${
          feature ? "h-[62%]" : "h-[72%]"
        }`}
      />

      <span className="absolute left-5 top-5 z-[2] inline-flex h-7 items-center rounded-full border border-line-volt bg-void/40 px-3 text-eyebrow font-medium uppercase tracking-[0.2em] text-volt backdrop-blur-md">
        {activity.category}
      </span>

      <div className={`absolute inset-x-0 bottom-0 z-[2] ${feature ? "p-8 lg:p-10" : "p-5 lg:p-6"}`}>
        <h3
          className={`font-display font-semibold tracking-[-0.03em] leading-[0.92] text-cream ${
            feature ? "text-display-m mb-3" : "text-title mb-1.5"
          }`}
        >
          {activity.name}
          <span className="sr-only"> — View details</span>
        </h3>

        {feature && activity.description && (
          <p className="mb-5 max-w-[42ch] text-body leading-[1.6] text-fg-muted line-clamp-2">
            {activity.description}
          </p>
        )}

        <p className="flex items-center text-meta tabular-nums text-fg-muted">
          <span aria-hidden="true" className="mr-2 text-fg-muted">◔</span>
          {activityHours(activity)}
        </p>
      </div>
    </Link>
  );
}

export default ActivityCard;
