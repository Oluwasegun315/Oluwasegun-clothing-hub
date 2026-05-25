"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { StoreImage } from "@/components/store/store-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  menHero: Product[];
  kidsHero: Product[];
  menCount: number;
  kidsCount: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
    price
  );
}

function HeroSlideCarousel({
  label,
  products,
  shopHref,
}: {
  label: string;
  products: Product[];
  shopHref: string;
}) {
  const [active, setActive] = useState(0);
  const count = products.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = () => setActive((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [count, next]);

  const current = products[active];
  if (!current) return null;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-3 shadow-md sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
          {label}
        </span>
        <Link href={shopHref} className="text-xs font-semibold text-primary hover:underline">
          Shop {label.toLowerCase()} →
        </Link>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
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
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
              aria-label={`Previous ${label} item`}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
              aria-label={`Next ${label} item`}
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <p className="line-clamp-2 text-sm font-bold text-foreground">{current.name}</p>
        <p className="text-base font-bold text-primary">{formatPrice(current.price)}</p>
        <Link
          href={`/product/${current.id}`}
          className="inline-block text-xs font-medium text-muted-foreground hover:text-primary"
        >
          View details
        </Link>
      </div>

      {count > 1 ? (
        <div className="mt-3 flex justify-center gap-1">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn("h-1.5 rounded-full transition-all", i === active ? "w-5 bg-primary" : "w-1.5 bg-primary/30")}
              aria-label={`Show ${label} item ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Homepage hero: brand message + 3 men's + 3 kids' featured items (each slides).
 */
export function HeroStoreCarousel({ menHero, kidsHero, menCount, kidsCount }: Props) {
  return (
    <section className="border-b border-border bg-gradient-to-br from-orange-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Oluwasegun Clothing Hub</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Shop <span className="text-primary">men&apos;s</span> & <span className="text-primary">kids&apos;</span>{" "}
              fashion
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              {menCount} men&apos;s styles and {kidsCount} kids&apos; styles — each from your own photo folders. Browse
              by section so you always know what you are shopping for.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop?age=adult" className={cn(buttonVariants({ size: "lg" }), "rounded-lg px-8")}>
                Men&apos;s clothing ({menCount})
              </Link>
              <Link
                href="/shop?age=kids"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-lg px-8")}
              >
                Kids&apos; clothing ({kidsCount})
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <HeroSlideCarousel label="Men's picks" products={menHero} shopHref="/shop?age=adult" />
            <HeroSlideCarousel label="Kids' picks" products={kidsHero} shopHref="/shop?age=kids" />
          </div>
        </div>
      </div>
    </section>
  );
}
