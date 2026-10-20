import type { Metadata } from "next";
import { AboutStatement } from "@/components/sections/about-statement";
import { ContactSection } from "@/components/sections/contact-section";
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

export const metadata: Metadata = { alternates: { canonical: "/" } };

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

      <ContactSection />
    </>
  );
}
