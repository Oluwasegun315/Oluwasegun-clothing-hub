"use client";

import { useState } from "react";

import { StoreImage } from "@/components/store/store-image";
import { cn } from "@/lib/utils";

type Props = {
  primaryUrl: string | null;
  secondaryUrl: string | null;
  alt: string;
};

export function ProductDetailGallery({ primaryUrl, secondaryUrl, alt }: Props) {
  const [hover, setHover] = useState(false);
  const hoverSrc = secondaryUrl ?? primaryUrl;

  if (!primaryUrl) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-3xl border border-border bg-muted/10 text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-muted/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StoreImage
        src={primaryUrl}
        alt={alt}
        fill
        priority
        className={cn(
          "object-cover transition-opacity duration-500",
          hover && hoverSrc ? "opacity-0" : "opacity-100"
        )}
      />
      {hoverSrc && hoverSrc !== primaryUrl ? (
        <StoreImage
          src={hoverSrc}
          alt=""
          fill
          className={cn("object-cover transition-opacity duration-500", hover ? "opacity-100" : "opacity-0")}
        />
      ) : null}
    </div>
  );
}
