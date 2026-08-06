// src/lib/motion.ts
// Contract C4: no component may write an inline `transition` object.
// Every duration and easing in the app comes from this file, which mirrors
// the @theme tokens exactly. A `transition={{ … }}` in src/ is a bug.

import type { Variants, Easing } from "motion/react"

export const DUR = { fast: 0.18, std: 0.42, slow: 0.72, hero: 1.0 } as const
// motion's `Variants` type widens inline tuple literals to `number[]`, which
// fails typecheck. Declaring them as the library's own `Easing` type first
// keeps the cubic-bezier shape intact through the object assignment.
const OUT_QUINT: Easing = [0.22, 1, 0.36, 1]
const IN_OUT_QUART: Easing = [0.76, 0, 0.24, 1]
export const EASE = { outQuint: OUT_QUINT, inOutQuart: IN_OUT_QUART } as const
export const REVEAL_Y = 24   // --reveal-y
export const LIFT = 4        // --lift

/* One viewport config for the whole app. -12% means an element commits when
   it is meaningfully on screen, not when one pixel crosses the edge.        */
export const viewportOnce = { once: true, margin: "-12% 0px" } as const

/* ── reveal ───────────────────────────────────────────────────────────── */
export const reveal: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: EASE.outQuint } },
}
export const revealReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

/* ── revealStagger — ONE observer on the parent, N children ─────────────
   A list must never put a Reveal on each item; that is N observers.        */
export const revealStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
})
export const revealStaggerReduced = (): Variants => ({ hidden: {}, show: {} })

/* ── heroLine — masked per-line entrance (SplitText) ───────────────────── */
export const heroLine: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: DUR.hero, ease: EASE.outQuint } },
}
export const heroLineReduced: Variants = {
  hidden: { y: "0%", opacity: 1 },
  show: { y: "0%", opacity: 1, transition: { duration: 0 } },
}

/* ── cardRoot — the CSS class, not a Motion variant ───────────────────
   Cards hover in CSS so no card mounts a Motion component. This string is
   contract C2; it is the single definition in the codebase.
   Composed with .card-lift utility (defined in index.css) which owns the
   actual transitions and hover state.                                          */
export const cardRoot =
  "group card-lift relative isolate flex flex-col overflow-hidden rounded-lg " +
  "border border-line bg-deep"

/* Rows and tiles: same treatment, no lift. */
export const cardRootFlat =
  "group card-lift relative isolate flex flex-col overflow-hidden rounded-lg " +
  "border border-line bg-deep"

/* ── the picker ───────────────────────────────────────────────────────────
   Usage:
     const v = useVariants(reveal, revealReduced)
     <motion.div variants={v} initial="hidden" whileInView="show" viewport={viewportOnce} />
*/
import { useReducedMotion } from "motion/react"
export function useVariants<T>(normal: T, reduced: T): T {
  return useReducedMotion() ? reduced : normal
}
