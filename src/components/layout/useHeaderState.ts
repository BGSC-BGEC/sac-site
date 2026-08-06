// src/components/layout/useHeaderState.ts
// Scroll state as a motion value, not per-frame React state.
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

export function useHeaderState() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const last = useRef(0);
  const [s, setS] = useState({ solid: false, hidden: false });

  useMotionValueEvent(scrollY, "change", (y) => {
    const solid = y > 80;
    const hidden = !reduce && y > 400 && y > last.current;
    last.current = y;
    // Returning the SAME object when nothing crossed a threshold makes React bail out.
    setS((p) => (p.solid === solid && p.hidden === hidden ? p : { solid, hidden }));
  });

  return s;
}
