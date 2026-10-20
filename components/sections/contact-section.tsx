import { Clock, Mail, User } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeadline } from "@/components/ui/split-headline";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { contact, site } from "@/content/site";

/** Contact (§6.13): direct contacts left, form right. */
export function ContactSection() {
  const rows = [
    {
      icon: <User size={18} aria-hidden />,
      label: contact.direct.personLabel,
      value: site.contact.person,
    },
    {
      icon: <WhatsAppIcon size={18} />,
      label: contact.direct.whatsappLabel,
      value: site.contact.phoneDisplay,
      href: site.contact.whatsappHref,
    },
    {
      icon: <Mail size={18} aria-hidden />,
      label: contact.direct.emailLabel,
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
  ];

  return (
    <Section id={contact.id} aria-labelledby="contact-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            as="h2"
            id="contact-heading"
            text={contact.title}
            className="text-h2 mt-4"
          />
          <Reveal>
            <p className="text-body-l text-fg-muted mt-6 max-w-[38ch]">{contact.intro}</p>
          </Reveal>

          <Reveal className="mt-10 md:mt-12">
            <h3 className="text-label text-fg-muted">{contact.direct.heading}</h3>
            <ul className="border-border mt-4 border-t">
              {rows.map((r) => {
                const inner = (
                  <>
                    <span className="border-border text-fg grid size-10 shrink-0 place-items-center rounded-full border">
                      {r.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-fg-muted text-sm">{r.label}</span>
                      <span className="truncate text-lg font-medium tracking-[-0.01em]">
                        {r.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={r.label} className="border-border border-b">
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group hover:text-accent-text flex min-h-16 items-center gap-4 py-3 transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex min-h-16 items-center gap-4 py-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="text-fg-muted mt-5 flex items-center gap-2 text-sm">
              <Clock size={16} aria-hidden /> {site.contact.responseTime}
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-card border-border bg-surface border p-5 sm:p-8 md:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
