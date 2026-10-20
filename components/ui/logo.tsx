import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * WOW VISUAL logo. Uses /public/brand/logo-dark.svg (light bg) and
 * logo-light.svg (dark bg) when present; otherwise a text wordmark.
 * [CONFIRM] logo files not yet supplied.
 */
const brandDir = path.join(process.cwd(), "public", "brand");
const hasSvgLogos =
  existsSync(path.join(brandDir, "logo-dark.svg")) &&
  existsSync(path.join(brandDir, "logo-light.svg"));

export function Logo({
  className,
  tone = "auto",
}: {
  className?: string;
  /** "onDark" forces the light variant (e.g. over the hero video) */
  tone?: "auto" | "onDark";
}) {
  if (hasSvgLogos) {
    return (
      <span className={cn("relative inline-flex h-7 items-center", className)}>
        {tone === "auto" && (
          <Image
            src="/brand/logo-dark.svg"
            alt={site.name}
            width={140}
            height={28}
            className="h-full w-auto dark:hidden"
            priority
          />
        )}
        <Image
          src="/brand/logo-light.svg"
          alt={site.name}
          width={140}
          height={28}
          className={cn("h-full w-auto", tone === "auto" && "hidden dark:block")}
          priority
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em] whitespace-nowrap",
        tone === "onDark" ? "text-white" : "text-fg",
        className,
      )}
    >
      <span aria-hidden className="bg-accent size-2.5 rounded-[2px]" />
      <span>
        WOW <span className="font-normal">VISUAL</span>
      </span>
    </span>
  );
}
