# wowvisual.my — Handoff

Built by Brewdes for **WOW VISUAL SDN. BHD.** Spec: `CLAUDE.md`.

- **Repo:** https://github.com/kennyling-ux/wowvisual-website
- **Live URL:** https://wowvisual.my _(once the Hostinger DNS records below are set)_
- **Vercel URL (live now):** https://wowvisual-website.vercel.app
- **Vercel project:** `kennyling-uxs-projects/wowvisual-website` (connected to GitHub: every push to `main` deploys production; other branches get preview URLs)

---

## 1. Go live (Kenny)

### 1.1 Vercel: done, except the Resend key

Already set up from the CLI:

- Project created, linked to the GitHub repo, production deployed from `main`.
- Environment variables set: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (Production + Preview), `NEXT_PUBLIC_SITE_URL=https://wowvisual.my` (Production).
- Domains `wowvisual.my` and `www.wowvisual.my` attached to the project.

Still to do:

1. ~~`RESEND_API_KEY`~~ Done (2026-10-21): set in Vercel Production (sensitive). Resend domain `wowvisual.my` verified in the **mo-frame** Resend team; create/rotate keys there.
2. ~~Primary domain~~ Done: `www.wowvisual.my` 308-redirects to `wowvisual.my` (path kept).

### 1.2 Domain (Hostinger → Vercel)

All done (2026-10-21): `@` → `76.76.21.21`, `www` → `cname.vercel-dns.com`, SSL issued; Resend records `resend._domainkey` (TXT), `rsend` + `send` (CNAME), `_dmarc` (TXT) added and verified.

1. Hostinger hPanel → Domains → wowvisual.my → **DNS records**: delete the parking `A` record on `@` and the `CNAME` on `www`, then add:
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`

   (These are what Vercel asked for on 2026-10-21. If the Domains page shows different values, use those.)
2. Resend → **Domains** → add `wowvisual.my` and copy its SPF/DKIM `TXT` (and send-subdomain `MX`) records into the same Hostinger panel. **Don't touch existing MX records** if the client uses Hostinger email.
3. Wait for propagation; Vercel issues SSL automatically and emails you when the domain verifies.

### 1.3 Launch checks (on the live URL)

- [x] Submit the contact form → email arrives at wowvisualofficial@gmail.com. (Test enquiry "Website test (Brewdes)" sent from the live site 2026-10-21; Resend status Delivered. Confirm it's in the inbox, not spam.)
- [x] With `RESEND_API_KEY` unset (e.g. a preview), the form offers WhatsApp with the message prefilled. (API returned `503 email_unavailable` before the key was added.)
- [ ] WhatsApp buttons open the chat on a phone (iOS + Android).
- [x] PageSpeed Insights on `/` and `/work` (mobile): see §3.
- [ ] Vercel → Analytics / Speed Insights show data (they only load on Vercel).
- [ ] **Google Search Console** (needs the client's Google account). Google still shows the old Hostinger parking page ("No information is available for this page"); the live site is fine for Googlebot (200, no noindex, robots allows all).
  1. search.google.com/search-console → Add property → **Domain** → `wowvisual.my`.
  2. Copy the `google-site-verification=…` TXT value → Hostinger DNS → add `TXT`, Name `@`, that value, TTL 3600 (keep the existing records).
  3. Back in Search Console → **Verify** (minutes, sometimes a few hours).
  4. Sitemaps → submit `https://wowvisual.my/sitemap.xml`.
  5. URL inspection → `https://wowvisual.my/` → **Request indexing**; repeat for `/work`.
  The result usually updates within a day or two.

---

## 2. Editing content

All copy lives in two files. Nothing is hard-coded in components.

- **`content/site.ts`**: company info, contacts, nav, hero, trust logos, statement, stats, services, process, testimonials, CTA, contact form labels/options, footer, socials.
- **`content/work.ts`**: portfolio videos.
- **`content/privacy.ts`**: privacy notice text.

**Add a video:** in `content/work.ts`, copy an entry and change:

```ts
{
  slug: "brand-launch-2026",     // unique, URL-safe
  title: "Brand Launch 2026",
  client: "Brand Name",           // "" hides it
  category: "Event",              // Commercial | Corporate | Event | Social | Motion
  youtubeId: "VQY-Bkm3nSE",       // the part after v= or youtu.be/
  year: 2026,
  featured: true,                 // show on the home page (first 6 featured are used)
},
```

Filter chips on `/work` are generated from the categories in use. Thumbnails come from YouTube automatically; to override one, put an image in `public/work/` and set `thumbnail: "/work/file.jpg"`.

**Showreel:** set `hero.showreelYoutubeId` in `content/site.ts`. Until then "Watch showreel" opens the YouTube channel.

**Hero loop:** drop `hero-loop.mp4`, `hero-loop.webm` and `hero-poster.jpg` into `public/video/` (10–15s, ≤4 MB, 1080p).

