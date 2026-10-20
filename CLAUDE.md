# CLAUDE.md — WOW VISUAL Website Build Spec

> This file is the single source of truth for building **wowvisual.my**.
> Read it fully before writing any code. Re-read the **UX Quality Gate** (§10) before marking any phase done.
> Anything marked **[CONFIRM]** is placeholder content — build it so it's easy to swap, and list every [CONFIRM] item in the final handoff summary.

---

## 1. Project overview

|                      |                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **Client**           | WOW VISUAL SDN. BHD.                                                                                     |
| **Company No.**      | 20261019055 (1681152-V) **[CONFIRM — new-format SSM numbers are 12 digits; this looks one digit short]** |
| **Contact person**   | Adrian Poon                                                                                              |
| **Phone / WhatsApp** | +60 11-1078 1678 → `https://wa.me/601110781678`                                                          |
| **Email**            | wowvisualofficial@gmail.com                                                                              |
| **Portfolio**        | YouTube — https://youtube.com/@wowvisualofficial                                                         |
| **Domain**           | wowvisual.my (registered at Hostinger)                                                                   |
| **Built by**         | Brewdes (Kenny)                                                                                          |

**What the site is for:** a cinematic portfolio + lead-generation site for a Malaysian video production / visual content studio. The #1 job is to make visitors watch the work and then contact the studio (WhatsApp first, form second).

**Primary audience:** Malaysian brands, SMEs, marketing managers and agencies looking for commercial, corporate, event and social video.

**Primary conversions (in order):** WhatsApp click → contact form submit → email click.

---

## 2. Tech stack (use exactly this unless blocked)

- **Next.js** (latest stable, App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config, design tokens as CSS variables)
- **Motion** (`motion/react`, formerly Framer Motion) for UI animation
- **Lenis** for smooth scrolling (disabled under `prefers-reduced-motion`)
- **next-themes** for light/dark mode (class strategy)
- **next/font/google → Inter** (variable font, `display: swap`, subset latin)
- **lucide-react** for icons
- **Resend** for the contact form email (API route), with WhatsApp fallback
- **zod** + **react-hook-form** for form validation
- **@vercel/analytics** + **@vercel/speed-insights**
- **Playwright** (dev dependency) for screenshot-based UX review (§10)
- Package manager: **pnpm**

No CMS for v1. All content lives in typed files under `/content` so it can be edited in one place.

---

## 3. Building flow

**Claude Code builds → pushes to GitHub → Vercel deploys.**

1. Init the project, commit early, work in phases (§12). Commit at the end of every phase with a conventional commit message (`feat:`, `fix:`, `style:`, `chore:`).
2. GitHub: if `gh` is installed and authenticated, create a **private** repo named `wowvisual-website` and push `main`. If not authenticated, stop and tell Kenny the exact commands to run.
3. Vercel: Kenny imports the repo in the Vercel dashboard (or use `vercel` CLI if already logged in). Every push to `main` auto-deploys production; other branches get preview URLs.
4. Never commit secrets. Use `.env.local` locally and add an `.env.example` listing every variable.
5. Run `pnpm build` and `pnpm lint` with zero errors before every push.

---

## 4. Design direction

### 4.1 What to take from the three references

