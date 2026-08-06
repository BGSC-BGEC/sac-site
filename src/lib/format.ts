// src/lib/format.ts
// Single source for every date/time/number render. No page calls
// `new Date(iso).toLocaleDateString` directly — `formatDate` is the only
// path, so a future locale change is one edit.

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] as const

/** Local calendar day as yyyy-mm-dd. ISO date strings sort and compare
    lexically. `toISOString()` is UTC and shifts the "is it today" test by
    5.5h in IST — never use it for date comparisons. */
export const localISODate = (d: Date = new Date()): string =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);

/** "2026-08-05" -> "5 Aug 2026". Never render an ISO string in JSX. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/** "2026-08-05" -> "Aug 2026" — for grouped archive headings. */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

/** "06:00" -> "6:00 am". Mock timings are 24h "HH:MM" strings, never Dates. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number)
  const period = h < 12 ? "am" : "pm"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, "0")} ${period}`
}

/** A timing -> "Mon · 6:00 am – 10:00 pm". Always names the day: every mock
    timing is dayOfWeek 1, and printing hours without the day implies daily. */
export function formatRange(t: { dayOfWeek: number; openTime: string; closeTime: string; label?: string }): string {
  return t.label ?? `${DAYS[t.dayOfWeek]} · ${formatTime(t.openTime)} – ${formatTime(t.closeTime)}`
}

export function dayLabel(dayOfWeek: number): string {
  return DAYS[dayOfWeek] ?? "—"
}

/** Minutes since midnight, for open/closed comparison. */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

/** The single guarded timings[0] read. Fixes the throw at ActivityCard.tsx:52-53
 *  and ActivityDetailPage.tsx:77,87 at the source — do NOT re-guard at call sites. */
export function activityHours(a: { timings: { dayOfWeek: number; openTime: string; closeTime: string; label?: string }[] }): string {
  const t = a.timings[0]
  if (!t) return "Hours not listed"
  return formatRange(t)
}

/** Every bare images.unsplash.com URL in the mocks fetches a full-res
    original. MediaFrame routes all of them through here. */
export function withUnsplashParams(url: string, w = 1200): string {
  if (!url.includes("images.unsplash.com")) return url
  if (url.includes("?")) return url
  return `${url}?auto=format&fit=crop&w=${w}&q=${w > 1200 ? 76 : 72}`
}

export type ParsedNumber = {
  n: number
  prefix: string
  suffix: string
  decimals: number
  grouped: boolean
}

/** The mock stat values are pre-formatted strings: "1,248+", "12,540+",
    "3.6", "24", "Basketball". Returns null when there is no leading number,
    which is how AnimatedNumber knows to render plain text instead. */
export function parseLeadingNumber(value: string | number): ParsedNumber | null {
  if (typeof value === "number") {
    return { n: value, prefix: "", suffix: "", decimals: value % 1 ? 1 : 0, grouped: false }
  }
  const m = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/.exec(value.trim())
  if (!m) return null
  const [, prefix, digits, suffix] = m
  const n = Number(digits.replace(/,/g, ""))
  if (!Number.isFinite(n)) return null
  const dot = digits.indexOf(".")
  return {
    n,
    prefix,
    suffix,
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    grouped: digits.includes(","),
  }
}

/** Re-emit an in-flight counter value in the source string's own shape, so
    "1,248+" counts to "1,248+" and never to "1248". */
export function formatLike(v: number, p: ParsedNumber): string {
  const fixed = v.toFixed(p.decimals)
  const body = p.grouped
    ? Number(fixed).toLocaleString("en-IN", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : fixed
  return `${p.prefix}${body}${p.suffix}`
}

/** Sign-driven growth. Fixes StatsPage.tsx:84's hardcoded green ↑ on every
 *  card, including card 3 whose "growth" is the non-numeric string
 *  "Most Participated". */
export type Growth = { dir: "up" | "down" | "flat" | "none"; label: string }
export const formatGrowth = (raw: string): Growth => {
  const m = raw.match(/^([+-])?\s*([\d.]+)/)
  if (!m) return { dir: "none", label: raw }
  if (Number(m[2]) === 0) return { dir: "flat", label: raw }
  return { dir: m[1] === "-" ? "down" : "up", label: raw }
}
