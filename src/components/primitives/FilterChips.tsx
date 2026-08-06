// src/components/primitives/FilterChips.tsx
// One labelled chip row, used by /activities and /achievements.
// Contract R5: aria-pressed toggle buttons inside role="group", never
// role="radiogroup" (a radiogroup owes arrow-key nav we don't implement).
import { cn } from "@/lib/utils"

type FilterChipsProps = {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  counts?: Record<string, number>
  className?: string
}

export function FilterChips({ label, options, value, onChange, counts, className }: FilterChipsProps) {
  return (
    <fieldset className={cn("border-0 p-0", className)}>
      <legend className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-2">{label}</legend>
      <div
        role="group"
        aria-label={`Filter by ${label.toLowerCase()}`}
        className="flex flex-wrap gap-2"
      >
        {options.map((o) => {
          const on = o === value
          const n = counts?.[o]
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={cn(
                "relative inline-flex h-12 items-center rounded-full border px-5 text-meta font-medium",
                "transition-colors duration-(--dur-fast) ease-out-quint",
                on
                  ? "border-volt bg-volt text-ink"
                  : "border-line bg-abyss text-fg-muted hover:border-line-strong hover:bg-raised hover:text-cream",
                "md:h-10 md:px-4",
              )}
            >
              {o}
              {n != null && (
                <span
                  aria-hidden
                  className={cn(
                    "ml-2 font-display tabular-nums",
                    on ? "text-ink/65" : "text-fg-faint",
                  )}
                >
                  {n}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