| Reference                                | Take this                                                                                                                                                                                                                                                                                                                                  | Don't take this                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| **Stodio** (red/white agency)            | Rounded inset hero card with blurred motion imagery; huge tight-tracked headline; small red-square eyebrow labels ("■ Who we are"); logo strip under hero; statement paragraph where the end of the sentence is greyed out; horizontal strip of rounded image cards; 4-column stats with dotted dividers; services list with numbered rows | Fake claims like "1% / 100%" — our stats must be real |
| **Folioblox** (orange creative director) | Warm cinematic hero lighting; numbered service tags along the bottom of the hero (#01 #02 …); split layout (headline left, short paragraph + CTA right); pill CTA with circular arrow icon; dark section flowing seamlessly out of the hero                                                                                                | Overly generic placeholder logos                      |
| **Frames** (film production)             | Film-studio credibility: festival/award laurel row, giant scrolling marquee strip ("CREATIVE DIRECTION — FILM PRODUCTION — DIGITAL CONTENT"), 3-up service cards with real behind-the-scenes photos, "Featured Productions" 2-column video grid with play buttons and titles over the thumbnail                                            | Crowded nav, tiny low-contrast body text, lorem ipsum |

**Overall feel:** cinematic, confident, minimal, dark-first, lots of negative space, big type, motion that feels like film editing (cuts, reveals, parallax) — never bouncy or gimmicky.

### 4.2 Colour tokens

Define as CSS variables on `:root` (light) and `.dark` (dark). Components must only use tokens, never raw hex.

| Token            | Light     | Dark      | Use                                         |
| ---------------- | --------- | --------- | ------------------------------------------- |
| `--bg`           | `#FAFAF9` | `#0A0A0A` | page background                             |
| `--surface`      | `#FFFFFF` | `#141414` | cards, sections                             |
| `--surface-2`    | `#F2F2F0` | `#1C1C1C` | hover, inputs                               |
| `--fg`           | `#0A0A0A` | `#F5F5F4` | primary text                                |
| `--fg-muted`     | `#5C5C5C` | `#A3A3A3` | secondary text (must pass 4.5:1)            |
| `--fg-faint`     | `#A3A3A3` | `#525252` | greyed-out statement words, decoration only |
| `--border`       | `#E7E5E4` | `#262626` | dividers                                    |
| `--accent`       | `#D92D20` | `#E5372B` | CTAs, eyebrow squares, highlights           |
| `--accent-hover` | `#B42318` | `#F04438` | hover state                                 |
| `--on-accent`    | `#FFFFFF` | `#FFFFFF` | text on accent                              |

**Accent is a placeholder [CONFIRM].** When the logo files are in `/public/brand`, sample the logo's primary colour and replace `--accent` with it — then re-check that white text on the accent still passes 4.5:1 and adjust lightness if not.

**Hero card exception:** the hero sits on video, so it always uses a dark overlay and white text in _both_ themes.

### 4.3 Typography — Inter only

- Load Inter via `next/font` as a variable font. Use `font-feature-settings: "ss01", "cv11"` for a cleaner look, and `tabular-nums` for stats.
- Scale (fluid with `clamp`):
  - Display (hero): `clamp(2.75rem, 7vw, 6.5rem)`, weight 600, line-height 0.95, letter-spacing `-0.045em`
  - H2: `clamp(2rem, 4.5vw, 3.75rem)`, weight 600, line-height 1.05, letter-spacing `-0.035em`
  - H3: `clamp(1.25rem, 2vw, 1.75rem)`, weight 600, tracking `-0.02em`
  - Body L: 18–20px, line-height 1.6
  - Body: 16px, line-height 1.6 (never smaller than 16px for paragraphs)
  - Eyebrow / label: 12–13px, weight 500, uppercase optional, tracking `0.02em`, preceded by a 8×8px accent square
- Max line length for paragraphs: ~65ch.

### 4.4 Layout, spacing, shape

- Container: max-width 1440px, side padding `clamp(16px, 4vw, 48px)`.
- Section vertical padding: `clamp(80px, 12vw, 160px)`.
- 12-column grid on desktop, single column on mobile.
- Radius: hero card and media cards `24px` (mobile `16px`); buttons fully rounded pills; inputs `12px`.
- Buttons: pill shape, 48px min height, label + circular arrow icon (Folioblox style). Primary = accent, secondary = outline/surface.
- Imagery: cinematic, slightly desaturated stills; consistent aspect ratios (16:9 for work, 3:4 for the image strip).

---

## 5. Sitemap

```
/              Home (one long page with anchored sections)
/work          Full portfolio grid with category filters
/privacy       Short privacy notice (PDPA 2010) — needed because the form collects personal data
/not-found     Custom 404 in the same style
```

Nav links: **Work · Services · About · Process · Contact** (anchors on home; "Work" goes to `/work`).

---

## 6. Home page — section by section

Build each section as its own component in `/components/sections/`.

### 6.1 Navigation

- Left: WOW VISUAL logo (SVG; swaps light/dark variant by theme). Right: links, **theme toggle** (sun/moon, animated icon swap), and a pill CTA **"Start a project"** that scrolls to Contact.
- Sticky; transparent over the hero, becomes `--bg` at 80% opacity + backdrop blur + bottom border after 40px scroll. Hides on scroll down, reappears on scroll up.
- Mobile: hamburger → full-screen overlay menu, large staggered links, CTA + WhatsApp at the bottom, closes on link tap and Esc, locks body scroll.

### 6.2 Hero (rounded inset card — Stodio/Folioblox)

- Inset card with 24px radius and page-colour gutter around it, ~88vh on desktop, ~80svh on mobile.
- Background: muted, looping, autoplay `playsinline` **showreel cut** (`/public/video/hero-loop.mp4` + `.webm`, 10–15s, ≤4MB, 1080p) with a `poster` image. Dark gradient overlay (bottom and left) for legibility. If the file is missing, fall back to the poster image + subtle animated grain/gradient. **[CONFIRM — Kenny/client to supply the loop]**
- Eyebrow: "■ Video Production Studio · Kuala Lumpur" **[CONFIRM location]**
- Headline (display size, word-by-word mask reveal): **"Visuals that make people say wow."**
- Right side (desktop) / below (mobile): short line — "Commercials, corporate films, events and social content for brands that want to be remembered." **[CONFIRM]**
- CTAs: primary **"Watch showreel"** (opens video modal with the full YouTube showreel) · secondary **"Start a project"**.
- Bottom row of the card: numbered service tags `#01 Concept  #02 Production  #03 Post-production  #04 Delivery`.
- Subtle scroll-linked effect: as the user scrolls, the card scales from 1 → 0.96 and the video parallaxes slightly.

### 6.3 Trust strip

- Left label: "Trusted by brands across Malaysia". Right: client logos in an infinite marquee, monochrome (`--fg-muted`), full colour on hover, pauses on hover. **[CONFIRM client logos — do not invent brands]**
- If no logos are supplied, replace with a festival/award laurel row (Frames style) if they have awards, otherwise skip straight to 6.4.

### 6.4 Big marquee strip (Frames)

- Full-width, oversized text scrolling horizontally: `COMMERCIALS — CORPORATE FILMS — EVENT COVERAGE — SOCIAL CONTENT — MOTION GRAPHICS —`
- Scroll velocity nudges marquee speed/direction (subtle). Thin top/bottom border.

### 6.5 About statement (Stodio)

- Eyebrow "■ Who we are".
- Large statement: "We're a Kuala Lumpur production studio turning ideas into films that sell, inform and move people." **[CONFIRM]**
- Scroll-linked reveal: words fill from `--fg-faint` to `--fg` as the paragraph scrolls through the viewport.
- Right-aligned text link "→ About the studio" with an animated underline.

### 6.6 Image strip (Stodio)

- Horizontal row of 4–6 rounded 3:4 stills (behind-the-scenes / frames from their videos), slightly overflowing the viewport edges. On scroll the row drifts horizontally (parallax). On mobile: native horizontal scroll-snap. **[CONFIRM images]**

### 6.7 Stats (Stodio)

- 4 columns with dotted top dividers, count-up when in view (runs once):
  - `{N}+` Projects delivered · `{N}+` Brands served · `{N}+` Years of experience · `{N}` Videos on YouTube **[CONFIRM all numbers — no made-up stats]**
- Each has a one-line supporting description.

### 6.8 Featured work (Frames "Featured Productions")

- Eyebrow "■ Selected work", H2 "Featured productions", link "View all work →" to `/work`.
- 2-column grid (1 column on mobile) of 4–6 video cards. Card = 16:9 thumbnail, play button, title, client, category tag.
- Hover (desktop): thumbnail scales to 1.04, overlay darkens, play button grows; optional custom cursor that reads "Play" over cards (desktop + fine pointer only).
- Click → **video modal** (see §7.2). Data from `/content/work.ts`.

### 6.9 Services (Stodio "Our Services" + Frames cards)

- Eyebrow "■ Services", H2 "What we make", short intro on the right.
- Numbered rows (01–06), each row: number, service name, one-line description, arrow. On desktop hover, a small image/video preview follows the cursor; on mobile, rows are an accessible accordion with the image inside.
- Services **[CONFIRM list with client]**:
  1. TVC & commercial video
  2. Corporate & brand films
  3. Event coverage & highlights
  4. Social media content (Reels, TikTok, Shorts)
  5. Motion graphics & animation
  6. Product & lifestyle photography

### 6.10 Process

- 4 steps in a row (stacked on mobile) with a line that draws as you scroll: **Brief & concept → Pre-production → Production / shoot → Post & delivery**. Each with a 1–2 sentence description.

### 6.11 Testimonials (only if supplied) **[CONFIRM]**

- Simple quote carousel, keyboard accessible, auto-advance off by default.

### 6.12 Final CTA band

- Huge headline: **"Let's make something wow."** Two buttons: **WhatsApp us** (prefilled message) and **Email us**. Subtle animated accent glow behind the headline.

### 6.13 Contact

- Two columns: left = direct contacts (Adrian Poon, WhatsApp, email, response-time promise "We reply within 1 working day" **[CONFIRM]**), right = form.
- Form fields: Name*, Company, Email*, Phone/WhatsApp*, Service (select), Budget range (select: Below RM5k / RM5k–15k / RM15k–50k / RM50k+) **[CONFIRM ranges]**, Project details* (textarea), PDPA consent checkbox* linking to `/privacy`.
- Behaviour: inline validation on blur, clear error text under each field, disabled + spinner while sending, success state that replaces the form ("Thanks, {name} — we'll be in touch within 1 working day"), error state with a WhatsApp fallback button that carries the message content. Honeypot field + basic rate limit on the API route.
- Sends via `/app/api/contact/route.ts` → Resend → `CONTACT_TO_EMAIL`.

### 6.14 Footer

- Logo, one-line tagline, nav links, contact details, socials (YouTube **+ [CONFIRM Instagram / Facebook / TikTok / LinkedIn]**), legal line: `© {current year} WOW VISUAL SDN. BHD. ({company no.}). All rights reserved.` + Privacy link + "Back to top" button.
- Floating **WhatsApp button** bottom-right on mobile (appears after the hero, hides when the contact section is in view).

---

## 7. Work page & video handling

### 7.1 `/work`

- Hero: H1 "Our work", short intro.
- Filter chips: All · Commercial · Corporate · Event · Social · Motion (derived from data). Filter animates with Motion `layout` (cards reflow smoothly). Filter state reflected in the URL (`?category=event`) so it's shareable.
- Grid: 3 columns desktop / 2 tablet / 1 mobile. Same card + modal as home.

### 7.2 Video modal

- Use a **YouTube facade**: show the thumbnail (`https://i.ytimg.com/vi/{id}/maxresdefault.jpg`, fallback `hqdefault.jpg`) and only load the iframe (`youtube-nocookie.com/embed/{id}?autoplay=1&rel=0`) after the user clicks. Never load iframes on page load.
- Modal: focus trapped, closes on Esc / backdrop click / close button, returns focus to the triggering card, locks scroll, scales in from the card position.
- Add `i.ytimg.com` to `next.config` image remote patterns.

### 7.3 Content data (`/content/work.ts`)

```ts
export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  category: "Commercial" | "Corporate" | "Event" | "Social" | "Motion";
  youtubeId: string; // [CONFIRM] from the YouTube channel
  year?: number;
  featured?: boolean; // shows on home
  thumbnail?: string; // optional custom thumbnail in /public/work
};
```

Seed with 6 placeholder items clearly marked `// [CONFIRM]`. Kenny will paste real YouTube IDs from the channel.

---

## 8. Content & assets

- `/content/site.ts` — company info, contacts, nav, hero copy, stats, services, process, socials. **All copy lives here, not hard-coded in components.**
- `/content/work.ts` — portfolio items.
- `/public/brand/` — logo files from the client's Google Drive folder "Wow Visual Logo" (https://drive.google.com/drive/folders/1721pfuZTLZsOVaaizFzM7hlSHjJSnaNR). Kenny will download and place them here. Needed: `logo-dark.svg` (for light backgrounds), `logo-light.svg` (for dark backgrounds), `icon.svg` / square mark. If only PNGs exist, use them via `next/image` and note in the handoff that SVGs are preferred.
- Generate favicon set + `apple-icon` from the square mark (Next.js file conventions: `app/icon.png`, `app/apple-icon.png`).
- `/public/video/` — hero loop (mp4 + webm) and poster.
- `/public/images/` — stills for the image strip and services. Use `next/image` with proper `sizes`, AVIF/WebP, blur placeholders.
- WhatsApp prefilled message: `Hi Wow Visual, I'm interested in a video project. ` (URL-encoded).

---

## 9. Motion system

Put shared variants and easing in `/lib/motion.ts`.

- **Easing:** `[0.22, 1, 0.36, 1]` (ease-out-expo feel) for reveals; `[0.65, 0, 0.35, 1]` for layout moves.
- **Durations:** micro-interactions 150–250ms; reveals 600–900ms; stagger 40–80ms.
- **Reveal pattern:** elements fade up 24px + slight blur (4px → 0) on enter, `whileInView`, `once: true`, `amount: 0.3`.
- **Headline reveal:** split into words, each word slides up from behind a mask (overflow-hidden line wrappers). Keep the real text in the DOM for SEO/screen readers (`aria-label` on the heading, split spans `aria-hidden`).
- **Scroll-linked:** hero card scale, image strip drift, statement word-fill, process line draw — via `useScroll` + `useTransform`. Keep transforms to `transform` and `opacity` only.
- **Theme switch:** use the View Transitions API for a circular reveal from the toggle button when supported; instant switch otherwise. No flash of wrong theme on load (`suppressHydrationWarning` on `<html>`, next-themes script).
- **Page transitions:** subtle fade between `/` and `/work`.
- **Lenis:** lerp ~0.1; stop Lenis while a modal or the mobile menu is open; disable entirely under reduced motion and on touch devices if it fights native scroll.
- **Reduced motion:** respect `prefers-reduced-motion` everywhere — disable parallax, marquee movement, scroll-linked transforms, count-ups (show final number), and autoplay the hero video only if motion is allowed (show poster otherwise).
- Rule: **motion must never delay content or block interaction.** Nothing should be invisible for more than ~1s after load, and content must be readable if JS fails.

---

## 10. UX Quality Gate — check at the end of EVERY phase

Kenny's rule: **always check the UX and make sure the UI gives users a great experience.** Do not just write code and assume it looks right.

### 10.1 Visual self-review loop (mandatory)

After each phase:

1. Run the dev server.
2. Use Playwright to screenshot every page at **375px, 768px, 1024px, 1440px**, in **both light and dark mode** (write a reusable script at `/scripts/screenshots.ts` saving to `/screenshots/`, git-ignored).
3. Open and inspect the screenshots yourself. Look for: overflow/horizontal scroll, cramped spacing, misaligned grids, text over busy imagery, broken dark/light colours, orphaned single words in headlines, inconsistent radii, buttons that look disabled, anything that "feels off".
4. Fix issues, re-screenshot, and only then commit.
5. Write a short "UX notes" list in the commit or phase summary (what you checked, what you fixed).

### 10.2 Checklist

- [ ] Clear hierarchy: in 3 seconds a visitor knows what Wow Visual does and how to contact them.
- [ ] Primary CTA visible above the fold on mobile and desktop.
- [ ] Both themes look intentional (not just inverted) — check every section in both.
- [ ] Text contrast ≥ 4.5:1 (body) and ≥ 3:1 (large text, UI) in both themes.
- [ ] Tap targets ≥ 44×44px; adequate spacing between links on mobile.
- [ ] Visible focus ring on every interactive element (`:focus-visible`, accent outline, 2px offset).
- [ ] Full keyboard navigation: nav, menu, filters, cards, modal, form. Skip-to-content link.
- [ ] Modal and mobile menu: focus trap, Esc closes, focus returns.
- [ ] No layout shift (CLS < 0.1): reserve space for media, fonts via next/font.
- [ ] No horizontal scroll at any width from 320px up.
- [ ] Forms: labels (not placeholder-only), helpful errors, correct input types (`email`, `tel`), autocomplete attributes, success/error states.
- [ ] Hover effects have touch-friendly equivalents; nothing important is hover-only.
- [ ] Loading states for anything async; no blank flashes.
- [ ] Images have meaningful `alt` text; decorative ones `alt=""`.
- [ ] Reduced-motion mode still looks complete.
- [ ] Copy is concise, scannable, no lorem ipsum in production.

---

## 11. Performance, SEO, accessibility targets

- **Lighthouse (mobile): ≥ 90** in Performance, Accessibility, Best Practices, SEO. Report the scores in the final summary.
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Hero video: `preload="metadata"`, poster as the LCP image (priority), lazy-load all other media, YouTube iframes only on click.
- Ship minimal client JS: server components by default; `"use client"` only where needed.
- **SEO:**
  - `metadata` in `app/layout.tsx` with `metadataBase: new URL("https://wowvisual.my")`, title template `%s · WOW VISUAL`, description, keywords (video production Kuala Lumpur, corporate video Malaysia, event videography KL, TVC production Malaysia).
  - Dynamic OG image via `next/og` (logo + headline, dark theme).
  - `app/sitemap.ts`, `app/robots.ts`, canonical URLs.
  - JSON-LD `Organization` / `LocalBusiness` with legal name, phone, email, URL, `sameAs` (YouTube + socials).
  - `<html lang="en-MY">`.
- **Accessibility:** WCAG 2.2 AA.

---

## 12. Build phases

Work through these in order. Commit and run the UX Quality Gate (§10) at the end of each.

0. **Setup** — create Next.js app, Tailwind v4, Inter, next-themes, Motion, Lenis, lint/format, `.env.example`, folder structure, git init, GitHub repo + first push.
1. **Design system** — tokens (both themes), typography, container, Button, Eyebrow, Section, Marquee, Reveal components, theme toggle, `/lib/motion.ts`. Build a temporary `/styleguide` route to review everything in both themes (remove before launch).
2. **Layout** — Nav (desktop + mobile menu), Footer, floating WhatsApp, skip link, smooth scroll.
3. **Hero + trust strip + marquee.**
4. **About statement, image strip, stats.**
5. **Featured work + video modal + `/work` page with filters.**
6. **Services, process, testimonials (if any), final CTA.**
7. **Contact form + API route + `/privacy` + 404.**
8. **Motion polish pass** — tune timings so it feels like a smooth film edit; verify reduced motion.
9. **QA** — full §10 checklist, Lighthouse, cross-browser sanity (Chrome, Safari, Firefox; iOS Safari behaviour for video autoplay and `svh`).
10. **Deploy** — push, confirm Vercel production build, then hand off (§13–14).

---

## 13. Deployment & domain

### Environment variables (Vercel → Project → Settings → Environment Variables)

```
RESEND_API_KEY=            # from resend.com
CONTACT_TO_EMAIL=wowvisualofficial@gmail.com
CONTACT_FROM_EMAIL=hello@wowvisual.my   # must be on a domain verified in Resend
NEXT_PUBLIC_SITE_URL=https://wowvisual.my
```

If `RESEND_API_KEY` is missing, the form must still work by falling back to opening WhatsApp with the message prefilled — never a dead form.

### Connect wowvisual.my (Hostinger → Vercel)

1. Vercel → Project → Settings → Domains → add `wowvisual.my` and `www.wowvisual.my`. Set `wowvisual.my` as primary and redirect `www` to it.
2. Vercel will display the exact DNS records to add. Typically:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
     **Use whatever values the Vercel dashboard shows if they differ.**
3. Hostinger hPanel → Domains → wowvisual.my → DNS / Nameservers → DNS records: delete any existing `A` record on `@` and any `CNAME` on `www` that point to Hostinger parking, then add the records above.
4. For the contact email sender, add the Resend domain-verification records (SPF/DKIM TXT + MX for the send subdomain) in the same Hostinger DNS panel. **Don't touch existing MX records** if the client uses Hostinger email.
5. Wait for propagation (minutes to a few hours); Vercel issues SSL automatically.

---

## 14. Definition of done & handoff

The build is done when:

- All phases complete, `pnpm build` passes, deployed on Vercel at wowvisual.my with HTTPS.
- §10 checklist fully ticked; Lighthouse mobile ≥ 90 across the board.
- Light and dark mode both polished.
- Contact form tested end-to-end (email received at wowvisualofficial@gmail.com) and WhatsApp links open correctly on mobile.
- `/styleguide` route removed.

Final message to Kenny must include:

1. Live URL + GitHub repo URL.
2. Lighthouse scores.
3. **Every [CONFIRM] item still using placeholder content**, grouped by file.
4. How to edit content (`/content/site.ts`, `/content/work.ts`) and how to add a new video.
5. Any known limitations or follow-up suggestions.

---

## 15. Open questions for the client (collect before launch)

- [ ] Confirm the SSM company number format.
- [ ] Logo files (SVG preferred) and brand colours / any brand guide.
- [ ] Final service list and which ones to lead with.
- [ ] Which YouTube videos to feature (6 for home, full list for /work) + categories.
- [ ] A 10–15s showreel loop for the hero (or permission for Kenny to cut one).
- [ ] Client logos they're allowed to show; awards or festival selections.
- [ ] Real numbers for the stats section.
- [ ] Testimonials (name, role, company, quote).
- [ ] Social media links.
- [ ] Office address (show or hide?), service area (KL/Selangor, nationwide?).
- [ ] Budget ranges for the form, or remove the field.
- [ ] Do they want a Bahasa Malaysia / Chinese version later? (Structure content so i18n can be added without a rewrite.)

@AGENTS.md
