"use client";

import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
};

/** Fast local product photos — no Next.js image optimizer (saves RAM on dev). */
export function StoreImage({ src, alt, className, priority, fill }: Props) {
  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          el.parentElement?.classList.add("bg-neutral-200");
        }}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
