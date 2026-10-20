import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { privacy } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How WOW VISUAL handles personal data under Malaysia's PDPA 2010.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="container-site pt-[calc(var(--header-h)+clamp(48px,8vw,112px))] pb-(--section-pad)">
      <div className="mx-auto max-w-[760px]">
        <Eyebrow>
          {privacy.updatedLabel}: {privacy.updated}
        </Eyebrow>
        <h1 className="text-h2 mt-5">{privacy.title}</h1>
        <p className="text-body-l text-fg-muted mt-6">{privacy.intro}</p>

        <div className="mt-12 flex flex-col">
          {privacy.sections.map((s, i) => (
            <section
              key={s.heading}
              className="border-border grid gap-4 border-t py-8 md:grid-cols-[3rem_1fr] md:gap-6"
            >
              <span className="text-label text-fg-muted tabular-nums md:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-h3">{s.heading}</h2>
                <div className="text-fg-muted mt-3 flex flex-col gap-3">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
