export const overviewCards = [
  {
    id: 1,
    title: "Active Students",
    value: "1,248+",
    growth: "+12.5%",
    icon: "users",
    color: "purple",
  },
  {
    id: 2,
    title: "Total Hours Logged",
    value: "12,540+",
    growth: "+8.2%",
    icon: "clock",
    color: "blue",
  },
  {
    id: 3,
    title: "Top Activity",
    value: "Basketball",
    growth: "Most Participated",
    icon: "basketball",
    color: "orange",
  },
  {
    id: 4,
    title: "Avg. Sessions / Week",
    value: "3.6",
    growth: "+0.4",
    icon: "activity",
    color: "green",
  },
  {
    id: 5,
    title: "Activities Conducted",
    value: "24",
    growth: "+6",
    icon: "star",
    color: "yellow",
  },
];

export const participationData = [
  { name: "Basketball", participants: 820 },
  { name: "Swimming", participants: 650 },
  { name: "Gym", participants: 520 },
  { name: "Badminton", participants: 480 },
  { name: "Football", participants: 390 },
  { name: "Yoga", participants: 320 },
  { name: "TT", participants: 250 },
];

export const categoryData = [
  { name: "Sports", value: 55 },
  { name: "Fitness", value: 30 },
  { name: "Recreation", value: 15 },
];

// R30: month is derived from today, never authored. A chart that shows next
// month as history is a bug; a hardcoded window is the same bug on a delay.
// `getTrendSeries()` in src/lib/content.ts computes labels from `now`.
export const trendData: number[] = [
  1000, 1350, 1250, 1450, 1300, 1700, 1450, 1000, 1150, 1500, 1200,
];

export const topActivities = [
  {
    rank: 1,
    activity: "Basketball",
    participants: 128,
    sessions: 45,
    hours: "320+",
    avg: 3.8,
  },
  {
    rank: 2,
    activity: "Gym & Fitness",
    participants: 96,
    sessions: 62,
    hours: "450+",
    avg: 4.6,
  },
];