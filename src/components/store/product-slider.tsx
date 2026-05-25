"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  className?: string;
  aspectClass?: string;
  autoPlayMs?: number;
  showDots?: boolean;
  linkToProduct?: boolean;
};

/**
 * Single-image slider — auto-slides with smooth horizontal animation.
 */
export function ProductSlider({
  products,
  className,
  aspectClass = "aspect-[4/5]",
  autoPlayMs = 3500,
  showDots = true,
  linkToProduct = true,
}: Props) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const count = products.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || !autoPlayMs) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [count, autoPlayMs, next]);

  if (!count) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-neutral-100 text-sm text-muted-foreground",
          aspectClass,
          className
        )}
      >
        No items yet
      </div>
    );
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className={cn("relative overflow-hidden rounded-xl bg-neutral-100", aspectClass)}>
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {products.map((p) => (
            <div key={p.id} className="relative h-full w-full shrink-0">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/85 to-transparent p-4 pt-14">
                <p className="line-clamp-2 text-sm font-bold text-white">{p.name}</p>
                <p className="text-lg font-bold text-orange-300">{formatPrice(p.price)}</p>
                {p.badge ? (
                  <span className="mt-1 inline-block rounded bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    {p.badge}
                  </span>
                ) : null}
              </div>

              {linkToProduct ? (
                <Link href={`/product/${p.id}`} className="absolute inset-0 z-[2]" aria-label={`View ${p.name}`} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-[42%] z-[30] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange-200 bg-white text-gray-900 shadow-lg hover:bg-orange-500 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-[42%] z-[30] flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange-200 bg-white text-gray-900 shadow-lg hover:bg-orange-500 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="size-5" />
          </button>
          {showDots ? (
            <div className="mt-3 flex justify-center gap-1.5">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-7 bg-orange-500" : "w-2 bg-orange-300"
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
