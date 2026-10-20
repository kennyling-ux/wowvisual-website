import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

// Dynamic OG image (§11): wordmark + headline, dark theme. [CONFIRM] swap the
// wordmark for the logo once /public/brand files are supplied.
export const alt = `${site.name} — ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (w: 500 | 600) =>
  readFile(
    join(process.cwd(), `node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff`),
  );

export default async function Image() {
  const [medium, semibold] = await Promise.all([font(500), font(600)]);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 3, background: "#d92d20" }} />
        <span>WOW</span>
        <span style={{ fontWeight: 500, marginLeft: -6 }}>VISUAL</span>
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
