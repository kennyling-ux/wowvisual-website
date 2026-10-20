"use client";

import Lenis, { type ScrollCallback } from "lenis";
import { LenisContext, type LenisContextValue } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

const DISABLE_QUERY = "(prefers-reduced-motion: reduce), (pointer: coarse)";

/**
 * Lenis smooth scroll (§9): lerp ~0.1, disabled under reduced motion and on
 * touch devices (native scroll feels better there). The provider never changes
 * the React tree shape, so enabling Lenis after hydration doesn't remount the page.
 * `useLenis()` returns undefined while disabled — callers fall back to native scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<LenisContextValue | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(DISABLE_QUERY);
    let lenis: Lenis | null = null;
    const offs = new Map<ScrollCallback, () => void>();

    const start = () => {
      lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
      const instance = lenis;
      setValue({
        lenis: instance,
        addCallback: (cb) => offs.set(cb, instance.on("scroll", cb)),
        removeCallback: (cb) => {
          offs.get(cb)?.();
          offs.delete(cb);
        },
      });
    };
    const stop = () => {
      offs.forEach((off) => off());
      offs.clear();
      lenis?.destroy();
      lenis = null;
      setValue(null);
    };
    const sync = () => (mql.matches ? stop() : !lenis && start());

    const id = requestAnimationFrame(sync);
    mql.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(id);
      mql.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
