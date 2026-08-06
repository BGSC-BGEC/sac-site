// src/components/primitives/MockTag.tsx
// The "Sample data" marker required by the locked decision.
// Never volt — it is a disclosure, not a feature.
import { cn } from "@/lib/utils"

export function MockTag({ className, children = "Sample data" }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2 py-0.5",
        "text-eyebrow uppercase tracking-[0.2em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  )
}
