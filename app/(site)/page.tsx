import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { AboutStatement } from "@/components/sections/about-statement";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { ImageStrip } from "@/components/sections/image-strip";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Stats } from "@/components/sections/stats";
import { TrustStrip } from "@/components/sections/trust-strip";

// TEMPORARY anchor stubs — replaced in Phases 6–7.
const stubs = [
  { id: "services", eyebrow: "Services", title: "What we make" },
  { id: "process", eyebrow: "Process", title: "How we work" },
  { id: "contact", eyebrow: "Contact", title: "Start a project" },
];

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
