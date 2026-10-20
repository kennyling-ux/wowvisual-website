"use client";

import { motion } from "motion/react";
import { createElement, Fragment } from "react";
import { maskWord, staggerContainer, stagger, viewport } from "@/lib/motion";

type SplitHeadlineProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** "mount" animates on load (hero), "view" when scrolled into view */
  trigger?: "mount" | "view";
  delay?: number;
  id?: string;
};

/**
 * Word-by-word mask reveal (§9). Real text stays accessible via aria-label;
 * the split spans are aria-hidden.
 *
 * trigger="mount" (above the fold) runs on CSS keyframes from first paint, so the
 * headline never waits for hydration; trigger="view" uses Motion's whileInView.
 */
export function SplitHeadline({
  text,
  as = "h2",
  className,
  trigger = "view",
  delay = 0,
  id,
}: SplitHeadlineProps) {
  const words = text.split(" ");

  if (trigger === "mount") {
    return createElement(
      as,
      { "aria-label": text, className, id },
      <span aria-hidden className="block">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
              <span
                className="word-rise"
                style={{ animationDelay: `${Math.round((delay + i * stagger.base) * 1000)}ms` }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>,
    );
  }

  return createElement(
    as,
    { "aria-label": text, className, id },
    <motion.span
      aria-hidden
      className="block"
      variants={staggerContainer(stagger.base, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
            <motion.span
              data-reveal
              className="inline-block will-change-transform"
              variants={maskWord}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>,
  );
}
