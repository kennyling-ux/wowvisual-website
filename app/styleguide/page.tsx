import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Logo } from "@/components/ui/logo";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { SplitHeadline } from "@/components/ui/split-headline";
import { TextLink } from "@/components/ui/text-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// TEMPORARY design-system review route — remove before launch (§12, §14).
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches = [
  { token: "--bg", cls: "bg-bg", use: "Page background" },
  { token: "--surface", cls: "bg-surface", use: "Cards, sections" },
  { token: "--surface-2", cls: "bg-surface-2", use: "Hover, inputs" },
  { token: "--fg", cls: "bg-fg", use: "Primary text" },
  { token: "--fg-muted", cls: "bg-fg-muted", use: "Secondary text (≥4.5:1)" },
  { token: "--fg-faint", cls: "bg-fg-faint", use: "Decoration only" },
  { token: "--border", cls: "bg-border", use: "Dividers" },
  { token: "--accent", cls: "bg-accent", use: "CTAs, eyebrows [CONFIRM]" },
  { token: "--accent-hover", cls: "bg-accent-hover", use: "Hover state" },
  { token: "--accent-text", cls: "bg-accent-text", use: "Red text on bg" },
];

const typeScale = [
  {
    name: "Display",
    cls: "text-display",
    spec: "clamp(2.75rem, 7vw, 6.5rem) · 600 · 0.95 · −0.045em",
    sample: "Visuals that make people say wow.",
  },
  {
    name: "H2",
    cls: "text-h2",
    spec: "clamp(2rem, 4.5vw, 3.75rem) · 600 · 1.05 · −0.035em",
    sample: "Featured productions",
  },
  {
    name: "H3",
    cls: "text-h3",
    spec: "clamp(1.25rem, 2vw, 1.75rem) · 600 · −0.02em",
    sample: "Corporate & brand films",
  },
  {
    name: "Body L",
    cls: "text-body-l",
    spec: "18–20px · 1.6",
    sample:
      "Commercials, corporate films, events and social content for brands that want to be remembered.",
  },
  {
    name: "Body",
    cls: "text-body",
    spec: "16px · 1.6",
    sample:
      "We plan, shoot and finish every project in-house, so the film you approve is the film you get.",
  },
  {
    name: "Label",
    cls: "text-label",
    spec: "13px · 500 · 0.02em",
    sample: "Video Production Studio · Kuala Lumpur",
  },
];