**Logo:** place `logo-dark.svg`, `logo-light.svg` and `icon.svg` in `public/brand/`, then swap the text wordmark in `components/ui/logo.tsx`, the favicon mark in `lib/icon-mark.tsx`, and the OG image wordmark in `app/opengraph-image.tsx`. Sample the logo's red into `--accent` / `--accent-hover` in `app/globals.css`, then re-run `pnpm a11y` to check contrast.

---

## 3. Quality results

**Live (production on Vercel, 2026-10-21)**, Lighthouse 12 mobile against https://wowvisual-website.vercel.app:

| Page  | Perf | A11y | Best Pr. | SEO | LCP  | CLS | TBT   |
| ----- | ---- | ---- | -------- | --- | ---- | --- | ----- |
| Home  | 93   | 100  | 100      | 100 | 3.0s | 0   | 50 ms |
| /work | 99   | 100  | 100      | 100 | 1.8s | 0   | 20 ms |

**PageSpeed Insights on https://wowvisual.my (score of record, 2026-10-21, mobile):**

| Page  | Perf | A11y | Best Pr. | SEO | LCP  | CLS | TBT    |
| ----- | ---- | ---- | -------- | --- | ---- | --- | ------ |
| Home  | 93   | 100  | 100      | 100 | 2.8s | 0   | 130 ms |
| /work | 96   | 100  | 100      | 100 | 2.7s | 0   | 70 ms  |

Earlier local runs, on production builds:

Measured on production builds (`pnpm build && pnpm start`), Lighthouse mobile (simulated Moto G, 4× CPU throttle):

| Page     | Perf  | A11y | Best Pr. | SEO | CLS |
| -------- | ----- | ---- | -------- | --- | --- |
| Home     | 83–94 | 100  | 100\*    | 100 | 0   |
| /work    | 82–93 | 100  | 100\*    | 100 | 0   |
| /privacy | 94–96 | 100  | 100      | 100 | 0   |

The Performance range spans two machines: the higher numbers are from the Phase 9 run, the lower ones from the Phase 10 check in a slower shared container. Observed LCP there was ~0.25s; the simulated 3s is mostly script-evaluation cost charged to the critical path. **PageSpeed Insights on the live URL is the score of record.**
\*Best Practices was 96 in the sandbox only because it couldn't reach `i.ytimg.com`, so thumbnails 500'd. That doesn't happen in production.

- `pnpm a11y`: axe, every page × light/dark × 375/1440: 0 violations.
- `pnpm qa`: no overflow at 320px, tap targets ≥ 44px, visible unclipped focus rings.
- Cross-browser (Phase 9): Chromium, WebKit (iPhone 13 + desktop Safari), Firefox.

---

## 4. [CONFIRM] items still using placeholder content

**`content/site.ts`**

- Company number `20261019055 (1681152-V)`: new-format SSM numbers are 12 digits; this looks one short.
- Location "Kuala Lumpur" (hero eyebrow, statement, footer tagline, SEO).
- Hero sub-line, statement, services intro, CTA sub, contact intro, footer tagline.
- Response-time promise "We reply within 1 working day" (contact + form success message).
- Showreel YouTube ID (empty) and hero loop video files.
- Trust strip client logos: none supplied, so the section is hidden. Never invent brands.
- "About the studio" link points to Services (no About page in v1).
- Image-strip stills: now 6 frames from the studio's own YouTube uploads (centre-cropped 3:4). Swap for real behind-the-scenes photos when available.
- **Stats: all numbers and descriptions.**
- Services list, order and descriptions.
- Process step descriptions.
- Testimonials: none, so the section is hidden.
- Budget ranges in the form.
- Socials: only YouTube; add Instagram / Facebook / TikTok / LinkedIn.

**`content/work.ts`**

- Category of every video (inferred from titles), client names (left empty), which 6 to feature, English titles where wanted. IDs and titles are real (from the channel).

**`content/privacy.ts`**

- Plain-language PDPA draft: have the client or their adviser review it, including the retention wording.

**`lib/seo.ts`**

- Default title/description location; `availableLanguage`; upgrade `Organization` → `LocalBusiness` once an address is confirmed.

**Brand (`app/globals.css`, `components/ui/logo.tsx`, `lib/icon-mark.tsx`, `app/opengraph-image.tsx`)**

- `--accent` red is a placeholder until sampled from the logo; text wordmark, temporary favicon mark and OG wordmark until logo files arrive.

---

## 5. Known limitations & follow-ups

- No logo files yet, so the site uses a text wordmark and generated favicon.
- Contact rate limit is in-memory per serverless instance (fine for a low-traffic form; use Upstash/Vercel KV if spam becomes an issue).
- Page JS is mostly React + Motion + Lenis. If field data shows high INP on low-end phones, the next step is lazy-loading below-the-fold animated sections.
- Content is structured for i18n (all copy in `/content`) if a BM / Chinese version is wanted later.
- Dev tip: if the project folder path contains `[` `]`, Turbopack may miss `globals.css` edits. Restart `pnpm dev` after deleting `.next/dev`.
