"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { workCopy } from "@/content/work";
import { ease } from "@/lib/motion";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { ytEmbed, ytThumb } from "@/lib/youtube";

type OpenArgs = { youtubeId: string; title: string; origin?: DOMRect | null };
type State = OpenArgs & { from: { x: number; y: number; scale: number } };

const VideoModalContext = createContext<((args: OpenArgs) => void) | null>(null);

export function useVideoModal() {
  const open = useContext(VideoModalContext);
  if (!open) throw new Error("useVideoModal must be used inside <VideoModalProvider>");
  return open;
}

/** Target panel width: 16:9, fits the viewport with breathing room. */
function panelWidth() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = vw < 768 ? 16 : 48;
  return Math.min(vw - pad * 2, 1280, ((vh - (vw < 768 ? 120 : 160)) * 16) / 9);
}

/**
 * YouTube facade modal (§7.2): the iframe (youtube-nocookie) is only created after
 * the user clicks a card. Focus trapped, Esc / backdrop / close button, focus returns
 * to the trigger, scroll locked (Lenis paused), scales in from the card position.
 */
export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State | null>(null);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(({ youtubeId, title, origin }: OpenArgs) => {
    let from = { x: 0, y: 24, scale: 0.92 };
    if (origin && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const w = panelWidth();
      from = {
        x: origin.left + origin.width / 2 - window.innerWidth / 2,
        y: origin.top + origin.height / 2 - window.innerHeight / 2,
        scale: origin.width / w,
      };
    }
    setLoaded(false);
    setState({ youtubeId, title, origin, from });
  }, []);

  const close = useCallback(() => setState(null), []);

  useScrollLock(!!state);
  useFocusTrap(ref, !!state, close);

  return (
    <VideoModalContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            ref={ref}
            key="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={state.title}
            className="fixed inset-0 z-[70] grid place-items-center p-4 md:p-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            {/* Focus sentinels: Tab leaving the cross-origin iframe can't be caught by keydown */}
            <span tabIndex={0} className="sr-only" onFocus={() => closeRef.current?.focus()} />
            <div className="relative flex w-full max-w-[1280px] flex-col items-center gap-4">
              <div
                className="flex w-full items-center justify-between gap-4 text-white"
                style={{ maxWidth: "min(100%, calc((100svh - 160px) * 16 / 9))" }}
              >
                <motion.p
                  className="truncate text-sm font-medium text-white/80 md:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {state.title}
                </motion.p>
                <motion.button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={workCopy.modal.close}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  <X size={20} aria-hidden />
                </motion.button>
              </div>

              <motion.div
                className="rounded-card relative aspect-video w-full overflow-hidden bg-black shadow-2xl"
                style={{ maxWidth: "min(100%, calc((100svh - 160px) * 16 / 9))" }}
                initial={{ ...state.from, opacity: 0.4 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ ...state.from, opacity: 0 }}
                transition={{ duration: 0.55, ease: ease.out }}
              >
                {/* Facade: thumbnail + spinner until the player is ready */}
                <Image
                  src={ytThumb(state.youtubeId)}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
                />
                {!loaded && (
                  <div
                    className="absolute inset-0 grid place-items-center bg-black/30"
                    role="status"
                  >
                    <span className="sr-only">{workCopy.modal.loading}</span>
                    <span
                      aria-hidden
                      className="size-10 animate-spin rounded-full border-2 border-white/25 border-t-white"
                    />
                  </div>
                )}
                <iframe
                  src={ytEmbed(state.youtubeId)}
                  title={state.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  onLoad={() => setLoaded(true)}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
              </motion.div>
            </div>
            <span tabIndex={0} className="sr-only" onFocus={() => closeRef.current?.focus()} />
          </motion.div>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}
