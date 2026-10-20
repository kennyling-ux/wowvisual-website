import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeadline } from "@/components/ui/split-headline";
import { services } from "@/content/site";
import { ServicesList } from "./services-list";

export function Services() {
  return (
    <Section id={services.id} aria-labelledby="services-heading">
      <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{services.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            as="h2"
            id="services-heading"
            text={services.title}
            className="text-h2 mt-4"
          />
        </div>
        <Reveal className="lg:col-span-5">
          <p className="text-body-l text-fg-muted max-w-[40ch]">{services.intro}</p>
        </Reveal>
      </div>
      <Reveal>
        <ServicesList
          items={services.items}
          viewWork={services.viewWork}
          askAbout={services.askAbout}
        />
      </Reveal>
    </Section>
  );
}
