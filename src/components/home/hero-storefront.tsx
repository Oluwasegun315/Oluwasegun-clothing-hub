import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/types/database";
import { SHOP_CATEGORIES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
};

/** Storefront hero: compact banner + horizontal product explorer (clothing only, mixed categories). */
export function HeroStorefront({ products }: Props) {
  const rail = products
    .filter((p) => p.image_url && (p.age_group ?? "adult") === "adult")
    .slice(0, 12);
  const fallback = products.filter((p) => p.image_url).slice(0, 12);
  const showcase = rail.length >= 6 ? rail : fallback;

  return (
    <section className="border-b border-border bg-white">
      <div className="border-b border-primary/15 bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm">
        Welcome to Oluwasegun Clothing Hub — 100+ hoodies, denim, outerwear, shoes & kids wear
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Your clothing
              <span className="text-primary"> marketplace</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Scroll to explore real products with prices. Tap any item to see sizes and add to cart.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}>
                Explore all products
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/shop?age=kids"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}
              >
                Kids shop
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {SHOP_CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-border bg-orange-50 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground sm:text-sm"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Horizontal product explorer */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Pick something — scroll →
            </h2>
            <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
            {showcase.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group w-[140px] shrink-0 sm:w-[160px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="160px"
                    />
                  ) : null}
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-medium text-foreground">{p.name}</p>
                <p className="text-sm font-bold text-primary">${Number(p.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
