import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeadline } from "@/components/ui/split-headline";
import { hero, site } from "@/content/site";
import { HeroFrame } from "./hero-frame";
import { HeroVideo } from "./hero-video";

const publicPath = (p: string) => path.join(process.cwd(), "public", p);
const media = {
  mp4: existsSync(publicPath(hero.media.mp4)) ? hero.media.mp4 : undefined,
  webm: existsSync(publicPath(hero.media.webm)) ? hero.media.webm : undefined,
  poster: existsSync(publicPath(hero.media.poster)) ? hero.media.poster : undefined,
};

function HeroBackground() {
  const hasVideo = media.mp4 || media.webm;
  return (
    <>
      {/* Poster is the LCP image (§11) */}
      {media.poster && (
        <Image
          src={media.poster}
          alt={hero.media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-[0.85]"
        />
      )}
      {hasVideo && <HeroVideo mp4={media.mp4} webm={media.webm} poster={media.poster} />}
      {/* [CONFIRM] Fallback until the showreel loop is supplied */}
      {!hasVideo && !media.poster && (
        <>
          <div className="hero-glow" />
          <div className="hero-sweep" />
        </>
      )}
      <div className="hero-grain" />
    </>
  );
}

export function Hero() {
  const showreel = hero.showreelYoutubeId
    ? `https://www.youtube.com/watch?v=${hero.showreelYoutubeId}`
    : site.socials[0].href;

  return (
    <HeroFrame background={<HeroBackground />}>
      <div className="container-site relative flex flex-1 flex-col pt-[calc(var(--header-h)+2rem)]">
        <div className="mt-auto grid gap-8 pb-8 md:pb-10 xl:grid-cols-12 xl:items-end xl:gap-10">
          <div className="xl:col-span-8">
            <Reveal>
              <Eyebrow tone="onDark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              as="h1"
              trigger="mount"
              delay={0.15}
              text={hero.headline}
              className="text-display mt-5 max-w-[13ch] md:mt-6"
            />
          </div>
          <Reveal
            delay={0.5}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 xl:col-span-4 xl:flex-col xl:items-start xl:justify-end xl:gap-6 xl:pb-2"
          >
            <p className="text-body-l max-w-[38ch] text-white/75">{hero.intro}</p>
            <div className="flex shrink-0 flex-wrap gap-3">
              {/* Phase 5: opens the video modal when showreelYoutubeId is set */}
              <Button href={showreel} external>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="inverse">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.7}>
          <ul
            aria-label="How we work"
            className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/15 py-5 sm:grid-cols-4 md:py-6"
          >
            {hero.tags.map((tag, i) => (
              <li key={tag} className="text-label flex items-baseline gap-2 text-white/80">
                <span className="text-white/45 tabular-nums">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </HeroFrame>
  );
}
