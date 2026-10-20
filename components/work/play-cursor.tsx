"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { workCopy } from "@/content/work";

/** Optional "Play" cursor over [data-cursor="play"] (desktop, fine pointer, motion allowed). */
export function PlayCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mql = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!mql.matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const over = !!(e.target as Element | null)?.closest?.('[data-cursor="play"]');
      setActive(over);
    };
    const onLeave = () => setActive(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, [x, y]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="bg-accent text-on-accent pointer-events-none fixed top-0 left-0 z-[65] grid size-20 place-items-center rounded-full text-sm font-medium"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {workCopy.card.play}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
