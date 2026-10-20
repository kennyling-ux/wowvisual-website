import { site } from "./site";

/**
 * Privacy notice (PDPA 2010) for the contact form and site.
 * [CONFIRM] Plain-language draft — have the client (or their adviser) review it
 * before launch. Not legal advice.
 */
export const privacy = {
  title: "Privacy notice",
  intro: `This notice explains how ${site.legalName} ("WOW VISUAL", "we") handles personal data you share with us through wowvisual.my, in line with Malaysia’s Personal Data Protection Act 2010 (PDPA).`,
  updated: "20 October 2026",
  updatedLabel: "Last updated",
  sections: [
    {
      heading: "What we collect",
      body: [
        "When you send an enquiry we collect your name, company (optional), email, phone / WhatsApp number, the service and budget range you choose, and your project details.",
        "If you contact us by WhatsApp or email directly, we receive the details you include in that message.",
        "Our site uses Vercel Analytics and Speed Insights, which measure page views and performance in aggregate without cookies and without identifying you.",
      ],
    },
    {
      heading: "Why we use it",
      body: [
        "To reply to your enquiry, prepare a proposal or quote, and — if you go ahead — plan and deliver your project.",
        "We do not sell your personal data or use it for unrelated marketing.",
      ],
    },
    {
      heading: "Who handles it",
      body: [
        "Form messages are delivered to our inbox by Resend, an email delivery provider. Our team reads them in our business email account.",
        "WhatsApp conversations are handled through WhatsApp (Meta). Embedded YouTube videos load from youtube-nocookie.com only after you press play; YouTube’s own policies apply once a video plays.",
        "Some of these providers store data on servers outside Malaysia. We only use providers that protect data appropriately.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We keep enquiry details only as long as we need them to respond, to run a project with you, or to meet legal and accounting obligations. You can ask us to delete them at any time.", // [CONFIRM] retention period
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the PDPA you can ask to access or correct your personal data, withdraw your consent, or limit how we process it. Supplying your details is voluntary, but without them we can’t reply to your enquiry.",
      ],
    },
    {
      heading: "Contact us",
      body: [
        `For any privacy request, email ${site.contact.email} or WhatsApp ${site.contact.phoneDisplay} (${site.contact.person}).`,
      ],
    },
  ],
};

export const notFound = {
  code: "404",
  title: "This scene didn’t make the final cut.",
  body: "The page you’re looking for has moved or never existed. Let’s get you back to the good part.",
  home: "Back to home",
  work: "View our work",
};
