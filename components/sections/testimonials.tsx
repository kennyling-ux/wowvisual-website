import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { testimonials } from "@/content/site";
import { TestimonialsCarousel } from "./testimonials-carousel";

/** Hidden until real, approved testimonials are added to content. [CONFIRM] */
export function Testimonials() {
  if (!testimonials.items.length) return null;
  return (
    <Section aria-label={testimonials.label} className="border-border border-t">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-9">
          <TestimonialsCarousel
            items={testimonials.items}
            label={testimonials.label}
            prev={testimonials.prev}
            next={testimonials.next}
          />
        </Reveal>
      </div>
    </Section>
  );
}
