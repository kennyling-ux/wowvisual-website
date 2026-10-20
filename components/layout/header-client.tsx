"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Whether the header sits over the always-dark hero card. Known on the server
  // for "/" so the first paint (and no-JS) uses white text over the hero.
  const [onHero, setOnHero] = useState(pathname === "/");
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages with an always-dark hero card mark it with [data-hero]. The header
  // stays in its on-dark style until the card has scrolled out from under it,
  // so it never shows dark text over the dark hero (both themes).
  const measure = useCallback(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const headerH = headerRef.current?.offsetHeight ?? 72;
    setOnHero(!!hero && hero.getBoundingClientRect().bottom > headerH);
    setScrolled(window.scrollY > SCROLLED_AT);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [pathname, measure]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    measure();
    if (menuOpen) return;
    setHidden((h) => (y > HIDE_AFTER && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });

  const overHero = onHero && !menuOpen;
  // At rest at the top of the hero, content sits inside the inset card
  const inset = overHero && !scrolled;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: ease.out }}
        // Show again when keyboard focus lands in the header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          overHero ? "text-white" : "text-fg",
        )}
      >
        {/* Bar backgrounds: dark glass over the hero, theme glass elsewhere. Each
            keeps its blur on and only fades opacity, so there's no flash while a
            backdrop-filter switches on. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 border-b border-white/10 bg-black/45 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300",
            !(scrolled && overHero) && "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "border-border bg-bg/80 absolute inset-0 -z-10 border-b backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300",
            !(scrolled && !overHero) && "opacity-0",
          )}
        />
        <div
          className={cn(
            "container-site ease-out-expo flex h-(--header-h) items-center justify-between gap-6 transition-transform duration-500",
            // Sit inside the inset hero card (gutter 8px mobile / 12px desktop).
            // Transform-only (with the side groups below) so nothing re-lays out.
            inset && "translate-y-2 md:translate-y-3",
          )}
        >
          <Link
            href="/"
            aria-label="WOW VISUAL — home"
            className={cn(
              "ease-out-expo -m-2 inline-flex min-h-11 items-center rounded-md p-2 transition-transform duration-500",
              inset && "translate-x-2 md:translate-x-3",
            )}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {/* Crossfade the two wordmarks in step with the bar colours */}
            <span className="grid [&>*]:col-start-1 [&>*]:row-start-1">
              <span
                aria-hidden={overHero}
                className={cn("transition-opacity duration-300", overHero && "opacity-0")}
              >
                {logo}
              </span>
              <span
                aria-hidden={!overHero}
                className={cn("transition-opacity duration-300", !overHero && "opacity-0")}
              >
                {logoOnDark}
              </span>
            </span>
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

          <div
            className={cn(
              "ease-out-expo flex items-center gap-2 transition-transform duration-500",
              inset && "-translate-x-2 md:-translate-x-3",
            )}
          >
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
