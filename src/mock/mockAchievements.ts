import type { Achievement } from "@/types/achievement.types";

export const mockAchievements: Achievement[] = [
  {
    id: 1,
    studentName: "Arjun Mehta",
    activityName: "Football",
    title: "Inter-BITS Football Champions",
    level: "National",
    achievedAt: "2025-10-12",
  },

  {
    id: 2,
    studentName: "Ananya Verma",
    activityName: "Swimming",
    title: "State Aquatics Gold Medal",
    level: "State",
    achievedAt: "2025-08-22",
  },

  {
    id: 3,
    studentName: "Rahul Nair",
    activityName: "Basketball",
    title: "Inter-University Tournament Winner",
    level: "National",
    achievedAt: "2024-12-10",
  },

  {
    id: 4,
    studentName: "Priya Shah",
    activityName: "Badminton",
    title: "Inter-NIT Championship Runner-Up",
    level: "Inter-NIT",
    achievedAt: "2024-04-05",
  },

  {
    id: 5,
    studentName: "Karan Patel",
    activityName: "Gym",
    title: "Campus Fitness Challenge Winner",
    level: "Campus",
    achievedAt: "2026-01-15",
  },
];