function Block({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={id} compact className="border-border border-t">
      <div className="mb-10 flex flex-col gap-3 md:mb-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-h2">{title}</h2>
      </div>
      {children}
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <main id="main" className="pb-24">
      {/* Header bar */}
      <div className="border-border bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-xl">
        <Container className="flex h-(--header-h) items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="text-label text-fg-muted hidden sm:inline">Design system · v1</span>
            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* Intro */}
      <Section compact>
        <Eyebrow>Styleguide — temporary route</Eyebrow>
        <SplitHeadline
          as="h1"
          trigger="mount"
          text="WOW VISUAL design system."
          className="text-display mt-6 max-w-[14ch]"
        />
        <p className="text-body-l measure text-fg-muted mt-8">
          Tokens, type, components and motion for wowvisual.my. Toggle the theme (top right) to
          review both modes. Accent red is a placeholder until it can be sampled from the logo.
        </p>
      </Section>

      {/* Colour */}
      <Block id="colour" eyebrow="01 · Colour" title="Tokens">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s) => (
            <li
              key={s.token}
              className="rounded-card border-border bg-surface overflow-hidden border"
            >
              <div className={`${s.cls} border-border aspect-[4/3] border-b`} />
              <div className="p-4">
                <p className="text-sm font-medium">{s.token}</p>
                <p className="text-fg-muted mt-1 text-sm">{s.use}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-card bg-surface p-6">
            <p className="text-fg">Primary text on surface</p>
            <p className="text-fg-muted mt-1">Muted text on surface</p>
          </div>
          <div className="rounded-card bg-accent text-on-accent p-6">
            <p className="font-medium">White on accent — 4.83:1</p>
            <p className="mt-1 text-sm opacity-90">Passes AA for body text</p>
          </div>
          <div className="rounded-card border-border border p-6">
            <p className="text-accent-text font-medium">Accent text on background</p>
            <p className="text-fg-muted mt-1">
              The <span className="text-fg-faint">greyed-out end</span> of a statement uses
              fg-faint.
            </p>
          </div>
        </div>
      </Block>

      {/* Type */}
      <Block id="type" eyebrow="02 · Typography" title="Inter, one family">
        <div className="flex flex-col">
          {typeScale.map((t) => (
            <div
              key={t.name}
              className="border-border grid gap-3 border-t py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-fg-muted mt-1 text-sm">{t.spec}</p>
              </div>
              <p
                className={`${t.cls} md:col-span-9 ${t.name === "Label" ? "text-fg-muted" : ""} ${t.name.startsWith("Body") ? "measure" : ""}`}
              >
                {t.sample}
              </p>
            </div>
          ))}
          <div className="border-border grid gap-3 border-t py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="text-sm font-medium">Stats</p>
              <p className="text-fg-muted mt-1 text-sm">tabular-nums</p>
            </div>
            <p className="text-display tabular-nums md:col-span-9">120+</p>
          </div>
        </div>
      </Block>

      {/* Buttons */}
      <Block id="buttons" eyebrow="03 · Actions" title="Buttons & links">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#buttons">Start a project</Button>
            <Button href="#buttons" variant="secondary">
              View all work
            </Button>
            <Button size="lg">Watch showreel</Button>
            <Button variant="secondary" icon={false}>
              No icon
            </Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="rounded-card relative overflow-hidden bg-[#0b0b0b] p-6 md:p-10">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(80%_120%_at_20%_100%,rgba(217,45,32,0.35),transparent_60%),radial-gradient(60%_80%_at_90%_0%,rgba(255,255,255,0.08),transparent_60%)]"
            />
            <div className="relative flex flex-col gap-6">
              <Eyebrow tone="onDark">On the hero card (always dark)</Eyebrow>
              <div className="flex flex-wrap gap-4">
                <Button>Watch showreel</Button>
                <Button variant="inverse">Start a project</Button>
              </div>
              <Logo tone="onDark" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <TextLink href="#buttons">About the studio</TextLink>
            <TextLink href="#buttons" arrow="trailing">
              View all work
            </TextLink>
          </div>
        </div>
      </Block>

      {/* Eyebrows & shape */}
      <Block id="shape" eyebrow="04 · Shape" title="Eyebrows, radii, inputs">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border-border bg-surface flex flex-col gap-4 border p-6 md:p-8">
            <Eyebrow>Who we are</Eyebrow>
            <Eyebrow>Selected work</Eyebrow>
            <Eyebrow>Services</Eyebrow>
            <div className="text-fg-muted mt-2 flex flex-wrap gap-2 text-sm">
              {["#01 Concept", "#02 Production", "#03 Post-production", "#04 Delivery"].map((t) => (
                <span key={t} className="border-border rounded-full border px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <form
            className="rounded-card border-border bg-surface flex flex-col gap-4 border p-6 md:p-8"
            aria-label="Input preview"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="sg-name" className="text-sm font-medium">
                Name <span className="text-accent-text">*</span>
              </label>
              <input
                id="sg-name"
                autoComplete="name"
                className="border-border bg-surface-2 placeholder:text-fg-muted focus-visible:border-accent h-12 rounded-[12px] border px-4 text-base transition-colors outline-none"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sg-email" className="text-sm font-medium">
                Email <span className="text-accent-text">*</span>
              </label>
              <input
                id="sg-email"
                type="email"
                aria-invalid
                aria-describedby="sg-email-error"
                defaultValue="adrian@"
                className="border-accent bg-surface-2 h-12 rounded-[12px] border px-4 text-base outline-none"
              />
              <p id="sg-email-error" className="text-accent-text text-sm">
                Enter a valid email, e.g. name@company.com
              </p>
            </div>
          </form>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-card bg-surface-2 aspect-video" />
          <div className="rounded-card bg-surface-2 aspect-video" />
          <div className="rounded-card bg-surface-2 aspect-[3/4]" />
          <div className="rounded-card bg-surface-2 aspect-[3/4]" />
        </div>
        <p className="text-fg-muted mt-3 text-sm">
          Media cards: 16:9 for work, 3:4 for the image strip · radius 24px (16px mobile).
        </p>
      </Block>

      {/* Motion */}
      <Block id="motion" eyebrow="05 · Motion" title="Reveals & marquee">
        <div className="flex flex-col gap-12">
          <SplitHeadline text="Let's make something wow." className="text-h2 max-w-[18ch]" />
          <RevealGroup className="grid gap-3 md:grid-cols-3">
            {["Fade up 24px", "Blur 4px → 0", "Stagger 60ms"].map((t) => (
              <RevealItem key={t} className="rounded-card border-border bg-surface border p-6">
                <p className="text-h3">{t}</p>
                <p className="text-fg-muted mt-2">
                  ease [0.22, 1, 0.36, 1] · 800ms · once, 30% in view
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="text-body-l measure text-fg-muted">
              Everything respects{" "}
              <code className="bg-surface-2 rounded px-1.5 py-0.5 text-sm">
                prefers-reduced-motion
              </code>
              : reveals render instantly, and the marquee stops moving.
            </p>
          </Reveal>
        </div>
      </Block>

      <div className="border-border border-y py-6 md:py-8">
        <Marquee speed={70} scrollReactive label="Our services">
          {[
            "Commercials",
            "Corporate films",
            "Event coverage",
            "Social content",
            "Motion graphics",
          ].map((w) => (
            <span
              key={w}
              className="flex items-center text-[clamp(2.5rem,8vw,7rem)] leading-none font-semibold tracking-[-0.045em] uppercase"
            >
              <span className="px-[0.3em]">{w}</span>
              <span aria-hidden className="text-accent">
                —
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </main>
  );
}
