import Image from "next/image";
import { imageStrip } from "@/content/site";
import { cn } from "@/lib/cn";
import { ImageStripTrack } from "./image-strip-track";

const cardClass =
  "rounded-card relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] md:w-[27vw] lg:w-[21vw]";

// Placeholder light setups — warm/cool cinematic frames, decorative only [CONFIRM]
const placeholderLights = [
  "radial-gradient(70% 55% at 30% 75%, rgb(217 45 32 / 0.55), transparent 70%), radial-gradient(50% 40% at 80% 15%, rgb(255 220 190 / 0.18), transparent 70%)",
  "radial-gradient(60% 50% at 70% 30%, rgb(255 140 70 / 0.4), transparent 70%), radial-gradient(60% 60% at 20% 90%, rgb(60 70 90 / 0.5), transparent 70%)",
  "radial-gradient(80% 50% at 50% 100%, rgb(255 180 120 / 0.3), transparent 70%), radial-gradient(40% 35% at 25% 20%, rgb(255 255 255 / 0.12), transparent 70%)",
  "radial-gradient(55% 45% at 75% 70%, rgb(217 45 32 / 0.45), transparent 70%), radial-gradient(60% 50% at 15% 10%, rgb(90 110 140 / 0.35), transparent 70%)",
  "radial-gradient(70% 60% at 40% 35%, rgb(255 200 150 / 0.25), transparent 70%), radial-gradient(50% 40% at 85% 95%, rgb(217 45 32 / 0.4), transparent 70%)",
  "radial-gradient(60% 50% at 20% 50%, rgb(80 90 120 / 0.45), transparent 70%), radial-gradient(45% 40% at 85% 25%, rgb(255 150 90 / 0.35), transparent 70%)",
];

/** Horizontal strip of 3:4 stills (§6.6). */
export function ImageStrip() {
  const hasImages = imageStrip.images.length > 0;

  return (
    <section className="overflow-hidden pb-[calc(var(--section-pad)*0.6)]">
      <ImageStripTrack label={imageStrip.label}>
        {hasImages
          ? imageStrip.images.map((img) => (
              <li key={img.src} className={cardClass}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 21vw, (min-width: 768px) 27vw, (min-width: 640px) 42vw, 68vw"
                  className="object-cover saturate-[0.85]"
                />
              </li>
            ))
          : placeholderLights.slice(0, imageStrip.placeholderCount).map((light, i) => (
              <li key={i} aria-hidden className={cn(cardClass, "bg-hero-ink")}>
                <div className="rounded-card pointer-events-none absolute inset-0 z-10 ring-1 ring-transparent ring-inset dark:ring-white/[0.07]" />
                <div className="absolute inset-0" style={{ backgroundImage: light }} />
                <div className="hero-grain" />
              </li>
            ))}
      </ImageStripTrack>
    </section>
  );
}
