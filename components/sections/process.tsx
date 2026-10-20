import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeadline } from "@/components/ui/split-headline";
import { processSteps } from "@/content/site";
import { ProcessSteps } from "./process-steps";

export function Process() {
  return (
    <Section
      id={processSteps.id}
      aria-labelledby="process-heading"
      className="border-border border-t"
    >
      <div className="mb-12 md:mb-20">
        <Reveal>
          <Eyebrow>{processSteps.eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeadline
          as="h2"
          id="process-heading"
          text={processSteps.title}
          className="text-h2 mt-4"
        />
      </div>
      <ProcessSteps steps={processSteps.steps} />
    </Section>
  );
}
