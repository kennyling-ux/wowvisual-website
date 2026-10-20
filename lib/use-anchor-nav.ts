"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useCallback, type MouseEvent } from "react";

/**
 * Smooth-scrolls "/#section" links when already on the home page
 * (through Lenis when active, native otherwise). Other links navigate normally.
 */
export function useAnchorNav() {
  const pathname = usePathname();
  const lenis = useLenis();

  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string, after?: () => void) => {
      const match = href.match(/^\/#(.+)$/);
      if (!match || pathname !== "/") {
        after?.();
        return;
      }
      const target = document.getElementById(match[1]);
      if (!target) {
        after?.();
        return;
      }
      e.preventDefault();
      after?.();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Let the menu unlock scroll before scrolling
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target, { immediate: reduce });
        else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.pushState(null, "", `#${match[1]}`);
        target.focus?.({ preventScroll: true });
      });
    },
    [pathname, lenis],
  );
}
