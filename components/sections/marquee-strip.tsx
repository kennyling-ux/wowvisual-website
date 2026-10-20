import { Marquee } from "@/components/ui/marquee";
import { marquee } from "@/content/site";

/** Oversized scrolling strip (§6.4). Scroll velocity nudges speed/direction. */
export function MarqueeStrip() {
  return (
    <section aria-label={marquee.label} className="border-border border-y py-6 md:py-10">
      <p className="sr-only">{marquee.items.join(", ")}</p>
      <div aria-hidden>
        <Marquee speed={55} scrollReactive>
          {marquee.items.map((item) => (
            <span
              key={item}
              className="flex items-center text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.045em] whitespace-nowrap uppercase"
            >
              <span className="px-[0.28em]">{item}</span>
              <span className="text-accent">—</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
