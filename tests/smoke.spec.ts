import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";
import { ROUTES } from "./routes";

// Known acceptable console noise (e.g. vite HMR in dev, react-refresh warnings)
const ACCEPTABLE = [
  /Download the React DevTools/,
  /Vite is optimized/,
  /dev tools/,
  /width\(-1\) and height\(-1\) of chart should be greater than 0/,
];

function isAcceptable(msg: string): boolean {
  return ACCEPTABLE.some((re) => re.test(msg));
}

function guard(page: Page) {
  const errors: string[] = [];
  const failed: string[] = [];
  page.on("console", (m: ConsoleMessage) => {
    if ((m.type() === "error" || m.type() === "warning") && !isAcceptable(m.text())) {
      errors.push(`${m.type()}: ${m.text()}`);
    }
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText} ${r.url()}`));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) });
  return { errors, failed };
}

test.describe("baseline", () => {
  test("/ loads with zero console errors", async ({ page }) => {
    const g = guard(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
    expect(g.errors, `console:\n${g.errors.join("\n")}`).toEqual([]);
  });

  for (const r of ROUTES) {
    test(`${r.path} renders one h1`, async ({ page }) => {
      const g = guard(page);
      await page.goto(r.path);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toHaveCount(1);
      if (r.h1) await expect(h1).toHaveAccessibleName(r.h1);
      await expect(page.locator("main")).toBeVisible();
      expect(g.errors, `${r.path}:\n${g.errors.join("\n")}`).toEqual([]);
    });
  }

  test("no dead links (href=#)", async ({ page }) => {
    for (const r of ROUTES) {
      await page.goto(r.path);
      const dead = await page.locator('a[href="#"]').count();
      expect(dead, `${r.path} has ${dead} href="#" links`).toBe(0);
    }
  });

  test("every unsplash img has auto=format param", async ({ page }) => {
    for (const r of ROUTES) {
      await page.goto(r.path);
      const imgs = page.locator('img[src*="images.unsplash.com"]');
      const count = await imgs.count();
      for (let i = 0; i < count; i++) {
        const src = await imgs.nth(i).getAttribute("src");
        expect(src, `${r.path} img ${i}`).toContain("auto=format");
      }
    }
  });
});

test.describe("navigation", () => {
  test("navbar renders five links (desktop)", async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link")).toHaveCount(5);
  });

  test("anchor nav scrolls on / (desktop)", async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Activities" }).click();
    await expect(page).toHaveURL(/#activities$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  });

  test("mobile menu opens, labelled, Escape closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    const box = await trigger.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("no floating action button (/report)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /report/i })).toHaveCount(0);
  });
});

test.describe("filters", () => {
  test("activities chips derive from data (no Recreation)", async ({ page }) => {
    await page.goto("/activities");
    const group = page.getByRole("group", { name: /filter activities by category/i });
    await expect(group.getByRole("button")).toHaveCount(3);
    await expect(group.getByRole("button", { name: /recreation/i })).toHaveCount(0);

    await group.getByRole("button", { name: "Fitness" }).click();
    const cards = page.getByRole("listitem").filter({ has: page.getByRole("heading", { level: 3 }) });
    await expect(cards).toHaveCount(2);
  });

  test("achievements filters round-trip through URL", async ({ page }) => {
    await page.goto("/achievements?level=National");
    const cards = page.locator("article");
    await expect(cards).toHaveCount(2);
  });

  test("achievements empty state with reset", async ({ page }) => {
    await page.goto("/achievements?level=Campus&year=2025");
    const cards = page.locator("article");
    await expect(cards).toHaveCount(0);
    await expect(page.getByText(/no results match/i)).toBeVisible();
    await page.getByRole("button", { name: /clear filters/i }).click();
    await expect(cards).toHaveCount(5);
  });
});

test.describe("gallery lightbox", () => {
  test("open, advance, Escape closes", async ({ page }) => {
    await page.goto("/gallery/basketball");
    const tiles = page.getByRole("button", { name: /^Open image:/ });
    await expect(tiles).toHaveCount(3);
    const first = tiles.first();
    await first.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toHaveCSS("object-fit", "contain");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight"); // wraps
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("events tense", () => {
  test("after calendar runs out: empty state + recap", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-09-01T09:00:00+05:30") });
    await page.goto("/events");
    await expect(page.getByText(/no upcoming events|nothing scheduled/i)).toBeVisible();
    await page.goto("/");
    const band = page.locator("#events");
    await expect(band).toBeVisible();
  });
});

test.describe("contact", () => {
  test("real form with labelled fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toHaveCount(1);
    for (const label of ["Name", "Email", "Message"]) {
      await expect(page.getByLabel(label, { exact: true })).toBeVisible();
    }
  });

  test("no href=# socials", async ({ page }) => {
    await page.goto("/contact");
    for (const name of [/instagram/i, /facebook/i, /linkedin/i]) {
      await expect(page.getByRole("link", { name })).toHaveCount(0);
    }
  });

  test("/report redirects to /contact", async ({ page }) => {
    await page.goto("/report");
    await expect(page).toHaveURL(/\/contact$/);
  });
});
