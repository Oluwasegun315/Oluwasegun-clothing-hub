import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Sparkles, Truck } from "lucide-react";

import type { Product } from "@/types/database";
import { SHOP_CATEGORIES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
};

function pickByCategory(products: Product[], category: string) {
  return products.find((p) => p.category === category && p.image_url);
}

/**
 * Marketplace-first hero: promo bar, brand headline, department tiles, product mosaic — no single-model slide.
 */
export function HeroMarketplace({ products }: Props) {
  const mosaic = products.filter((p) => p.image_url).slice(0, 8);
  const categories = SHOP_CATEGORIES.map((c) => {
    const catKey = c.label === "Kids" ? null : c.label;
    const sample =
      c.label === "Kids"
        ? products.find((p) => p.age_group === "kids" && p.image_url)
        : pickByCategory(products, catKey ?? "");
    return { ...c, image: sample?.image_url ?? products[0]?.image_url };
  });

  return (
    <section className="border-b border-border bg-background">
      {/* Promo strip */}
      <div className="border-b border-primary/20 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-2.5 text-center text-xs font-medium tracking-wide sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-3.5" />
            100+ clothing pieces — Adult & Kids
          </span>
          <span className="hidden h-3 w-px bg-primary-foreground/40 sm:block" />
          <span className="inline-flex items-center gap-2">
            <Truck className="size-3.5" />
            Premium streetwear & tailoring
          </span>
          <span className="hidden h-3 w-px bg-primary-foreground/40 sm:block" />
          <span className="inline-flex items-center gap-2">
            <Shirt className="size-3.5" />
            New drops weekly
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Brand + CTAs */}
          <div>
            <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-primary">
              FASHION MARKETPLACE
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Shop clothes that
              <span className="block text-primary">look like a brand.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Hoodies, denim, outerwear, footwear, and kids fits — real products, prices, sizes, and
              cart. Built like Zara or ASOS, styled for Oluwasegun.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 glow-button")}>
                Shop all clothing
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/shop?age=kids"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}
              >
                Kids store
              </Link>
            </div>
          </div>

          {/* Product mosaic — many items, not one model */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {mosaic.slice(0, 6).map((p, i) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 33vw, 180px"
                    priority={i < 3}
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-2 pt-6">
                  <p className="truncate text-[10px] font-medium text-primary-foreground">{p.name}</p>
                  <p className="text-[10px] font-bold text-primary-foreground">${Number(p.price).toFixed(0)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Department tiles */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-xl text-foreground sm:text-2xl">Shop by category</h2>
            <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="relative aspect-[4/5] bg-muted">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.label}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="180px"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-lg" aria-hidden>
                    {c.emoji}
                  </span>
                </div>
                <p className="py-3 text-center text-xs font-semibold tracking-wide text-foreground sm:text-sm">
                  {c.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
