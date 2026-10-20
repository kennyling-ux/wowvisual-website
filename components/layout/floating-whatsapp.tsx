"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { floatingWhatsApp, site } from "@/content/site";
import { ease } from "@/lib/motion";

/**
 * Mobile-only floating WhatsApp button (§6.14): appears after the hero,
 * hides while the contact section is in view.
 */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const threshold = () => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    return hero ? hero.offsetTop + hero.offsetHeight * 0.8 : window.innerHeight * 0.8;
  };

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > threshold()));

  useEffect(() => {
    const id = requestAnimationFrame(() => setPastHero(window.scrollY > threshold()));
    const contact = document.getElementById("contact");
    if (!contact) return () => cancelAnimationFrame(id);
    const io = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(contact);
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="wa"
          href={site.contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={floatingWhatsApp.label}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: ease.out }}
          className="bg-accent text-on-accent fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] md:hidden"
        >
          <WhatsAppIcon size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
