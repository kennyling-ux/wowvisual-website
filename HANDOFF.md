# wowvisual.my — Handoff

Built by Brewdes for **WOW VISUAL SDN. BHD.** Spec: `CLAUDE.md`.

- **Repo:** https://github.com/kennyling-ux/wowvisual-website
- **Live URL:** https://wowvisual.my _(after the Vercel import + DNS steps below)_

---

## 1. Go live (Kenny)

### 1.1 Vercel

1. Merge this branch into `main`.
2. Vercel → **Add New → Project** → import `kennyling-ux/wowvisual-website`. Vercel detects Next.js and pnpm; keep the defaults.
3. **Settings → Environment Variables** (Production + Preview):

   | Variable               | Value                                                       |
   | ---------------------- | ----------------------------------------------------------- |
   | `RESEND_API_KEY`       | from resend.com (leave empty → form falls back to WhatsApp) |
   | `CONTACT_TO_EMAIL`     | `wowvisualofficial@gmail.com`                               |
   | `CONTACT_FROM_EMAIL`   | `hello@wowvisual.my` (must be on a Resend-verified domain)  |
   | `NEXT_PUBLIC_SITE_URL` | `https://wowvisual.my`                                      |

4. Deploy. From then on every push to `main` deploys production; other branches get preview URLs.

### 1.2 Domain (Hostinger → Vercel)

1. Vercel → Project → **Settings → Domains** → add `wowvisual.my` and `www.wowvisual.my`; make `wowvisual.my` primary and redirect `www` to it.
2. Hostinger hPanel → Domains → wowvisual.my → **DNS records**: delete any parking `A` record on `@` and `CNAME` on `www`, then add what Vercel shows — typically:
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. Resend → **Domains** → add `wowvisual.my` and copy its SPF/DKIM `TXT` (and send-subdomain `MX`) records into the same Hostinger panel. **Don't touch existing MX records** if the client uses Hostinger email.
4. Wait for propagation; Vercel issues SSL automatically.

### 1.3 Launch checks (on the live URL)

- [ ] Submit the contact form → email arrives at wowvisualofficial@gmail.com.
- [ ] With `RESEND_API_KEY` unset (e.g. a preview), the form offers WhatsApp with the message prefilled.
- [ ] WhatsApp buttons open the chat on a phone (iOS + Android).
- [ ] Run https://pagespeed.web.dev on `/` and `/work` (mobile) and note the scores. See §3.
- [ ] Vercel → Analytics / Speed Insights show data (they only load on Vercel).

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
- Image-strip stills: placeholder cinematic frames.
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
