"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Muted looping showreel cut. Rendered paused with its poster; playback starts
 * only when motion is allowed (§9). preload="metadata" keeps it light (§11).
 */
export function HeroVideo({ mp4, webm, poster }: { mp4?: string; webm?: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      /* Autoplay blocked (e.g. Low Power Mode) — poster stays visible */
    });
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover saturate-[0.85]"
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
      tabIndex={-1}
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
