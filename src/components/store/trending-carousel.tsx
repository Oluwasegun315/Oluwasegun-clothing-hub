"use client";

import type { Product } from "@/types/database";
import { AutoProductStrip } from "@/components/store/auto-product-strip";

type Props = {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
};

/** Trending strip — auto-slides continuously; arrows optional. */
export function TrendingCarousel({ products, title, subtitle, viewAllHref = "/shop?category=Streetwear" }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Trending now</p>
      <AutoProductStrip
        products={products}
        title={title}
        subtitle={subtitle ?? "Slides automatically — hover to pause."}
        viewAllHref={viewAllHref}
        badge="Trending"
        autoPlayMs={2600}
      />
    </div>
  );
}
