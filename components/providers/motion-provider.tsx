"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

/** Respect prefers-reduced-motion for every Motion animation (§9). */
export function MotionProvider({ children }: { children: ReactNode }) {
  // After the first paint, enable the route fade for client-side navigations
  useEffect(() => {
    document.documentElement.classList.add("nav-ready");
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
