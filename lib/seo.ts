import { hero, site } from "@/content/site";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

export const seo = {
  defaultTitle: "WOW VISUAL — Video Production Studio in Kuala Lumpur", // [CONFIRM] location
  description:
    "WOW VISUAL is a Kuala Lumpur video production studio making commercials, corporate films, event coverage and social content for Malaysian brands.", // [CONFIRM]
  keywords: [
    "video production Kuala Lumpur",
    "corporate video Malaysia",
    "event videography KL",
    "TVC production Malaysia",
    "social media video Malaysia",
    "WOW VISUAL",
  ],
  ogHeadline: hero.headline,
};

/** Organization structured data (§11). Upgrade to LocalBusiness once an address is confirmed. [CONFIRM] */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    logo: `${siteUrl}/apple-icon`,
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    areaServed: { "@type": "Country", name: "Malaysia" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      name: site.contact.person,
      telephone: site.contact.phoneHref.replace("tel:", ""),
      email: site.contact.email,
      availableLanguage: ["English", "Malay", "Chinese"], // [CONFIRM]
    },
    sameAs: site.socials.map((s) => s.href),
  };
}
