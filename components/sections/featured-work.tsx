import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeadline } from "@/components/ui/split-headline";
import { TextLink } from "@/components/ui/text-link";
import { PlayCursor } from "@/components/work/play-cursor";
import { WorkCard } from "@/components/work/work-card";
import { featuredWork, workCopy } from "@/content/work";

/** "Featured productions" 2-column video grid (§6.8). */
export function FeaturedWork() {
  const items = featuredWork.slice(0, 6);
  if (!items.length) return null;

  return (
    <Section id="work" aria-labelledby="featured-heading">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow>{workCopy.home.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline as="h2" text={workCopy.home.title} className="text-h2 mt-4" />
          <span id="featured-heading" className="sr-only">
            {workCopy.home.title}
          </span>
        </div>
        <Reveal>
          <TextLink href="/work" arrow="trailing">
            {workCopy.home.viewAll}
          </TextLink>
        </Reveal>
      </div>

      <RevealGroup className="grid gap-4 md:grid-cols-2 md:gap-6" gap={0.08}>
        {items.map((item) => (
          <RevealItem key={item.slug}>
            <WorkCard item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
      <PlayCursor />
    </Section>
  );
}
