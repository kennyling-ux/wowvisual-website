"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Inset hero card with scroll-linked scale (1 → 0.96) and background parallax (§6.2).
 * Transforms only; disabled under reduced motion.
 */
export function HeroFrame({
  background,
  children,
}: {
  background: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Constant outputs under reduced motion keep server/client markup identical
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.96]);
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);

  return (
    <div className="p-2 md:p-3">
      <motion.section
        ref={ref}
        data-hero
        aria-label="Introduction"
        style={{ scale }}
        className="rounded-card bg-hero-ink relative isolate flex min-h-[80svh] origin-top flex-col overflow-hidden text-white ring-1 ring-transparent ring-inset md:min-h-[88vh] dark:ring-white/[0.07]"
      >
        <motion.div
          aria-hidden
          style={{ y: bgY }}
          className="absolute inset-0 -z-10 scale-110 will-change-transform"
        >
          {background}
        </motion.div>
        {/* Legibility overlay: bottom + left (§6.2) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(0_0_0/0.75),rgb(0_0_0/0.15)_55%,rgb(0_0_0/0.35)),linear-gradient(to_right,rgb(0_0_0/0.45),transparent_60%)]"
        />
        {children}
      </motion.section>
    </div>
  );
}
