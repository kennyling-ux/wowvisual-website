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
  socials: {
    youtube: "https://youtube.com/@wowvisualofficial",
    // [CONFIRM] Instagram / Facebook / TikTok / LinkedIn
  },
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

export function whatsappLink(message: string = whatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
