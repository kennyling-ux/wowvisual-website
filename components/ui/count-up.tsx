"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-MY");

/**
 * Counts 0 → value once when scrolled into view (§6.7). Server/no-JS render and
 * reduced motion show the final number. Writes text directly — no re-renders.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const armed = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Only arm the count if the number hasn't been seen yet (below the fold)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && el.getBoundingClientRect().top > window.innerHeight) {
      el.textContent = format(0) + suffix;
      armed.current = true;
    }
  }, [suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !armed.current || !el) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v) + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value) + suffix}
    </span>
  );
}
