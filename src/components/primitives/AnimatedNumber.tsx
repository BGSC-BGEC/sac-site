// src/components/primitives/AnimatedNumber.tsx
// Counts a stat up when it scrolls in. Non-numeric values ("Basketball")
// render as plain text. No per-frame React state — MotionValue writes to the DOM.
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type Easing } from "motion/react"
import { useEffect, useRef } from "react"
import { formatLike } from "@/lib/format"
import type { ParsedNumber } from "@/lib/format"

const EASE_OUT_QUINT: Easing = [0.22, 1, 0.36, 1]

/** "1,248+" -> {n:1248,...} · "3.6" -> {n:3.6,...} · "Basketball" -> null */
function parse(value: string): ParsedNumber | null {
  const m = /^(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value)
  if (!m) return null
  const digits = m[1].replace(/,/g, "")
  const dot = digits.indexOf(".")
  return { n: Number(digits), prefix: "", suffix: m[2], decimals: dot < 0 ? 0 : digits.length - dot - 1, grouped: m[1].includes(",") }
}

export function AnimatedNumber({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const parsed: ParsedNumber | null = typeof value === "number"
    ? { n: value, prefix: "", suffix: "", decimals: value % 1 ? 1 : 0, grouped: false }
    : parse(value)
  const target = parsed?.n
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => {
    if (target == null) return String(value)
    if (v >= target) return String(value)
    if (parsed) return formatLike(v, parsed)
    return String(Math.round(v))
  })

  useEffect(() => {
    if (target == null || !inView || reduced) return
    const c = animate(mv, target, { duration: 1, ease: EASE_OUT_QUINT })
    return () => c.stop()
  }, [inView, reduced, target, mv])

  if (target == null || reduced) return <span ref={ref}>{value}</span>
  return <motion.span ref={ref} aria-label={String(value)}>{text}</motion.span>
}
