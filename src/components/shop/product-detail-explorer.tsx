"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";
import { StoreImage } from "@/components/store/store-image";
import { cn } from "@/lib/utils";

type Props = {
  current: Product;
  related: Product[];
};

/**
 * Product image with arrows — browse this item and related styles in the same section (men/kids).
 */
export function ProductDetailExplorer({ current, related }: Props) {
  const router = useRouter();
  const items = useMemo(() => [current, ...related], [current, related]);
  const [index, setIndex] = useState(0);
  const active = items[index] ?? current;

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const openProduct = (p: Product) => {
    router.push(`/product/${p.id}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-neutral-100 shadow-md">
        {active.image_url ? (
          <StoreImage
            key={active.id}
            src={active.image_url}
            alt={active.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No photo</div>
        )}

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous style"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg hover:bg-primary hover:text-primary-foreground"
              aria-label="Next related style"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-16">
          <p className="text-xs font-medium uppercase tracking-wide text-white/80">
            {index === 0 ? "This item" : "Related style"} · {index + 1} / {items.length}
          </p>
          <p className="mt-1 line-clamp-2 text-lg font-bold text-white">{active.name}</p>
          <p className="text-xl font-bold text-primary">{formatPrice(active.price)}</p>
          {index !== 0 ? (
            <button
              type="button"
              onClick={() => openProduct(active)}
              className="mt-2 text-sm font-semibold text-white underline hover:text-primary"
            >
              Open this product →
            </button>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
            Related {current.age_group === "kids" ? "kids" : "men"}&apos;s styles
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative block h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
                  i === index ? "border-primary ring-2 ring-primary/30" : "border-border opacity-80 hover:opacity-100"
                )}
              >
                {p.image_url ? (
                  <StoreImage src={p.image_url} alt={p.name} fill className="object-cover" />
                ) : null}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Use the arrows on the photo to preview more items before you add to cart.
          </p>
        </div>
      ) : null}

      {index !== 0 ? (
        <Link
          href={`/product/${active.id}`}
          className="inline-block text-sm font-semibold text-primary hover:underline"
        >
          View &amp; buy {active.name} →
        </Link>
      ) : null}
    </div>
  );
}
