// src/components/impact/AnimatedNumber.tsx
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { parseStatValue } from "./parseStatValue";

export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const parsed = parseStatValue(value);
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    !parsed || v >= parsed.target
      ? value
      : v.toLocaleString("en-IN", { minimumFractionDigits: parsed.decimals, maximumFractionDigits: parsed.decimals }) + parsed.suffix,
  );

  useEffect(() => {
    if (!parsed || !inView || reduced) return;
    const c = animate(mv, parsed.target, { duration: 1, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
    // `parsed` is derived from `value` (stable prop); only `parsed.target` matters for the animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, parsed?.target, mv]);

  if (!parsed || reduced) return <span ref={ref}>{value}</span>;
  return <motion.span ref={ref}>{text}</motion.span>;
}
