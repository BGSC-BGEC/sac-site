// src/components/layout/nav.ts
// Impact routes to /stats — the deep route exists today; there is no /impact page.
export const NAV = [
  { id: "activities", label: "Activities", route: "/activities" },
  { id: "events",     label: "Events",     route: "/events" },
  { id: "gallery",    label: "Gallery",    route: "/gallery" },
  { id: "people",     label: "People",     route: "/people" },
  { id: "impact",     label: "Impact",     route: "/stats" },
] as const;

export type NavItem = (typeof NAV)[number];

// Module-level constant => stable identity => useScrollSpy's effect never re-runs on render.
export const NAV_IDS = NAV.map((n) => n.id) as readonly string[];
