// src/components/primitives/Stat.tsx
// Numerical stat block. Used in PulseStrip, ImpactScene, StatsPage.
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./AnimatedNumber"
import { formatGrowth } from "@/lib/format"

type StatProps = {
  label: string
  value: string | number      // pre-formatted strings from mockStats
  delta?: string              // "+12.5%", "Most Participated"
  className?: string
}

export function Stat({ label, value, delta, className }: StatProps) {
  const g = delta ? formatGrowth(delta) : null
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="font-display text-display-m font-semibold tabular-nums tracking-[-0.03em] leading-[0.92] text-volt">
        <AnimatedNumber value={value} />
      </p>
      <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted">{label}</p>
      {g && (
        <p className={cn("text-meta", g.dir === "up" ? "text-win" : g.dir === "down" ? "text-volt" : "text-fg-muted")}>
          {g.label}
        </p>
      )}
    </div>
  )
}
