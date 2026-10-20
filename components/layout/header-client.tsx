"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { useAnchorNav } from "@/lib/use-anchor-nav";
import { MobileMenu } from "./mobile-menu";

const SCROLLED_AT = 40;
const HIDE_AFTER = 160;

export function HeaderClient({ logo, logoOnDark }: { logo: ReactNode; logoOnDark: ReactNode }) {
  const pathname = usePathname();
  const onAnchor = useAnchorNav();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages with an always-dark hero card mark it with [data-hero]
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHasHero(!!document.querySelector("[data-hero]"));
      setScrolled(window.scrollY > SCROLLED_AT);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > SCROLLED_AT);
    if (menuOpen) return;
    setHidden((h) => (y > HIDE_AFTER && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });

  const overHero = hasHero && !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: ease.out }}
        // Show again when keyboard focus lands in the header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-300",
          scrolled
            ? "border-border bg-bg/80 text-fg backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
          overHero ? "text-white" : "text-fg",
        )}
      >
        <div
          className={cn(
            "container-site ease-out-expo flex h-(--header-h) items-center justify-between gap-6 transition-[padding,transform] duration-300",
            // Sit inside the inset hero card (gutter 8px mobile / 12px desktop)
            overHero &&
              "translate-y-2 px-[calc(var(--container-pad)+8px)] md:translate-y-3 md:px-[calc(var(--container-pad)+12px)]",
          )}
        >
          <Link
            href="/"
            aria-label="WOW VISUAL — home"
            className="-m-2 inline-flex min-h-11 items-center rounded-md p-2"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className={cn(overHero && "hidden")}>{logo}</span>
            <span className={cn(!overHero && "hidden")}>{logoOnDark}</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((link) => {
                const active = link.href === "/work" && pathname.startsWith("/work");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => onAnchor(e, link.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-200",
                        overHero ? "text-white/80 hover:text-white" : "text-fg-muted hover:text-fg",
                        active && (overHero ? "text-white" : "text-fg"),
                      )}
                    >
                      {link.label}
                      {active && (
                        <span aria-hidden className="absolute inset-x-4 bottom-2 h-px bg-current" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle
              className={cn(overHero && "border-white/25 text-white hover:bg-white/10")}
            />
            <Button
              href={nav.cta.href}
              onClick={(e) => onAnchor(e, nav.cta.href)}
              className="hidden md:inline-flex"
            >
              {nav.cta.label}
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "grid size-11 place-items-center rounded-full border lg:hidden",
                overHero ? "border-white/25 hover:bg-white/10" : "border-border hover:bg-surface-2",
              )}
            >
              <span aria-hidden className="flex w-[18px] flex-col gap-[5px]">
                <span className="h-[1.5px] w-full rounded-full bg-current" />
                <span className="h-[1.5px] w-full rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} logo={logo} />
    </>
  );
}
