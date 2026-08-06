// src/components/layout/useHashScroll.ts
// Mount in MainLayout, once. Handles /#activities style deep links
// landing from another route after React commits the new DOM.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHashScroll() {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (!hash) return;
    let a = 0, b = 0;
    // Frame 1: React has committed the new route's DOM.
    // Frame 2: layout/paint has settled — only then measure & scroll.
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: "start" });
      });
    });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [hash, key]);
}
