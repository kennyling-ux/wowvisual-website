"use client";

import { useState } from "react";
import { ytThumb } from "./youtube";

/**
 * Thumbnail source with fallbacks (§7.2): custom thumbnail or maxresdefault →
 * hqdefault → null (render nothing; the card's dark background shows instead of
 * a broken-image icon). Not every upload has a maxresdefault.
 */
export function useYtThumb(youtubeId: string, custom?: string) {
  const [failed, setFailed] = useState({ id: youtubeId, count: 0 });
  const count = failed.id === youtubeId ? failed.count : 0;

  const src =
    count === 0
      ? (custom ?? ytThumb(youtubeId))
      : count === 1
        ? ytThumb(youtubeId, "hqdefault")
        : null;

  const onError = () => setFailed({ id: youtubeId, count: count + 1 });

  return { src, onError };
}
