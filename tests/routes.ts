// tests/routes.ts
export const ROUTES = [
  { path: "/", h1: "Every court, every lane, in motion." },
  { path: "/activities", h1: "Where the campus trains" },
  { path: "/activities/basketball", h1: "Basketball" },
  { path: "/stats", h1: "The numbers behind the noise" },
  { path: "/gallery", h1: "Frames from the floor" },
  { path: "/gallery/swimming", h1: "Swimming" },
  { path: "/gallery/events", h1: "Every event, in frames" },
  { path: "/gallery/events/interbits-football", h1: "Inter-BITS Football Tournament" },
  { path: "/events", h1: "What the SAC runs" },
  { path: "/events/swimming-championship", h1: "Swimming Championship" },
  { path: "/people", h1: "Who runs it" },
  { path: "/achievements", h1: "What the campus brought back" },
  { path: "/contact", h1: "Talk to the SAC" },
  { path: "/nonsense-url-does-not-exist", h1: "" },
] as const;

export const LIVE_DAY = new Date("2026-08-05T09:00:00+05:30");
