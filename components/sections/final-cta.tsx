import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeadline } from "@/components/ui/split-headline";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { finalCta, site } from "@/content/site";

/** "Let's make something wow." band (§6.12) — dark inset card bookending the hero. */
export function FinalCta() {
  return (
    <div className="p-2 md:p-3">
      <section
        aria-labelledby="cta-heading"
        className="rounded-card bg-hero-ink relative isolate overflow-hidden px-(--container-pad) py-[clamp(96px,14vw,200px)] text-center text-white ring-1 ring-transparent ring-inset dark:ring-white/[0.07]"
      >
        <div aria-hidden className="cta-glow" />
        <div aria-hidden className="hero-grain" />
        <SplitHeadline
          as="h2"
          id="cta-heading"
          text={finalCta.headline}
          className="mx-auto max-w-[14ch] text-[clamp(2.5rem,10.5vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
        />
        <Reveal delay={0.3}>
          <p className="text-body-l mx-auto mt-8 max-w-[44ch] text-white/75">{finalCta.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={site.contact.whatsappHref} size="lg" icon={<WhatsAppIcon size={18} />}>
              {finalCta.whatsapp}
            </Button>
            <Button
              href={`mailto:${site.contact.email}`}
              variant="inverse"
              size="lg"
              icon={<Mail size={18} aria-hidden />}
            >
              {finalCta.email}
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
