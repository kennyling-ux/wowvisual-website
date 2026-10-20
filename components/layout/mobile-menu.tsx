"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { nav, site } from "@/content/site";
import { ease } from "@/lib/motion";
import { useAnchorNav } from "@/lib/use-anchor-nav";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";

export function MobileMenu({
  open,
  onClose,
  logo,
}: {
  open: boolean;
  onClose: () => void;
  logo: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onAnchor = useAnchorNav();
  // Stable close callback even though the parent passes a new onClose each render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const close = useCallback(() => onCloseRef.current(), []);

  useScrollLock(open);
  useFocusTrap(ref, open, close);

  // Close when the route changes (not on first mount)
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      close();
    }
  }, [pathname, close]);

  // Close if resized up to desktop
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && close();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-bg text-fg fixed inset-0 z-[60] flex flex-col lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: ease.inOut }}
        >
          <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between">
            <Link href="/" onClick={close} className="-m-2 inline-flex min-h-11 items-center p-2">
              {logo}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="border-border hover:bg-surface-2 grid size-11 place-items-center rounded-full border"
            >
              <X size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-site flex flex-1 flex-col justify-center overflow-y-auto py-8"
          >
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
            >
              {nav.links.map((link, i) => (
                <li
                  key={link.href}
                  className="border-border overflow-hidden border-b first:border-t"
                >
                  <motion.div
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.7, ease: ease.out },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => onAnchor(e, link.href, close)}
                      className="group flex min-h-16 items-baseline justify-between gap-4 py-3"
                    >
                      <span className="group-hover:text-accent-text text-[clamp(2.25rem,9vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] transition-colors">
                        {link.label}
                      </span>
                      <span className="text-label text-fg-muted tabular-nums">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>
          </nav>

          <motion.div
            className="container-site flex shrink-0 flex-col gap-3 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.6, ease: ease.out },
            }}
          >
            <Button
              href={nav.cta.href}
              onClick={(e) => onAnchor(e, nav.cta.href, close)}
              size="lg"
              className="w-full sm:w-auto sm:flex-1"
            >
              {nav.cta.label}
            </Button>
            <Button
              href={site.contact.whatsappHref}
              variant="secondary"
              size="lg"
              icon={<WhatsAppIcon size={18} />}
              className="w-full sm:w-auto sm:flex-1"
            >
              WhatsApp us
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
