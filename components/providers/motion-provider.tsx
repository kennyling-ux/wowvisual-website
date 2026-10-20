"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respect prefers-reduced-motion for every Motion animation (§9). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
