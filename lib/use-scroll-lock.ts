"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/** Locks page scroll (and pauses Lenis) while `locked` is true — modals, mobile menu. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    lenis?.stop();
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      lenis?.start();
    };
  }, [locked, lenis]);
}
