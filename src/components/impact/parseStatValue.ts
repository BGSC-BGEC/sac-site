// src/components/impact/parseStatValue.ts
export function parseStatValue(value: string) {
  const m = /^(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return null;
  const digits = m[1].replace(/,/g, "");
  const dot = digits.indexOf(".");
  return { target: Number(digits), suffix: m[2], decimals: dot < 0 ? 0 : digits.length - dot - 1 };
}
