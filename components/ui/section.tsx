import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentProps<"section"> & {
  /** Skip the inner container (for full-bleed content) */
  bleed?: boolean;
  /** Tighter vertical padding */
  compact?: boolean;
  containerClassName?: string;
};

export function Section({
  bleed,
  compact,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        compact ? "py-[calc(var(--section-pad)*0.5)]" : "section-y",
        "scroll-mt-(--header-h)",
        className,
      )}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn("container-site", containerClassName)}>{children}</div>
      )}
    </section>
  );
}

export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("container-site", className)} {...rest} />;
}
