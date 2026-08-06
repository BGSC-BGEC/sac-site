// src/components/impact/useImpactScrub.ts
import { useEffect, type RefObject } from "react";

export function useImpactScrub(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let mm: ReturnType<typeof import("gsap").gsap.matchMedia> | undefined;
    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 0.72 },
          scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 42%", scrub: 0.72 },
        });
        tl.from(root.current!.querySelector("[data-stat-rule]"), { scaleX: 0, transformOrigin: "left center" }, 0)
          .from(root.current!.querySelectorAll("[data-stat-block]"), { yPercent: 18, opacity: 0, stagger: 0.18 }, 0);
      });

      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [root]);
}
