"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  /** Pixels per second at rest */
  speed?: number;
  /** Scroll velocity nudges speed/direction (§6.4) */
  scrollReactive?: boolean;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  /** Accessible label; the moving copies are aria-hidden */
  label?: string;
};

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function Marquee({
  children,
  speed = 60,
  scrollReactive = false,
  pauseOnHover = false,
  reverse = false,
  className,
  label,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const direction = useRef(reverse ? 1 : -1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-2500, 0, 2500], [-2.5, 0, 2.5]);

  useAnimationFrame((_, delta) => {
    if (reduce || paused || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;
    let move = direction.current * speed * (delta / 1000);
    if (scrollReactive) {
      const f = factor.get();
      if (f < 0) direction.current = reverse ? -1 : 1;
      else if (f > 0) direction.current = reverse ? 1 : -1;
      move += direction.current * Math.abs(f) * speed * 0.5 * (delta / 1000);
    }
    x.set(wrap(-half, 0, x.get() + move));
  });

  return (
    <div
      className={cn("relative flex overflow-hidden", className)}
      role={label ? "region" : undefined}
      aria-label={label}
      onPointerEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <motion.div ref={trackRef} className="flex w-max shrink-0" style={{ x }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
