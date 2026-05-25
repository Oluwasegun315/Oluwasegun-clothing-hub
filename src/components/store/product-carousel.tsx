"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { StoreImage } from "@/components/store/store-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  autoPlayMs?: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
    price
  );
}

/**
 * Horizontal sliding carousel for product exploration.
 */
export function ProductCarousel({ products, title, subtitle, viewAllHref, autoPlayMs = 4000 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, products.length - 1);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track?.children[i]) return;
    const child = track.children[i] as HTMLElement;
    child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  const next = useCallback(() => {
    setIndex((i) => {
      const nextI = i >= maxIndex ? 0 : i + 1;
      scrollToIndex(nextI);
      return nextI;
    });
  }, [maxIndex, scrollToIndex]);

  const prev = () => {
    setIndex((i) => {
      const prevI = i <= 0 ? maxIndex : i - 1;
      scrollToIndex(prevI);
      return prevI;
    });
  };

  useEffect(() => {
    if (products.length <= 1 || !autoPlayMs) return;
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, next, products.length]);

  if (!products.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-orange-50"
            aria-label="Previous products"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-orange-50"
            aria-label="Next products"
          >
            <ChevronRight className="size-5" />
          </button>
          {viewAllHref ? (
            <Link href={viewAllHref} className="ml-2 text-sm font-semibold text-primary hover:underline">
              View all →
            </Link>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth p-3 sm:gap-4 sm:p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group w-[72%] shrink-0 snap-start sm:w-[48%] lg:w-[24%]"
              onFocus={() => setIndex(i)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                {p.image_url ? (
                  <StoreImage
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                {p.badge ? (
                  <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">{p.name}</p>
              <p className="text-sm font-bold text-primary">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>

      {maxIndex > 0 ? (
        <div className="flex justify-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i);
                scrollToIndex(i);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-2 bg-primary/30"
              )}
              aria-label={`Go to product ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
