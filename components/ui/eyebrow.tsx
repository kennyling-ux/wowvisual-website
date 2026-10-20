import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** "■ Who we are" — 8×8 accent square + label (§4.3) */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  /** "onDark" for the always-dark hero card */
  tone?: "default" | "onDark";
}) {
  return (
    <p
      className={cn(
        "text-label inline-flex items-center gap-2.5",
        tone === "onDark" ? "text-white/80" : "text-fg-muted",
        className,
      )}
    >
      <span aria-hidden className="bg-accent size-2 shrink-0" />
      {children}
    </p>
  );
}
