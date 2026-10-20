"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Step = { title: string; description: string };

function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const opacity = useTransform(progress, [Math.max(0, at - 0.02), at + 0.02], [0, 1]);
  return (
    <span
      aria-hidden
      className="bg-bg border-fg-faint absolute top-1 left-0 z-10 size-[11px] rounded-full border lg:top-0"
    >
      <motion.span className="bg-accent absolute -inset-px rounded-full" style={{ opacity }} />
    </span>
  );
}

/**
 * 4 steps with a line that draws as you scroll (§6.10): vertical on mobile,
 * horizontal from lg. Transform-only; fully drawn under reduced motion.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <ol ref={ref} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
      {/* Track + drawn line */}
      <span
        aria-hidden
        className="bg-border absolute top-2 bottom-2 left-[5px] w-px lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      >
        <motion.span
          className="bg-accent absolute inset-0 origin-top lg:hidden"
          style={{ scaleY: progress }}
        />
        <motion.span
          className="bg-accent absolute inset-0 hidden origin-left lg:block"
          style={{ scaleX: progress }}
        />
      </span>

      {steps.map((step, i) => (
        <li key={step.title} className="relative pl-10 lg:pt-12 lg:pl-0">
          <Dot progress={progress} at={i / steps.length} />
          <p className="text-label text-fg-muted tabular-nums">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="text-h3 mt-3">{step.title}</h3>
          <p className="text-fg-muted mt-3 max-w-[34ch]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
