// src/lib/format.check.ts — runnable self-check. `npx tsx src/lib/format.check.ts`
import { formatDate, formatTime, formatRange, parseLeadingNumber, formatLike, toMinutes, localISODate } from "./format"

const fail = (m: string, a: unknown, b: unknown) => {
  console.error(`FAIL ${m}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`)
  throw new Error(m)
}
const eq = (a: unknown, b: unknown, m: string) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) fail(m, a, b)
}

eq(formatDate("2026-08-05"), "5 Aug 2026", "formatDate today")
eq(formatDate("2026-06-12"), "12 Jun 2026", "formatDate past event")
eq(formatTime("06:00"), "6:00 am", "formatTime am")
eq(formatTime("22:00"), "10:00 pm", "formatTime pm")
eq(formatTime("00:30"), "12:30 am", "formatTime midnight")
eq(formatTime("12:00"), "12:00 pm", "formatTime noon")
eq(formatRange({ dayOfWeek: 1, openTime: "05:00", closeTime: "23:00" }), "Mon · 5:00 am – 11:00 pm", "formatRange")
eq(toMinutes("06:30"), 390, "toMinutes")
eq(localISODate(new Date(2026, 7, 5)), "2026-08-05", "localISODate")

eq(parseLeadingNumber("1,248+")!.n, 1248, "parse grouped")
eq(parseLeadingNumber("1,248+")!.suffix, "+", "parse suffix")
eq(parseLeadingNumber("12,540+")!.n, 12540, "parse grouped large")
eq(parseLeadingNumber("3.6")!.n, 3.6, "parse decimal")
eq(parseLeadingNumber("3.6")!.decimals, 1, "parse decimals count")
eq(parseLeadingNumber("24")!.n, 24, "parse plain")
eq(parseLeadingNumber("Basketball"), null, "parse non-numeric -> null")

eq(formatLike(1248, parseLeadingNumber("1,248+")!), "1,248+", "formatLike round-trip")
eq(formatLike(3.6, parseLeadingNumber("3.6")!), "3.6", "formatLike decimal")
eq(formatLike(24, parseLeadingNumber("24")!), "24", "formatLike plain")

console.log("format.ts ok")
