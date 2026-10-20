import { BrandMark, BrandWordmark } from "@/components/ui/brand";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * WOW VISUAL logo: the deer mark beside the stencil wordmark (a horizontal
 * lockup of the client's stacked logo). Inline SVG in currentColor, so it
 * follows the theme and the header's on-dark state.
 */
export function Logo({
  className,
  tone = "auto",
}: {
  className?: string;
  /** "onDark" forces white (e.g. over the hero) */
  tone?: "auto" | "onDark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-end gap-2.5",
        tone === "onDark" ? "text-white" : "text-fg",
        className,
      )}
    >
      <BrandMark className="h-9 w-auto shrink-0 md:h-10" />
      <BrandWordmark className="h-[15px] w-auto shrink-0 md:h-[17px]" />
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
