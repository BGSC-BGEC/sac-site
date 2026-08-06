// src/lib/content.ts
// Contract C6: nothing outside this file imports from src/mock/*.
// Components take props; pages call selectors.

import { mockActivities } from "@/mock/mockActivities"
import { mockEvents } from "@/mock/mockEvents"
import { mockPeople } from "@/mock/mockPeople"
import { mockAchievements } from "@/mock/mockAchievements"
import { mockGallery, type GalleryImage } from "@/mock/mockGallery"
import { mockEventGallery } from "@/mock/mockEventGallery"
import { overviewCards, participationData, categoryData, trendData, topActivities } from "@/mock/mockStats"
import { toMinutes } from "./format"
import type { Activity } from "@/types/activity.types"
import type { Event } from "@/types/event.types"
import type { Person, PersonRole } from "@/types/person.types"
import type { Achievement } from "@/types/achievement.types"

/** All tense in the app derives from this. Injectable so tests can pin a date. */
export const today = (now: Date = new Date()) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate())

const dayStart = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export type EventStatus = "today" | "upcoming" | "past"

/** Compares calendar days, not timestamps — an event dated today is "today"
    for all 24 hours, not "past" from 00:00. */
export function eventStatus(e: Event, now = today()): EventStatus {
  const d = dayStart(e.startDate).getTime()
  const t = now.getTime()
  return d === t ? "today" : d > t ? "upcoming" : "past"
}

/* ── The featured-event selector — the one that must not lie ───────────── */

export type FeaturedEvent = { event: Event; status: EventStatus; label: string }

/** Order: happening today > next upcoming > most recent past.
    `isFeatured` is a TIE-BREAK ONLY, never an override. Both flagged events
    (2026-06-12, 2026-07-01) are already past; honouring the flag would put a
    concluded event under a "what's on" heading. See ruling R6. */
export function getFeaturedEvent(now = today()): FeaturedEvent | null {
  if (mockEvents.length === 0) return null
  const byDate = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate))

  const todayEvents = byDate.filter((e) => eventStatus(e, now) === "today")
  if (todayEvents.length)
    return { event: pickFeatured(todayEvents), status: "today", label: "Happening today" }

  const upcoming = byDate.filter((e) => eventStatus(e, now) === "upcoming")
  if (upcoming.length) return { event: upcoming[0], status: "upcoming", label: "Next up" }

  const past = byDate.filter((e) => eventStatus(e, now) === "past")
  return { event: past[past.length - 1], status: "past", label: "Most recent" }
}

const pickFeatured = (list: Event[]): Event =>
  list.find((e) => e.isFeatured) ?? list[0]

/** One sort, three lists. `past` is newest-first. */
export function getEventsByPhase(now = today()) {
  const sorted = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate))
  return {
    today: sorted.filter((e) => eventStatus(e, now) === "today"),
    upcoming: sorted.filter((e) => eventStatus(e, now) === "upcoming"),
    past: sorted.filter((e) => eventStatus(e, now) === "past").reverse(),
  }
}

export const getUpcomingEvents = (limit?: number, now = today()): Event[] => {
  const { today: t, upcoming } = getEventsByPhase(now)
  const list = [...t, ...upcoming]
  return limit ? list.slice(0, limit) : list
}

export const getPastEvents = (now = today()): Event[] => getEventsByPhase(now).past

export const getEventBySlug = (slug: string): Event | undefined =>
  mockEvents.find((e) => e.slug === slug)

/* ── Activities ─────────────────────────────────────────────────────────── */

export const getActivities = (): Activity[] => mockActivities
export const getActivityBySlug = (slug: string): Activity | undefined =>
  mockActivities.find((a) => a.slug === slug)

/** Derived from the activities themselves, so a filter pill can never exist
    with nothing behind it. `categoryData` lists "Recreation" (15%) but NO
    activity has that category — deriving is what keeps that pill from
    appearing. Returns ["Sports", "Fitness"] today. */
export const getActivityCategories = (): string[] =>
  [...new Set(mockActivities.map((a) => a.category))]

export const getActivitiesByCategory = (category: string | null): Activity[] =>
  !category || category === "All" ? mockActivities : mockActivities.filter((a) => a.category === category)

export const getCategoryCounts = (): Record<string, number> =>
  mockActivities.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1
    return acc
  }, {})

/** The hero's two live-card numerals. `venues` is deliberately absent —
    activities have no venue field. See ruling R11. */
export const getSiteCounts = () => ({
  activities: mockActivities.length,
  categories: getActivityCategories().length,
})

/* ── Open-now — the selector that admits what it cannot know ───────────── */

export type OpenState =
  | { state: "open"; until: string }
  | { state: "closed"; opens: string }
  | { state: "unknown" }

/** Every mock timing is dayOfWeek 1 (Monday). On six days out of seven this
    returns "unknown" — absence of data, never a false "closed". See R16. */
export function getOpenNow(activity: Activity, now: Date = new Date()): OpenState {
  const t = activity.timings.find((x) => x.dayOfWeek === now.getDay())
  if (!t) return { state: "unknown" }
  const mins = now.getHours() * 60 + now.getMinutes()
  const open = toMinutes(t.openTime)
  const close = toMinutes(t.closeTime)
  return mins >= open && mins < close
    ? { state: "open", until: t.closeTime }
    : { state: "closed", opens: t.openTime }
}

