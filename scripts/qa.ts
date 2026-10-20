/**
 * §10.2 checks that screenshots can't show: overflow down to 320px, tap targets
 * ≥ 44px at 375px, and a visible, unclipped focus ring on everything Tab reaches.
 * Usage: pnpm qa [baseUrl]
 */
import { chromium } from "@playwright/test";

const ROUTES = ["/", "/work", "/privacy", "/this-page-does-not-exist"];

async function main() {
  const base = process.argv[2] ?? "http://localhost:3000";
  const browser = await chromium.launch();
  let failures = 0;

  // 1. No horizontal scroll at 320px
  {
    const ctx = await browser.newContext({
      viewport: { width: 320, height: 700 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    for (const r of ROUTES) {
      await page.goto(new URL(r, base).toString(), { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) failures++;
      console.log(`${overflow > 0 ? "✗" : "✓"} 320px ${r}: overflow ${overflow}px`);
    }
    await ctx.close();
  }

  // 2. Tap targets (block-level controls; inline text links are exempt)
  {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    for (const r of ["/", "/work"]) {
      await page.goto(new URL(r, base).toString(), { waitUntil: "networkidle" });
      const small = await page.evaluate(() =>
        [
          ...document.querySelectorAll<HTMLElement>(
            "a[href], button, select, input:not([type=checkbox]), textarea",
          ),
        ]
          .filter((e) => {
            const s = getComputedStyle(e);
            if (
              s.display === "none" ||
              s.visibility === "hidden" ||
              e.closest("[aria-hidden=true]")
            )
              return false;
            if (e.matches("p a, label a")) return false;
            const rect = e.getBoundingClientRect();
            return rect.width > 0 && rect.height < 44;
          })
          .map(
            (e) =>
              `${e.tagName} "${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(e.getBoundingClientRect().height)}px`,
          ),
      );
      if (small.length) failures++;
      console.log(
        `${small.length ? "✗" : "✓"} tap targets ${r}${small.length ? ": " + small.join(", ") : ""}`,
      );
    }
    await ctx.close();
  }

  // 3. Focus ring visible and not clipped by an overflow ancestor
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    for (const r of ["/", "/work"]) {
      await page.goto(new URL(r, base).toString(), { waitUntil: "networkidle" });
      const issues = new Set<string>();
      let checked = 0;
      for (let i = 0; i < 100; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const e = document.activeElement as HTMLElement | null;
          if (!e || e === document.body) return null;
          const s = getComputedStyle(e);
          const ring =
            (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2) ||
            s.boxShadow !== "none";
          const offset = Math.max(0, parseFloat(s.outlineOffset) || 0) + 2;
          const rect = e.getBoundingClientRect();
          let clippedBy = "";
          for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
            const as = getComputedStyle(a);
            if (!/(hidden|auto|scroll|clip)/.test(as.overflowX + as.overflowY)) continue;
            const ar = a.getBoundingClientRect();
            if (
              rect.top - offset < ar.top ||
              rect.bottom + offset > ar.bottom ||
              rect.left - offset < ar.left ||
              rect.right + offset > ar.right
            ) {
              clippedBy = String(a.className).slice(0, 50);
              break;
            }
          }
          return {
            label: (e.getAttribute("aria-label") || e.textContent || e.tagName).trim().slice(0, 40),
            ring,
            clippedBy,
            inset: (parseFloat(s.outlineOffset) || 0) < 0,
          };
        });
        if (!info) continue;
        checked++;
        if (!info.ring || (info.clippedBy && !info.inset))
          issues.add(
            `${info.label}${info.ring ? "" : " (no ring)"}${info.clippedBy ? ` (clipped by .${info.clippedBy})` : ""}`,
          );
      }
      if (issues.size) failures++;
      console.log(
        `${issues.size ? "✗" : "✓"} focus rings ${r}: ${checked} stops${issues.size ? " — " + [...issues].join("; ") : ""}`,
      );
    }
    await ctx.close();
  }

  await browser.close();
  process.exitCode = failures ? 1 : 0;
}

main();
