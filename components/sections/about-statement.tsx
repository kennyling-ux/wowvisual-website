import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ScrollFillText } from "@/components/ui/scroll-fill-text";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { about } from "@/content/site";

export function AboutStatement() {
  return (
    <Section
      id={about.id}
      aria-labelledby="about-heading"
      className="pb-[calc(var(--section-pad)*0.6)]"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3 lg:pt-[0.6em]">
          <Reveal>
            <Eyebrow>
              <span id="about-heading">{about.eyebrow}</span>
            </Eyebrow>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrollFillText
            text={about.statement}
            className="text-[clamp(1.875rem,4.4vw,4rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
          />
          <div className="mt-10 flex justify-end md:mt-14">
            <TextLink href={about.link.href}>{about.link.label}</TextLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
