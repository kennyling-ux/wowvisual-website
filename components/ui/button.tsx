import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-between gap-3 rounded-full font-medium " +
  "whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 ease-out-expo " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-fg hover:border-fg-faint hover:bg-surface-2",
  // For use on the always-dark hero card (white on video in both themes)
  inverse:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/20",
};

const iconVariants: Record<Variant, string> = {
  primary: "bg-on-accent text-accent",
  secondary: "bg-fg text-bg",
  inverse: "bg-white text-black",
};

const sizes: Record<Size, { root: string; icon: string; glyph: number }> = {
  md: { root: "h-12 pl-5 pr-1.5 text-[15px]", icon: "size-9", glyph: 16 },
  lg: { root: "h-14 pl-6 pr-2 text-base", icon: "size-10", glyph: 18 },
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Inner({
  variant,
  size,
  icon,
  children,
}: Required<Pick<CommonProps, "variant" | "size">> & Pick<CommonProps, "icon" | "children">) {
  const s = sizes[size];
  return (
    <>
      <span className="relative">{children}</span>
      {icon !== false && (
        <span
          aria-hidden
          className={cn(
            "ease-out-expo grid shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-300 group-hover/btn:scale-105",
            iconVariants[variant],
            s.icon,
          )}
        >
          <span className="relative block size-[1em]" style={{ fontSize: s.glyph }}>
            {icon ?? (
              <>
                <ArrowUpRight
                  size={s.glyph}
                  strokeWidth={2.25}
                  className="ease-out-expo absolute inset-0 transition-transform duration-300 group-hover/btn:translate-x-[120%] group-hover/btn:-translate-y-[120%]"
                />
                <ArrowUpRight
                  size={s.glyph}
                  strokeWidth={2.25}
                  className="ease-out-expo absolute inset-0 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                />
              </>
            )}
          </span>
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  const classes = cn(
    base,
    variants[variant],
    sizes[size].root,
    icon === false && "justify-center px-6",
    className,
  );
  const inner = (
    <Inner variant={variant} size={size} icon={icon}>
      {children}
    </Inner>
  );

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      icon: _i,
      className: _c,
      children: _ch,
      href,
      external,
      ...rest
    } = props;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    className: _c,
    children: _ch,
    type = "button",
    ...rest
  } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  );
}
