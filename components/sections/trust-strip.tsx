import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { trust } from "@/content/site";

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 48"
      className="text-fg-faint h-12 w-6 shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
    >
      <path d="M20 46c-6-4-10-11-10-20S14 8 20 2l1 1C16 9 12 16 12 26s3 15 9 19z" />
      {[8, 15, 22, 29, 36].map((y, i) => (
        <ellipse
          key={y}
          cx={i % 2 ? 8 : 7}
          cy={y}
          rx="5"
          ry="2.4"
          transform={`rotate(-35 8 ${y})`}
        />
      ))}
    </svg>
  );
}

/**
 * Trust strip (§6.3): client logos marquee → award laurels → nothing.
 * [CONFIRM] Driven entirely by `trust` in /content/site.ts; never invent brands.
 */
export function TrustStrip() {
  if (trust.clients.length) {
    return (
      <section aria-label={trust.label} className="container-site py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
          <p className="text-label text-fg-muted shrink-0 md:max-w-[16ch]">{trust.label}</p>
          <Marquee
            pauseOnHover
            speed={40}
            className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            {trust.clients.map((c) => (
              <span key={c.name} className="flex items-center px-8 md:px-10">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  className="h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:invert"
                />
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    );
  }

  if (trust.awards.length) {
    return (
      <section aria-label="Awards and selections" className="container-site py-10 md:py-14">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {trust.awards.map((a) => (
            <li key={a.title + a.detail} className="flex items-center gap-2 text-center">
              <Laurel />
              <span className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">{a.title}</span>
                {a.detail && <span className="text-label text-fg-muted">{a.detail}</span>}
              </span>
              <Laurel flip />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return null;
}
