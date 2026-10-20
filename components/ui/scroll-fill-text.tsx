"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createElement, useRef } from "react";
import { cn } from "@/lib/cn";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Finish the fill at 90% progress so the last words are solid before the paragraph leaves
  const start = (index / total) * 0.9;
  const end = Math.min(0.9, start + 1.5 / total);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <span className="relative inline-block">
      <span className="text-fg-dim">{word}</span>
      {/* data-reveal: fully filled without JS and under reduced motion */}
      <motion.span data-reveal className="text-fg absolute inset-0" style={{ opacity }}>
        {word}
      </motion.span>
    </span>
  );
}

/**
 * Statement whose words fill from --fg-dim to --fg as it scrolls through the
 * viewport (§6.5). Opacity-only; the real sentence is kept for screen readers.
 */
export function ScrollFillText({
  text,
  as = "p",
  className,
}: {
  text: string;
  as?: "p" | "h2";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return createElement(
    as,
    { className },
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden className={cn("block")}>
        {words.map((word, i) => (
          <span key={i}>
            <Word word={word} index={i} total={words.length} progress={scrollYProgress} />
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </>,
  );
}
