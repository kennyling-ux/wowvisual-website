"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";

const ContactForm = dynamic(() => import("./contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <FormPlaceholder />,
});

/**
 * Loads the form (react-hook-form + zod) only when the contact section nears the
 * viewport, keeping it out of the home page's initial JS. It is the last block
 * before the footer, so mounting it never shifts content above it.
 */
export function LazyContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "1000px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <ContactForm /> : <FormPlaceholder />}</div>;
}

/** Same footprint as the form, so the section doesn't jump when it mounts. */
function FormPlaceholder() {
  return (
    <div className="grid min-h-[57rem] gap-5 md:min-h-[38.75rem] md:grid-cols-2" role="status">
      <span className="sr-only">{contact.loading}</span>
    </div>
  );
}
