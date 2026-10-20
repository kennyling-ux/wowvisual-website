"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Desktop: the row drifts horizontally as the section scrolls past (§6.6).
 * Mobile: native horizontal scroll-snap; the drift variable is ignored below md.
 */
export function ImageStripTrack({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-14%"]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="snap-x snap-mandatory scroll-px-(--container-pad) [scrollbar-width:none] overflow-x-auto overscroll-x-contain md:snap-none md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      <motion.ul
        style={{ "--drift": drift } as never}
        className="flex w-max gap-3 px-(--container-pad) md:translate-x-(--drift) md:gap-5 md:will-change-transform"
      >
        {children}
      </motion.ul>
    </div>
  );
}
