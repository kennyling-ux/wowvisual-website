import type { Transition, Variants } from "motion/react";

/** Shared motion system (§9). */

export const ease = {
  /** Reveals — ease-out-expo feel */
  out: [0.22, 1, 0.36, 1] as const,
  /** Layout moves */
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  micro: 0.2,
  reveal: 0.8,
  revealSlow: 0.9,
};

export const stagger = {
  tight: 0.04,
  base: 0.06,
  loose: 0.08,
};

export const viewport = { once: true, amount: 0.3 } as const;

export const revealTransition: Transition = { duration: duration.reveal, ease: ease.out };

/** Fade up 24px + blur 4px → 0 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: revealTransition },
};

/** Parent that staggers its children */
export const staggerContainer = (gap: number = stagger.base, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Word slides up from behind a mask */
export const maskWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: duration.revealSlow, ease: ease.out } },
};

export const layoutTransition: Transition = { duration: 0.5, ease: ease.inOut };
