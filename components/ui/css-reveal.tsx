import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Above-the-fold fade-up (24px + blur 4px → 0) on CSS keyframes, so it plays from
 * first paint without waiting for hydration (§9: motion never delays content).
 * Reduced motion: shown immediately (globals.css).
 */
export function CssReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={{ animationDelay: `${Math.round(delay * 1000)}ms`, ...style }}
    >
      {children}
    </div>
  );
}
