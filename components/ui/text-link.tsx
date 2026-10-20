import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** "→ About the studio" — arrow + animated underline */
export function TextLink({
  href,
  children,
  className,
  arrow = "leading",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: "leading" | "trailing" | false;
}) {
  const icon = (
    <ArrowRight
      aria-hidden
      size={18}
      strokeWidth={2}
      className="ease-out-expo shrink-0 transition-transform duration-300 group-hover/link:translate-x-1"
    />
  );
  return (
    <Link
      href={href}
      className={cn(
        "group/link text-fg inline-flex min-h-11 items-center gap-2 font-medium",
        className,
      )}
    >
      {arrow === "leading" && icon}
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="ease-out-expo absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100"
        />
      </span>
      {arrow === "trailing" && icon}
    </Link>
  );
}
