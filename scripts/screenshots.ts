/**
 * UX Quality Gate screenshots (§10.1).
 * Usage: pnpm screenshots [baseUrl] [route ...]
 *   pnpm screenshots                         -> http://localhost:3000, default routes
 *   pnpm screenshots http://localhost:3000 /work
 * Output: /screenshots/{route}-{width}-{theme}.png + -fold.png (git-ignored)
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const WIDTHS = [375, 768, 1024, 1440] as const;
const THEMES = ["light", "dark"] as const;
const DEFAULT_ROUTES = ["/", "/work", "/privacy", "/this-page-does-not-exist"];

async function main() {
  const [baseArg, ...routeArgs] = process.argv.slice(2);
  const base = baseArg ?? "http://localhost:3000";
  const routes = routeArgs.length ? routeArgs : DEFAULT_ROUTES;
  const outDir = path.join(process.cwd(), "screenshots");
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
  const issues: string[] = [];

  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({
        viewport: { width, height: width < 768 ? 812 : 900 },
        colorScheme: theme,
        deviceScaleFactor: 1,
      });
      // next-themes reads localStorage("theme") before paint
      await context.addInitScript((t) => {
        try {
          localStorage.setItem("theme", t);
        } catch {}
      }, theme);
      const page = await context.newPage();

      for (const route of routes) {
        // 404 route returns a 404 status — that's expected
        await page.goto(new URL(route, base).toString(), { waitUntil: "networkidle" });
        // Scroll through so whileInView / lazy content renders, then return to top
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.7;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 400));
        });

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (overflow > 0)
          issues.push(`${route} @${width} ${theme}: horizontal overflow ${overflow}px`);

        const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
        const file = path.join(outDir, `${slug}-${width}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: true });
        // Above-the-fold capture (checks primary CTA visibility)
        await page.screenshot({ path: file.replace(/\.png$/, "-fold.png") });
        console.log("✓", path.relative(process.cwd(), file));
      }
      await context.close();
    }
  }

  await browser.close();
  if (issues.length) {
    console.log("\nIssues:\n" + issues.map((i) => "  • " + i).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("\nNo horizontal overflow detected.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
