"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { workCopy, type WorkItem } from "@/content/work";
import { cn } from "@/lib/cn";
import { ytThumb } from "@/lib/youtube";
import { useVideoModal } from "./video-modal";

/** 16:9 video card (§6.8): thumbnail, play button, title over the frame, category tag. */
export function WorkCard({
  item,
  sizes = "(min-width: 768px) 50vw, 100vw",
  size = "lg",
  priority = false,
}: {
  item: WorkItem;
  sizes?: string;
  size?: "lg" | "md";
  priority?: boolean;
}) {
  const open = useVideoModal();
  const [src, setSrc] = useState(item.thumbnail ?? ytThumb(item.youtubeId));

  return (
    <button
      type="button"
      data-cursor="play"
      onClick={(e) =>
        open({
          youtubeId: item.youtubeId,
          title: item.title,
          origin: e.currentTarget.getBoundingClientRect(),
        })
      }
      className="group/card rounded-card bg-hero-ink relative block aspect-video w-full overflow-hidden text-left text-white"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setSrc(ytThumb(item.youtubeId, "hqdefault"))}
        className="ease-out-expo object-cover saturate-[0.9] transition-transform duration-700 group-hover/card:scale-[1.04]"
      />
      {/* Overlay: always-on bottom gradient for the title; darkens on hover */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.75),rgb(0_0_0/0.1)_55%,transparent)] transition-colors duration-500 group-hover/card:bg-black/30"
      />

      <span className="sr-only">{workCopy.card.watch}: </span>
      <span className="text-label absolute top-3 left-3 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-white backdrop-blur-md md:top-4 md:left-4">
        {item.category}
      </span>

      <span
        aria-hidden
        className={cn(
          "ease-out-expo absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover/card:scale-[1.15]",
          size === "lg" ? "size-14 md:size-20" : "size-14",
        )}
      >
        <Play className="ml-0.5 fill-white" size={size === "lg" ? 22 : 18} strokeWidth={0} />
      </span>

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              "truncate font-semibold tracking-[-0.02em]",
              size === "lg" ? "text-lg md:text-2xl" : "text-base md:text-lg",
            )}
          >
            {item.title}
          </span>
          {(item.client || item.year) && (
            <span className="truncate text-sm text-white/70">
              {[item.client, item.year].filter(Boolean).join(" · ")}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
