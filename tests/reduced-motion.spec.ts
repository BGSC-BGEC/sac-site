import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("content is present without scroll trigger firing", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  // Every band's heading is visible in the DOM.
  for (const id of ["about", "activities", "events", "people", "gallery", "wins", "join"]) {
    const section = page.locator(`#${id}`);
    const heading = section.getByRole("heading", { level: 2 });
    if (await heading.count() > 0) {
      await expect(heading.first()).toBeVisible();
    }
  }
});

test("the #focus statement is visible (no pin hides content)", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("#focus").scrollIntoViewIfNeeded();
  await expect(page.locator("#focus").getByRole("heading", { level: 2 })).toBeVisible();
});

test("counters show final value immediately", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("#impact").scrollIntoViewIfNeeded();
  await expect(page.locator("#impact")).toContainText("1,248+");
});
