"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { workCopy, type Category, type WorkItem } from "@/content/work";
import { cn } from "@/lib/cn";
import { ease, layoutTransition } from "@/lib/motion";
import { WorkCard } from "./work-card";

type Filter = "all" | Lowercase<Category>;

const toFilter = (v: string | null, cats: readonly Category[]): Filter =>
  v && cats.some((c) => c.toLowerCase() === v) ? (v as Filter) : "all";

type Props = { items: WorkItem[]; categories: readonly Category[] };

/** Reads ?category= from the URL (must sit inside <Suspense>). */
export function WorkBrowserWithParams(props: Props) {
  const params = useSearchParams();
  const initial = toFilter(params.get("category"), props.categories);
  return <WorkBrowser {...props} initial={initial} key={initial} />;
}

/** Filter chips + animated grid (§7.1). Filter state mirrored to ?category=. */
export function WorkBrowser({ items, categories, initial = "all" }: Props & { initial?: Filter }) {
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<Filter>(initial);

  const visible =
    filter === "all" ? items : items.filter((i) => i.category.toLowerCase() === filter);
  const counts = Object.fromEntries(
    categories.map((c) => [c, items.filter((i) => i.category === c).length]),
  );

  function choose(next: Filter) {
    setFilter(next);
    const url = next === "all" ? pathname : `${pathname}?category=${next}`;
    router.replace(url, { scroll: false });
  }

  const chips: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: workCopy.page.all, count: items.length },
    ...categories.map((c) => ({ value: c.toLowerCase() as Filter, label: c, count: counts[c] })),
  ];

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label={workCopy.page.filterLabel}
        className="-mx-(--container-pad) -mt-1.5 mb-7 [scrollbar-width:none] overflow-x-auto px-(--container-pad) py-1.5 md:mb-12 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-2">
          {chips.map((chip) => {
            const active = filter === chip.value;
            return (
              <li key={chip.value}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(chip.value)}
                  className={cn(
                    "relative inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors duration-200",
                    active
                      ? "text-bg border-transparent"
                      : "border-border text-fg-muted hover:border-fg-faint hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="work-chip"
                      className="bg-fg absolute inset-0 -z-10 rounded-full"
                      transition={layoutTransition}
                    />
                  )}
                  <span className="relative">{chip.label}</span>
                  <span
                    className={cn(
                      "relative text-xs tabular-nums",
                      active ? "text-bg/70" : "text-fg-muted",
                    )}
                  >
                    {chip.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "film" : "films"}
      </p>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ layout: layoutTransition, duration: 0.4, ease: ease.out }}
            >
              <WorkCard
                item={item}
                size="md"
                priority={i < 3} // first row is the LCP on /work
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {!visible.length && <p className="text-fg-muted py-16 text-center">{workCopy.page.empty}</p>}
    </LayoutGroup>
  );
}
