"use client";

import Image from "next/image";
import { useState } from "react";

/* Uniform content-image treatment (design-integrity rule):
   render inside the parent's `relative` fixed-aspect box, centered, with a
   quiet palette-toned placeholder when the URL is missing or fails — never
   a broken-image icon, never a collapsed box.

   Fit policy (design freeze + never-crop, reconciled):
   - "auto" (default): the seeded Unsplash photos and bundled site assets
     keep the site's original object-cover crop, so the migrated site is
     pixel-identical to the static version; any OTHER source (Firebase
     Storage uploads, pasted URLs) renders fully visible with
     object-contain, centered, palette fill on ratio mismatch — new images
     are never cropped or stretched.
   - explicit "cover": immersive full-bleed hero *backgrounds* (detail-page
     headers behind a text scrim), where cropping is the design.
   - explicit "contain": force the never-crop treatment. */

function resolveFit(
  src: string,
  fit: "auto" | "contain" | "cover"
): "contain" | "cover" {
  if (fit !== "auto") return fit;
  try {
    return new URL(src).hostname === "images.unsplash.com"
      ? "cover"
      : "contain";
  } catch {
    return "cover"; // relative path = bundled site asset
  }
}

export default function ContentImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  fit = "auto",
  tone = "light",
  imgClassName = "",
}: {
  src?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fit?: "auto" | "contain" | "cover";
  tone?: "light" | "dark";
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const fillBg = tone === "dark" ? "bg-charcoal" : "bg-ivory";

  if (!src || failed) {
    return (
      <span aria-hidden className={`absolute inset-0 block ${fillBg}`}>
        <span
          className={`absolute inset-0 block ${
            tone === "dark" ? "bg-cream/5" : "bg-charcoal/5"
          }`}
        />
      </span>
    );
  }

  const resolved = resolveFit(src, fit);

  return (
    <span
      className={`absolute inset-0 block ${resolved === "contain" ? fillBg : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${
          resolved === "contain" ? "object-contain" : "object-cover"
        } object-center ${imgClassName}`}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
