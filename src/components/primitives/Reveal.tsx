// src/components/primitives/Reveal.tsx
// The one scroll-entrance wrapper in the codebase. Owns the
// prefers-reduced-motion branch once. Never nest Reveal inside Reveal.
import { motion, type MotionProps, type Variants } from "motion/react"
import { reveal, revealReduced, viewportOnce, useVariants } from "@/lib/motion"
import { cn } from "@/lib/utils"

type RevealProps = {
  as?: "div" | "li" | "section" | "article" | "span"
  delay?: number
  y?: number
  once?: boolean
  className?: string
  children: React.ReactNode
} & Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport">

const TAGS = { div: "div", li: "li", section: "section", article: "article", span: "span" } as const

// Custom-y variant built once with the same Easing-typed const pattern as
// motion.ts — building it inline inside the component widened `ease` to
// `number[]` and failed typecheck on every render.
import type { Easing } from "motion/react"
const OUT_QUINT: Easing = [0.22, 1, 0.36, 1]
const customReveal = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: OUT_QUINT } },
})

export function Reveal({
  as = "div", delay = 0, y, once = true, className, children, ...rest
}: RevealProps) {
  const Tag = motion[TAGS[as]]
  // useVariants wraps useReducedMotion — must be called unconditionally.
  const fallback = useVariants(reveal, revealReduced)
  const variants = y != null ? customReveal(y) : fallback
  return (
    <Tag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, once }}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
