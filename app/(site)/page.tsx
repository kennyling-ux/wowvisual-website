import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { AboutStatement } from "@/components/sections/about-statement";
import { FeaturedWork } from "@/components/sections/featured-work";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { ImageStrip } from "@/components/sections/image-strip";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";

// TEMPORARY contact stub — replaced in Phase 7.
const stubs = [{ id: "contact", eyebrow: "Contact", title: "Start a project" }];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <div className="pt-10 md:pt-16">
        <MarqueeStrip />
      </div>
      <AboutStatement />
      <ImageStrip />
      <Stats />
      <FeaturedWork />
      <Services />
      <Process />
      <Testimonials />
      <FinalCta />

      {stubs.map((s) => (
        <Section key={s.id} id={s.id} className="border-border border-b">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-4">{s.title}</h2>
          <p className="text-body-l measure text-fg-muted mt-6">Section coming in a later phase.</p>
        </Section>
      ))}
    </>
  );
}
