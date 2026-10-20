import Link from "next/link";
import { BrandWordmark } from "@/components/ui/brand";
import { Logo } from "@/components/ui/logo";
import { footer, nav, site } from "@/content/site";
import { BackToTop } from "./back-to-top";
import { CurrentYear } from "./current-year";

const linkClass =
  "inline-flex min-h-11 items-center text-fg-muted transition-colors duration-200 hover:text-fg md:min-h-9";

export function SiteFooter() {
  return (
    <footer className="border-border bg-bg border-t">
      <div className="container-site pt-16 pb-24 md:pt-24 md:pb-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-4">
            <Link
              href="/"
              aria-label="WOW VISUAL — home"
              className="-m-2 inline-flex min-h-11 w-fit items-center p-2"
            >
              <Logo />
            </Link>
            <p className="text-body measure text-fg-muted max-w-[36ch]">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-label text-fg mb-3">Explore</h2>
            <ul className="flex flex-col">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="order-last col-span-2 lg:order-none lg:col-span-4">
            <h2 className="text-label text-fg mb-3">Contact</h2>
            <ul className="flex flex-col">
              <li className="text-fg py-2 md:py-1">{site.contact.person}</li>
              <li>
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp{" "}
                  <span className="ml-1 whitespace-nowrap">{site.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className={`${linkClass} [overflow-wrap:anywhere]`}
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-label text-fg mb-3">Follow</h2>
            <ul className="flex flex-col">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="text-fg mt-16 select-none md:mt-24">
          <BrandWordmark className="h-auto w-full" />
        </div>

        <div className="border-border text-fg-muted mt-8 flex flex-col-reverse gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {site.legalName} ({site.companyNo}). All rights reserved.{" "}
            <Link href="/privacy" className="hover:text-fg underline underline-offset-4">
              {footer.privacyLabel}
            </Link>
          </p>
          <BackToTop label={footer.backToTop} />
        </div>
      </div>
    </footer>
  );
}
