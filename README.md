# wowvisual.my

Cinematic portfolio + lead-generation site for **WOW VISUAL SDN. BHD.** Built by Brewdes.

Spec: see `CLAUDE.md` (single source of truth).

## Stack

Next.js (App Router, TypeScript strict) · Tailwind CSS v4 · Motion · Lenis · next-themes · Resend · Vercel

## Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

> **Dev tip:** this project lives in a folder whose path contains `[` `]` brackets.
> Turbopack's watcher can miss edits to `app/globals.css` there — if a CSS change
> doesn't show up in `pnpm dev`, stop it, delete `.next/dev` and start it again.
> Production builds are unaffected.

## Scripts

- `pnpm build` / `pnpm lint` / `pnpm typecheck` — must pass before every push
- `pnpm screenshots [baseUrl] [routes...]` — Playwright UX screenshots at 375/768/1024/1440 in light + dark → `/screenshots`

## Content

All copy lives in `/content` (`site.ts`, `work.ts`). Anything marked `[CONFIRM]` is placeholder.
