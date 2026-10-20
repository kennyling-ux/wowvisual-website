"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { ease } from "@/lib/motion";

type Item = { quote: string; name: string; role?: string; company?: string };

/** Simple quote carousel (§6.11): keyboard accessible, no auto-advance. */
export function TestimonialsCarousel({
  items,
  label,
  prev,
  next,
}: {
  items: Item[];
  label: string;
  prev: string;
  next: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + items.length) % items.length);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };
  const item = items[index];

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey}>
      <div className="relative min-h-[14rem] overflow-hidden md:min-h-[16rem]" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.5, ease: ease.out }}
          >
            <blockquote className="text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-balance">
              “{item.quote}”
            </blockquote>
            <figcaption className="text-fg-muted mt-8">
              <span className="text-fg font-medium">{item.name}</span>
              {(item.role || item.company) && (
                <> · {[item.role, item.company].filter(Boolean).join(", ")}</>
              )}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={prev}
            className="border-border hover:bg-surface-2 grid size-12 place-items-center rounded-full border"
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={next}
            className="border-border hover:bg-surface-2 grid size-12 place-items-center rounded-full border"
          >
            <ArrowRight size={18} aria-hidden />
          </button>
          <span className="text-label text-fg-muted ml-2 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