/** Strict dayOfWeek match. Returns [] on six days out of seven with today's
    mock. Do NOT "fix" this by treating timings[0] as a daily window. */
export const getOpenActivitiesNow = (now: Date = new Date()): Activity[] =>
  mockActivities.filter((a) => getOpenNow(a, now).state === "open")

/** True when today's weekday has ANY timing row at all. Gates the whole
    "Open now" affordance, so absence of data never renders as "Closed". */
export const hasTimingForToday = (now: Date = new Date()): boolean =>
  mockActivities.some((a) => a.timings.some((t) => t.dayOfWeek === now.getDay()))

/* ── Galleries ─────────────────────────────────────────────────────────── */

export type GalleryKind = "activity" | "event"

export function getGalleryFor(kind: GalleryKind, slug: string): GalleryImage[] {
  const set = kind === "activity"
    ? mockGallery.find((g) => g.activitySlug === slug)
    : mockEventGallery.find((g) => g.eventSlug === slug)
  return set?.images ?? []
}

/** Built ONCE as a lookup, not with .find() inside .map(). */
export function getGalleryCounts(kind: GalleryKind): Record<string, number> {
  const sets = kind === "activity" ? mockGallery : mockEventGallery
  return Object.fromEntries(
    sets.map((s) => [
      kind === "activity" ? (s as { activitySlug: string }).activitySlug
                          : (s as { eventSlug: string }).eventSlug,
      s.images.length,
    ]),
  )
}

/** All gallery sets of a kind, for preview reels and hub pages. */
export function getGallerySets(kind: GalleryKind) {
  return kind === "activity" ? mockGallery : mockEventGallery
}

/** Total image count across all sets of a kind. */
export function getGalleryTotal(kind: GalleryKind): number {
  return getGallerySets(kind).reduce((n, s) => n + s.images.length, 0)
}

/* ── People ────────────────────────────────────────────────────────────── */

export const getPeopleByRole = (role: PersonRole): Person[] =>
  mockPeople.filter((p) => p.personRole === role)

/* ── Achievements ──────────────────────────────────────────────────────── */

export const getAchievements = (): Achievement[] =>
  [...mockAchievements].sort((a, b) => b.achievedAt.localeCompare(a.achievedAt))

/** #wins and /achievements must not sort differently, so the homepage slice
    reads the same sorted list rather than re-sorting locally. Pure recency. */
export const getRecentAchievements = (limit = 3): Achievement[] =>
  getAchievements().slice(0, limit)

export const getAchievementCount = (): number => mockAchievements.length

/** Options derived from the records, so no filter offers an empty result. */
export function getAchievementFilters() {
  return {
    activities: [...new Set(mockAchievements.map((a) => a.activityName))].sort(),
    levels: [...new Set(mockAchievements.map((a) => a.level))],
    years: [...new Set(mockAchievements.map((a) => a.achievedAt.slice(0, 4)))].sort().reverse(),
  }
}

export function filterAchievements(f: { activity?: string; level?: string; year?: string }): Achievement[] {
  return getAchievements().filter(
    (a) =>
      (!f.activity || f.activity === "All" || a.activityName === f.activity) &&
      (!f.level || f.level === "All" || a.level === f.level) &&
      (!f.year || f.year === "All" || a.achievedAt.startsWith(f.year)),
  );
}

/* ── Stats ─────────────────────────────────────────────────────────────── */

/** R30: labels are derived, never authored. The series always ends on the
    current month. `Date` normalises a negative month index across the year
    boundary, so an 11-point series reads `Oct … Aug` on 2026-08-05. */
export const getTrendSeries = (now: Date = new Date()) => {
  const fmt = new Intl.DateTimeFormat("en-GB", { month: "short" })
  const n = trendData.length
  return trendData.map((value, i) => ({
    month: fmt.format(new Date(now.getFullYear(), now.getMonth() - (n - 1 - i), 1)),
    value,
  }))
}

export function getStatSummary() {
  return {
    cards: overviewCards,
    participation: participationData,
    categories: categoryData,
    /** 11 entries, Jan–Nov relative to today. December is the trailing null
        point the chart renders honestly. See ruling R30. */
    trend: trendData,
    topActivities,
  }
}

/* ── Self-check (DEV only) ─────────────────────────────────────────────── */
if (import.meta.env.DEV) {
  const liveDay = today(new Date(2026, 7, 5))
  console.assert(
    getActivities().length === 5,
    "content: mockActivities expected 5 records",
  )
  console.assert(
    JSON.stringify(getActivityCategories()) === JSON.stringify(["Sports", "Fitness"]),
    "content: categories expected [Sports, Fitness]",
  )
  console.assert(
    getSiteCounts().activities === 5 && getSiteCounts().categories === 2,
    "content: site counts expected {activities:5, categories:2}",
  )
  console.assert(
    getRecentAchievements(3)[0].studentName === "Karan Patel",
    "content: most-recent achievement should be Karan Patel (2026-01-15)",
  )
  const featured = getFeaturedEvent(liveDay)
  console.assert(
    featured?.event.slug === "swimming-championship" && featured.status === "today",
    "content: on 2026-08-05 the featured event should be swimming-championship (today)",
  )
}
