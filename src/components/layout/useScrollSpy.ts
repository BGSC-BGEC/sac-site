// src/components/layout/useScrollSpy.ts
// Thin sentinel band under the sticky header. One IntersectionObserver
// over all targets — no scroll listener, no getBoundingClientRect per frame.
import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], enabled: boolean, pathname: string) {
  const [state, setState] = useState<{ active: string | null; overLight: boolean }>({
    active: null,
    overLight: false,
  });

  useEffect(() => {
    const live = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { live.add(e.target); } else { live.delete(e.target); }
        }

        let active: string | null = null;
        if (enabled) {
          for (let i = ids.length - 1; i >= 0; i--) {
            const el = document.getElementById(ids[i]);
            if (el && live.has(el)) { active = ids[i]; break; }
          }
        }
        let overLight = false;
        for (const el of live) if ((el as HTMLElement).dataset.tone === "light") overLight = true;

        setState((p) => (p.active === active && p.overLight === overLight ? p : { active, overLight }));
      },
      { rootMargin: "-72px 0px -85% 0px", threshold: 0 },
    );

    const targets = new Set<Element>();
    for (const id of ids) { const el = document.getElementById(id); if (el) targets.add(el); }
    document.querySelectorAll("[data-tone='light']").forEach((el) => targets.add(el));
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [ids, enabled, pathname]);

  return state;
}
