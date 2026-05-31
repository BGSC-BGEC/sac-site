import {
  Activity,
  Dumbbell,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SacStatsRange = "month" | "semester";

export interface SacParticipationPoint {
  month: string;
  participants: number;
}

export interface SacActivityStat {
  activity: string;
  participants: number;
  sessions: number;
  hours: string;
  trend: string;
  icon: LucideIcon;
}

export const sacRangeLabels: Record<SacStatsRange, string> = {
  month: "This Month",
  semester: "This Semester",
};

export const sacParticipationByRange: Record<
  SacStatsRange,
  SacParticipationPoint[]
> = {
  month: [
    { month: "Week 1", participants: 420 },
    { month: "Week 2", participants: 510 },
    { month: "Week 3", participants: 565 },
    { month: "Week 4", participants: 610 },
  ],
  semester: [
    { month: "Jan", participants: 980 },
    { month: "Feb", participants: 1120 },
    { month: "Mar", participants: 1280 },
    { month: "Apr", participants: 1210 },
    { month: "May", participants: 1460 },
    { month: "Jun", participants: 1585 },
  ],
};

export const sacActivityStatsByRange: Record<
  SacStatsRange,
  SacActivityStat[]
> = {
  month: [
    {
      activity: "Basketball",
      participants: 128,
      sessions: 18,
      hours: "94h",
      trend: "+14%",
      icon: Trophy,
    },
    {
      activity: "Gym & Fitness",
      participants: 116,
      sessions: 24,
      hours: "132h",
      trend: "+9%",
      icon: Dumbbell,
    },
    {
      activity: "Badminton",
      participants: 88,
      sessions: 16,
      hours: "72h",
      trend: "+7%",
      icon: Activity,
    },
    {
      activity: "Swimming",
      participants: 74,
      sessions: 12,
      hours: "48h",
      trend: "+5%",
      icon: Users,
    },
  ],
  semester: [
    {
      activity: "Basketball",
      participants: 820,
      sessions: 92,
      hours: "540h",
      trend: "+18%",
      icon: Trophy,
    },
    {
      activity: "Gym & Fitness",
      participants: 760,
      sessions: 148,
      hours: "810h",
      trend: "+12%",
      icon: Dumbbell,
    },
    {
      activity: "Badminton",
      participants: 610,
      sessions: 88,
      hours: "396h",
      trend: "+10%",
      icon: Activity,
    },
    {
      activity: "Swimming",
      participants: 540,
      sessions: 64,
      hours: "284h",
      trend: "+8%",
      icon: Users,
    },
  ],
};
