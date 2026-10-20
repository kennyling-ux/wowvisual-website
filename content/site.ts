/**
 * All site copy lives here (§8). Components must not hard-code copy.
 * Anything marked [CONFIRM] is placeholder — see handoff list.
 */

const whatsappNumber = "601110781678";
const whatsappMessage = "Hi Wow Visual, I'm interested in a video project. ";

export const site = {
  name: "WOW VISUAL",
  legalName: "WOW VISUAL SDN. BHD.",
  companyNo: "20261019055 (1681152-V)", // [CONFIRM] new-format SSM numbers are 12 digits
  url: "https://wowvisual.my",
  tagline: "Video production studio", // [CONFIRM]
  location: "Kuala Lumpur", // [CONFIRM]
  contact: {
    person: "Adrian Poon",
    phoneDisplay: "+60 11-1078 1678",
    phoneHref: "tel:+601110781678",
    email: "wowvisualofficial@gmail.com",
    whatsappNumber,
    whatsappMessage,
    whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    responseTime: "We reply within 1 working day", // [CONFIRM]
  },
  socials: [
    { label: "YouTube", href: "https://youtube.com/@wowvisualofficial" },
    // [CONFIRM] Instagram / Facebook / TikTok / LinkedIn — add as { label, href }
  ],
} as const;

export const nav = {
  links: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "Start a project", href: "/#contact" },
} as const;

export const hero = {
  eyebrow: `Video Production Studio · Kuala Lumpur`, // [CONFIRM] location
  headline: "Visuals that make people say wow.",
  intro:
    "Commercials, corporate films, events and social content for brands that want to be remembered.", // [CONFIRM]
  primaryCta: { label: "Watch showreel" },
  secondaryCta: { label: "Start a project", href: "/#contact" },
  /**
   * [CONFIRM] YouTube ID of the full showreel. While empty, "Watch showreel"
   * opens the YouTube channel in a new tab instead of the video modal.
   */
  showreelYoutubeId: "",
  tags: ["Concept", "Production", "Post-production", "Delivery"],
  media: {
    /** Files in /public/video — used automatically when present. [CONFIRM] client to supply */
    mp4: "/video/hero-loop.mp4",
    webm: "/video/hero-loop.webm",
    poster: "/video/hero-poster.jpg",
    alt: "", // decorative background
  },
} as const;

/**
 * Trust strip (§6.3). [CONFIRM] Only add brands the client has permission to show —
 * never invent them. Logos go in /public/clients (monochrome-friendly SVG preferred).
 * If both lists are empty the strip is skipped entirely.
 */
export const trust = {
  label: "Trusted by brands across Malaysia",
  clients: [] as { name: string; logo: string; width: number; height: number }[],
  awards: [] as { title: string; detail?: string }[], // e.g. { title: "Official Selection", detail: "KL Film Festival 2025" }
};

export const marquee = {
  items: ["Commercials", "Corporate films", "Event coverage", "Social content", "Motion graphics"],
  label: "What we make",
} as const;

export const about = {
  id: "about",
  eyebrow: "Who we are",
  statement:
    "We're a Kuala Lumpur production studio turning ideas into films that sell, inform and move people.", // [CONFIRM]
  link: { label: "About the studio", href: "/#services" }, // [CONFIRM] no About page in v1 — points to Services
} as const;

/**
 * Image strip (§6.6) — 4–6 behind-the-scenes stills / frames, 3:4, in /public/images.
 * [CONFIRM] Until real stills are supplied, cinematic placeholder frames are shown
 * (decorative, no claims). Add items as { src: "/images/bts-01.jpg", alt: "…" }.
 */
export const imageStrip = {
  label: "Behind the scenes",
  images: [] as { src: string; alt: string }[],
  placeholderCount: 6,
};

/**
 * Stats (§6.7). [CONFIRM] ALL numbers with the client — never invent them.
 * A stat with `value: null` is not shown; the section is hidden until at least one is set.
 */
// [CONFIRM] descriptions too
export const stats = {
  eyebrow: "In numbers",
  items: [
    {
      value: null as number | null,
      suffix: "+",
      label: "Projects delivered",
      description: "Commercials, corporate films and event coverage.",
    },
    {
      value: null as number | null,
      suffix: "+",
      label: "Brands served",
      description: "Brands we have filmed for across Malaysia.",
    },
    {
      value: null as number | null,
      suffix: "+",
      label: "Years of experience",
      description: "Behind the camera and in the edit suite.",
    },
    {
      value: null as number | null,
      suffix: "",
      label: "Videos on YouTube",
      description: "Published on our channel — and counting.",
    },
  ],
};

export const footer = {
  tagline: "Commercials, corporate films, events and social content from Kuala Lumpur.", // [CONFIRM]
  backToTop: "Back to top",
  privacyLabel: "Privacy",
} as const;

export const floatingWhatsApp = {
  label: "Chat with us on WhatsApp",
} as const;

export function whatsappLink(message: string = whatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
