// src/components/charts/chartTokens.ts
export const chart = {
  grid: "var(--color-line)",
  axis: "var(--color-fg-faint)",
  tick: { fill: "var(--color-fg-muted)", fontSize: 13, fontFamily: "var(--font-sans)" },
  cursor: { stroke: "var(--color-line-strong)", strokeWidth: 1 },
  series: ["var(--color-volt)", "var(--color-teal-500)", "var(--color-teal-300)"],
  dur: { std: 420, slow: 720, fast: 180 },
} as const;
