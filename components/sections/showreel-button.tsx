"use client";

import { Button } from "@/components/ui/button";
import { useVideoModal } from "@/components/work/video-modal";

/** Opens the full showreel in the video modal (§6.2). */
export function ShowreelButton({ youtubeId, label }: { youtubeId: string; label: string }) {
  const open = useVideoModal();
  return (
    <Button
      onClick={(e) =>
        open({ youtubeId, title: label, origin: e.currentTarget.getBoundingClientRect() })
      }
      aria-haspopup="dialog"
    >
      {label}
    </Button>
  );
}
