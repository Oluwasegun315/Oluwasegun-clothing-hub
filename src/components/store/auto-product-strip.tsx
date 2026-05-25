"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  badge?: string;
  autoPlayMs?: number;
  className?: string;
};

/**
 * Horizontal product strip — auto-slides every few seconds with smooth animation.
 * Pauses while the mouse is over the carousel.
 */
export function AutoProductStrip({
  products,
  title,
  subtitle,
  viewAllHref,
  badge = "New",
  autoPlayMs = 2800,
  className,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const pausedRef = useRef(false);
  const maxIndex = Math.max(0, products.length - 1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | undefined;
    if (!first || !track) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    setStepPx(first.offsetWidth + gap);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, products.length]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, maxIndex));
      setIndex(clamped);
    },
    [maxIndex]
  );

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (products.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [products.length, autoPlayMs, next]);

  if (!products.length) return null;

  const translateX = stepPx > 0 ? index * stepPx : 0;

  return (
    <section
      className={cn("space-y-4", className)}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      {(title || subtitle || viewAllHref) && (
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            {title ? <h2 className="text-2xl font-bold text-gray-900">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-2">
            {products.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="flex size-10 items-center justify-center rounded-full border border-orange-200 bg-white shadow hover:bg-orange-500 hover:text-white"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex size-10 items-center justify-center rounded-full border border-orange-200 bg-white shadow hover:bg-orange-500 hover:text-white"
                  aria-label="Next"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}
            {viewAllHref ? (
              <Link href={viewAllHref} className="ml-1 text-sm font-bold text-orange-600 hover:underline">
                View all →
              </Link>
            ) : null}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white py-4 shadow-sm">
        <div
          ref={trackRef}
          className="flex gap-4 px-4 transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="w-40 shrink-0 sm:w-48 md:w-52"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                ) : null}
                <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {p.badge ?? badge}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">{p.name}</p>
              <p className="text-sm font-bold text-orange-600">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>

      {products.length > 1 ? (
        <div className="flex justify-center gap-1.5">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-orange-500" : "w-2 bg-orange-300"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
