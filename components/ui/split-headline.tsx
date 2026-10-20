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
};

/**
 * Word-by-word mask reveal (§9). Real text stays accessible via aria-label;
 * the split spans are aria-hidden.
 */
export function SplitHeadline({
  text,
  as = "h2",
  className,
  trigger = "view",
  delay = 0,
}: SplitHeadlineProps) {
  const words = text.split(" ");
  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport };

  return createElement(
    as,
    { "aria-label": text, className },
    <motion.span
      aria-hidden
      className="block"
      variants={staggerContainer(stagger.base, delay)}
      {...animateProps}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
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
