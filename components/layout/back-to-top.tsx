"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (lenis) lenis.scrollTo(0, { immediate: reduce });
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group text-fg inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-medium whitespace-nowrap"
    >
      {label}
      <span className="border-border group-hover:bg-surface-2 grid size-10 place-items-center rounded-full border transition-colors">
        <ArrowUp
          aria-hidden
          size={16}
          className="ease-out-expo transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </span>
    </button>
  );
}
