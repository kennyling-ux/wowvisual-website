import { CountUp } from "@/components/ui/count-up";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { stats } from "@/content/site";

/** 4-column stats with dotted dividers (§6.7). Hidden until real numbers exist. */
export function Stats() {
  const items = stats.items.filter((s): s is typeof s & { value: number } => s.value !== null);
  if (!items.length) return null;

  return (
    <section aria-labelledby="stats-heading" className="container-site pb-(--section-pad)">
      <Reveal>
        <Eyebrow>
          <span id="stats-heading">{stats.eyebrow}</span>
        </Eyebrow>
      </Reveal>
      <RevealGroup
        className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:mt-14 md:gap-y-12 ${items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : ""}`}
      >
        {items.map((s) => (
          <RevealItem key={s.label} className="border-dotted-top pt-6 md:pt-8">
            <p className="text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-semibold tracking-[-0.05em]">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-4 font-medium">{s.label}</p>
            <p className="text-fg-muted mt-1 max-w-[30ch]">{s.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
