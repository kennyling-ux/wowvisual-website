import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { notFound } from "@/content/privacy";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

/** Custom 404 in the site's style (§5). */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="px-2 pt-(--header-h) pb-2 md:px-3 md:pb-3">
          <section className="rounded-card bg-hero-ink relative isolate flex min-h-[calc(88svh-var(--header-h))] flex-col justify-end overflow-hidden px-(--container-pad) pt-24 pb-10 text-white ring-1 ring-transparent ring-inset md:pb-14 dark:ring-white/[0.07]">
            <div aria-hidden className="absolute inset-0 -z-10 scale-110">
              <div className="hero-glow" />
              <div className="hero-grain" />
            </div>
            <p
              aria-hidden
              className="pointer-events-none absolute top-6 right-(--container-pad) text-[clamp(7rem,28vw,24rem)] leading-none font-semibold tracking-[-0.06em] text-white/10 select-none"
            >
              {notFound.code}
            </p>
            <Eyebrow tone="onDark">Error {notFound.code}</Eyebrow>
            <h1 className="text-display mt-5 max-w-[14ch]">{notFound.title}</h1>
            <p className="text-body-l mt-6 max-w-[44ch] text-white/75">{notFound.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/">{notFound.home}</Button>
              <Button href="/work" variant="inverse">
                {notFound.work}
              </Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
