"use client";

import Link from "next/link";

import type { Product } from "@/types/database";
import { ProductSlider } from "@/components/store/product-slider";

type Props = {
  menHero: Product[];
  kidsHero: Product[];
  streetwearHero: Product[];
};

export function HeroPickCarousels({ menHero, kidsHero, streetwearHero }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-primary/30 bg-white p-4 shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">🔥 Trending streetwear</h2>
          <Link href="/shop?category=Streetwear" className="text-xs font-semibold text-primary hover:underline">
            Shop all →
          </Link>
        </div>
        <ProductSlider products={streetwearHero} autoPlayMs={3500} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Men&apos;s top picks</h2>
            <Link href="/shop?age=adult" className="text-xs font-semibold text-primary hover:underline">
              See more →
            </Link>
          </div>
          <ProductSlider products={menHero} />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Kids&apos; top picks</h2>
            <Link href="/shop?age=kids" className="text-xs font-semibold text-primary hover:underline">
              See more →
            </Link>
          </div>
          <ProductSlider products={kidsHero} />
        </div>
      </div>
    </div>
  );
}
