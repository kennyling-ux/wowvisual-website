"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ytThumb } from "@/lib/youtube";

type Service = {
  name: string;
  description: string;
  category?: string;
  previewYoutubeId?: string;
  image?: string;
};

const previewSrc = (s: Service) =>
  s.image ?? (s.previewYoutubeId ? ytThumb(s.previewYoutubeId) : undefined);

/**
 * Numbered service rows (§6.9). Desktop (lg+, fine pointer): row links to the
 * matching work, with a preview that follows the cursor. Below lg: accordion
 * with the preview inside. Rows without a preview image show none.
 */
export function ServicesList({
  items,
  viewWork,
  askAbout,
}: {
  items: Service[];
  viewWork: string;
  askAbout: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const hoveredItem = hovered !== null ? items[hovered] : null;
  const hoveredSrc = hoveredItem ? previewSrc(hoveredItem) : undefined;

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ol className="border-border border-t">
        {items.map((s, i) => {
          const num = String(i + 1).padStart(2, "0");
          const href = s.category ? `/work?category=${s.category}` : "/#contact";
          const src = previewSrc(s);
          const panelId = `${baseId}-panel-${i}`;
          const isOpen = open === i;
          return (
            <li key={s.name} className="border-border border-b">
              {/* Desktop row */}
              <Link
                href={href}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                onFocus={() => setHovered(null)}
                className="group/row hidden grid-cols-12 items-center gap-8 py-8 lg:grid"
              >
                <span className="text-label text-fg-muted col-span-1 tabular-nums">{num}</span>
                <span className="text-h3 ease-out-expo col-span-5 transition-transform duration-500 group-hover/row:translate-x-2">
                  {s.name}
                </span>
                <span className="text-fg-muted col-span-5">{s.description}</span>
                <span className="col-span-1 flex justify-end">
                  <span className="border-border group-hover/row:bg-accent group-hover/row:text-on-accent grid size-11 place-items-center rounded-full border transition-colors duration-300 group-hover/row:border-transparent">
                    <ArrowUpRight size={18} aria-hidden />
                  </span>
                </span>
                <span className="sr-only">— {viewWork}</span>
              </Link>

              {/* Mobile / tablet accordion */}
              <div className="lg:hidden">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="text-label text-fg-muted w-7 shrink-0 tabular-nums">
                      {num}
                    </span>
                    <span className="text-h3 flex-1">{s.name}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "border-border grid size-10 shrink-0 place-items-center rounded-full border transition-transform duration-300",
                        isOpen && "bg-fg text-bg rotate-45 border-transparent",
                      )}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={s.name}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: ease.inOut }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-5 pb-6 pl-11">
                        <p className="text-fg-muted">{s.description}</p>
                        {src && (
                          <div className="rounded-card relative aspect-video overflow-hidden">
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes="(min-width: 768px) 80vw, 100vw"
                              className="object-cover saturate-[0.9]"
                            />
                          </div>
                        )}
                        <Link
                          href={href}
                          className="inline-flex min-h-11 w-fit items-center gap-2 font-medium"
                        >
                          {s.category ? viewWork : askAbout}
                          <ArrowUpRight size={16} aria-hidden />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Cursor-following preview (desktop, mouse only; hidden under reduced motion) */}
      <AnimatePresence>
        {hoveredSrc && (
          <motion.div
            aria-hidden
            className="rounded-card pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[4/3] w-[300px] overflow-hidden shadow-2xl motion-reduce:!hidden lg:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={hovered}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              >
                <Image
                  src={hoveredSrc}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover saturate-[0.9]"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
