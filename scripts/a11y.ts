/**
 * Automated accessibility audit (§10.2 / WCAG 2.2 AA) with axe-core.
 * Usage: pnpm a11y [baseUrl]  — checks every page in light + dark at 375 and 1440.
 */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const ROUTES = ["/", "/work", "/privacy", "/this-page-does-not-exist"];

async function main() {
  const base = process.argv[2] ?? "http://localhost:3000";
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
  const seen = new Map<
    string,
    { impact: string; help: string; nodes: Set<string>; where: Set<string> }
  >();

  for (const theme of ["light", "dark"] as const) {
    for (const width of [375, 1440]) {
      // Reduced motion renders final visual states, so contrast is measured accurately
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await context.newPage();
      for (const route of ROUTES) {
        await page.goto(new URL(route, base).toString(), { waitUntil: "networkidle" });
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 40));
          }
          window.scrollTo(0, 0);
        });
        // The contact form is lazy-loaded near the viewport; audit it once mounted.
        if (await page.locator("#contact").count()) await page.locator("#contact form").waitFor();
        await page.waitForTimeout(300);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
          .analyze();
        for (const v of results.violations) {
          const entry = seen.get(v.id) ?? {
            impact: v.impact ?? "",
            help: v.help,
            nodes: new Set(),
            where: new Set(),
          };
          v.nodes
            .slice(0, 6)
            .forEach((n) =>
              entry.nodes.add(
                n.target.join(" ") +
                  (n.any[0]?.message ? ` — ${n.any[0].message.slice(0, 120)}` : ""),
              ),
            );
          entry.where.add(`${route}@${width}/${theme}`);
          seen.set(v.id, entry);
        }
      }
      await context.close();
    }
  }
  await browser.close();

  if (!seen.size) {
    console.log("✓ No axe violations.");
    return;
  }
  for (const [id, v] of seen) {
    console.log(`\n✗ ${id} [${v.impact}] ${v.help}\n  where: ${[...v.where].join(", ")}`);
    [...v.nodes].slice(0, 8).forEach((n) => console.log("   • " + n));
  }
  process.exitCode = 1;
}

main();
