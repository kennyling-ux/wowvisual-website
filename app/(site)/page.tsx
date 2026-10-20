import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { nav, site } from "@/content/site";

// TEMPORARY scaffold for Phase 2 (layout testing). Sections are replaced in Phases 3–7.
const stubs = [
  { id: "about", eyebrow: "Who we are", title: "About" },
  { id: "services", eyebrow: "Services", title: "What we make" },
  { id: "process", eyebrow: "Process", title: "How we work" },
  { id: "contact", eyebrow: "Contact", title: "Start a project" },
];

export default function Home() {
  return (
    <>
      <div className="p-2 md:p-3">
        <section
          data-hero
          className="rounded-card relative flex min-h-[80svh] flex-col justify-end overflow-hidden bg-[#0b0b0b] text-white md:min-h-[88vh]"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_90%_at_15%_100%,rgba(217,45,32,0.35),transparent_60%),radial-gradient(50%_70%_at_85%_10%,rgba(255,255,255,0.08),transparent_60%)]"
          />
          <div className="container-site relative pb-10 md:pb-14">
            <Eyebrow tone="onDark">Video Production Studio · {site.location}</Eyebrow>
            <h1 className="text-display mt-6 max-w-[12ch]">Visuals that make people say wow.</h1>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={nav.cta.href}>{nav.cta.label}</Button>
            </div>
          </div>
        </section>
      </div>

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
