import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

// Dynamic OG image (§11): logo + headline, dark theme.
export const alt = `${site.name} — ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts live in the repo (not node_modules) so they're bundled with the route
// on Vercel; read once at module scope.
const font = (w: 500 | 600) =>
  readFile(join(process.cwd(), `assets/fonts/inter-latin-${w}-normal.woff`));
const [medium, semibold] = await Promise.all([font(500), font(600)]);

// Brand mark + wordmark in white, as data URIs for <img>
const brandSvg = async (name: string) => {
  const svg = (await readFile(join(process.cwd(), `public/brand/${name}.svg`), "utf8")).replace(
    'fill="#0a0a0a"',
    'fill="#ffffff"',
  );
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};
const [markSrc, wordSrc] = await Promise.all([
  brandSvg("wow-visual-mark"),
  brandSvg("wow-visual-wordmark"),
]);

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0b0b",
        backgroundImage:
          "radial-gradient(circle at 85% 18%, rgba(255,122,61,0.45), transparent 42%), radial-gradient(circle at 72% 34%, rgba(217,45,32,0.55), transparent 40%), radial-gradient(circle at 8% 100%, rgba(217,45,32,0.35), transparent 45%)",
        color: "white",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={markSrc} width={70} height={80} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={wordSrc} width={218} height={32} style={{ marginBottom: 6 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            maxWidth: 900,
          }}
        >
          {hero.headline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Video production studio · {site.location} · wowvisual.my
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: medium, style: "normal", weight: 500 },
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
