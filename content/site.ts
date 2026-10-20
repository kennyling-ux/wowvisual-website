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
  label: "Our craft",
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

/**
 * Services (§6.9). [CONFIRM] final list, order and descriptions with the client.
 * `category` links the row to /work?category=…; `previewYoutubeId` borrows a real
 * frame from the channel for the hover/accordion preview (or set `image` in /public/images).
 */
export const services = {
  id: "services",
  eyebrow: "Services",
  title: "What we make",
  intro: "One team from first idea to final export — so the film you approve is the film you get.", // [CONFIRM]
  viewWork: "See the work",
  askAbout: "Ask us about it",
  items: [
    {
      name: "TVC & commercial video",
      description: "Broadcast and online commercials, from script to final grade.",
      category: "commercial",
      previewYoutubeId: "f8CiYaB2Hds",
    },
    {
      name: "Corporate & brand films",
      description: "Company profiles, brand stories and recruitment films.",
      category: "corporate",
      previewYoutubeId: "eLljJlXoEis",
    },
    {
      name: "Event coverage & highlights",
      description: "Multi-camera coverage and highlight reels of your event.",
      category: "event",
      previewYoutubeId: "VQY-Bkm3nSE",
    },
    {
      name: "Social media content",
      description: "Reels, TikTok and Shorts made vertical-first to stop the scroll.",
      category: "social",
      previewYoutubeId: "bUChY8Wv6y4",
    },
    {
      name: "Motion graphics & animation",
      description: "Titles, explainers and animated brand assets.",
      category: undefined,
      previewYoutubeId: undefined,
    },
    {
      name: "Product & lifestyle photography",
      description: "Stills for campaigns, e-commerce and social.",
      category: undefined,
      previewYoutubeId: undefined,
    },
  ] as {
    name: string;
    description: string;
    category?: string;
    previewYoutubeId?: string;
    image?: string;
  }[],
};

/** Process (§6.10). [CONFIRM] descriptions. */
export const processSteps = {
  id: "process",
  eyebrow: "Process",
  title: "How we work",
  steps: [
    {
      title: "Brief & concept",
      description:
        "We learn your goals, audience and budget, then shape a concept you can sign off.",
    },
    {
      title: "Pre-production",
      description:
        "Script, storyboard, casting, locations and schedule — locked before the camera rolls.",
    },
    {
      title: "Production / shoot",
      description:
        "Our crew captures it with professional camera, lighting and sound, on location or in studio.",
    },
    {
      title: "Post & delivery",
      description: "Edit, colour, sound and motion graphics, delivered in every format you need.",
    },
  ],
};

/**
 * Testimonials (§6.11). [CONFIRM] Only real quotes with permission — the section is
 * hidden while this list is empty.
 */
export const testimonials = {
  eyebrow: "Kind words",
  label: "Client testimonials",
  prev: "Previous testimonial",
  next: "Next testimonial",
  items: [] as { quote: string; name: string; role?: string; company?: string }[],
};

export const finalCta = {
  headline: "Let’s make something wow.",
  sub: "Tell us about your project — we usually start with a quick WhatsApp chat.", // [CONFIRM]
  whatsapp: "WhatsApp us",
  email: "Email us",
} as const;

/** Contact section + form (§6.13). */
export const contact = {
  id: "contact",
  eyebrow: "Contact",
  title: "Start a project",
  intro: "Tell us what you're making. The more we know, the sharper our first reply.", // [CONFIRM]
  direct: {
    heading: "Talk to us directly",
    personLabel: "Your contact",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    company: { label: "Company", placeholder: "Optional" },
    email: { label: "Email", placeholder: "name@company.com" },
    phone: { label: "Phone / WhatsApp", placeholder: "+60 12-345 6789" },
    service: { label: "Service", placeholder: "Choose a service" },
    budget: { label: "Budget range", placeholder: "Choose a range" },
    message: {
      label: "Project details",
      placeholder: "What are you making, for whom, and by when?",
    },
    consent: {
      before:
        "I agree to WOW VISUAL processing my details to reply to this enquiry, as described in the",
      link: "privacy notice",
      after: ".",
    },
    required: "required",
  },
  serviceOptions: [
    "TVC & commercial video",
    "Corporate & brand films",
    "Event coverage & highlights",
    "Social media content",
    "Motion graphics & animation",
    "Product & lifestyle photography",
    "Something else / not sure",
  ],
  budgetOptions: ["Below RM5k", "RM5k–15k", "RM15k–50k", "RM50k+", "Not sure yet"], // [CONFIRM] ranges
  errors: {
    name: "Please tell us your name.",
    email: "Enter a valid email, e.g. name@company.com",
    phone: "Enter a phone number we can reach you on.",
    message: "Tell us a little about the project (at least 10 characters).",
    consent: "Please agree so we can reply to you.",
  },
  submit: "Send enquiry",
  sending: "Sending…",
  loading: "Loading form…",
  success: {
    title: "Message sent",
    body: (name: string) => `Thanks, ${name} — we'll be in touch within 1 working day.`, // [CONFIRM] response time
    again: "Send another message",
  },
  failure: {
    title: "We couldn't send that just now",
    body: "Your message is ready to go on WhatsApp instead — it opens with everything you wrote.",
    unavailableTitle: "Send it on WhatsApp",
    unavailableBody:
      "Our email form is being set up. WhatsApp opens with your message ready to send.",
    rateLimited:
      "You've sent a few messages in a short time. Please try again in a few minutes, or use WhatsApp.",
    cta: "Send via WhatsApp",
    retry: "Try again",
  },
} as const;

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
