"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { StoreImage } from "@/components/store/store-image";
import { cn } from "@/lib/utils";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
    price
  );
}

type Props = {
  label: string;
  products: Product[];
  shopHref: string;
};

export function HeroCarouselColumn({ label, products, shopHref }: Props) {
  const [active, setActive] = useState(0);
  const count = products.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, 4000);
    return () => clearInterval(timer);
  }, [count]);

  if (!count) return null;

  const current = products[active];

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary">{label}</h2>
        <Link href={shopHref} className="text-xs font-semibold text-primary hover:underline">
          See more →
        </Link>
      </div>

      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
        <Link href={`/product/${current.id}`} className="absolute inset-0 block">
          {current.image_url ? (
            <StoreImage
              key={current.id}
              src={current.image_url}
              alt={current.name}
              fill
              priority
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
            <p className="line-clamp-2 text-sm font-bold text-white">{current.name}</p>
            <p className="text-base font-bold text-orange-300">{formatPrice(current.price)}</p>
          </div>
        </Link>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prev();
              }}
              className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-primary hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-primary hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mb-3 flex justify-center gap-1.5">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === active ? "w-6 bg-primary" : "w-2 bg-primary/30"
              )}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-2">
        {products.map((p, i) => (
          <button
            key={`thumb-${p.id}`}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "overflow-hidden rounded-lg border-2 text-left transition",
              i === active ? "border-primary ring-2 ring-primary/20" : "border-border bg-orange-50/50 hover:border-primary/50"
            )}
          >
            <div className="relative aspect-square bg-neutral-100">
              {p.image_url ? <StoreImage src={p.image_url} alt={p.name} fill className="object-cover" /> : null}
            </div>
            <p className="line-clamp-2 p-1.5 text-[10px] font-semibold leading-tight text-foreground">{p.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
