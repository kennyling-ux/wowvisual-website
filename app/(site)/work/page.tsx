import type { Metadata } from "next";
import { Suspense } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitHeadline } from "@/components/ui/split-headline";
import { Reveal } from "@/components/ui/reveal";
import { PlayCursor } from "@/components/work/play-cursor";
import { WorkBrowser, WorkBrowserWithParams } from "@/components/work/work-browser";
import { usedCategories, work, workCopy } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: workCopy.page.intro,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="container-site pt-[calc(var(--header-h)+clamp(48px,8vw,112px))] pb-(--section-pad)">
      <header className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{work.length} films</Eyebrow>
          </Reveal>
          <SplitHeadline
            as="h1"
            trigger="mount"
            text={workCopy.page.title}
            className="text-display mt-5"
          />
        </div>
        <Reveal delay={0.3} className="lg:col-span-5">
          <p className="text-body-l text-fg-muted max-w-[44ch]">{workCopy.page.intro}</p>
        </Reveal>
      </header>

      {/* Static "All" grid is prerendered; the URL-aware version takes over on the client */}
      <Suspense fallback={<WorkBrowser items={work} categories={usedCategories} />}>
        <WorkBrowserWithParams items={work} categories={usedCategories} />
      </Suspense>
      <PlayCursor />
    </div>
  );
}
