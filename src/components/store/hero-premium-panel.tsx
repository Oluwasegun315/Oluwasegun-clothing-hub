"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/types/database";
import { ProductSlider } from "@/components/store/product-slider";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

type TabId = "trending" | "men" | "kids";

const TABS: { id: TabId; label: string; href: string }[] = [
  { id: "trending", label: "Trending", href: "/shop?category=Streetwear" },
  { id: "men", label: "Men", href: "/shop?age=adult" },
  { id: "kids", label: "Kids", href: "/shop?age=kids" },
];

type Props = {
  trending: Product[];
  men: Product[];
  kids: Product[];
};

/** Right hero — product slider only (tabs switch collections). */
export function HeroPremiumPanel({ trending, men, kids }: Props) {
  const [tab, setTab] = useState<TabId>("trending");

  const pools: Record<TabId, Product[]> = {
    trending: trending.length ? trending : men.slice(0, 3),
    men: men.length ? men : trending.slice(0, 3),
    kids: kids.length ? kids : trending.slice(0, 3),
  };

  const products = pools[tab];
  const sliderItems = products.slice(0, 3);
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="flex min-h-[520px] flex-col rounded-3xl border-2 border-orange-200 bg-white shadow-2xl">
      <div className="border-b border-orange-100 bg-orange-50 px-4 py-3 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Featured looks</p>
        <div className="mt-2 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-bold transition",
                tab === t.id
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white text-orange-700 ring-1 ring-orange-200 hover:bg-orange-100"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {sliderItems.length > 0 ? (
          <ProductSlider products={sliderItems} autoPlayMs={4000} aspectClass="aspect-[4/5] min-h-[280px]" />
        ) : (
          <div className="flex min-h-[280px] flex-1 items-center justify-center rounded-xl bg-orange-50 text-gray-600">
            Run npm run sync:assets
          </div>
        )}

        {sliderItems.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {sliderItems.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="overflow-hidden rounded-lg border border-orange-100 bg-orange-50/50"
              >
                <div className="relative aspect-square bg-neutral-100">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <p className="truncate p-1 text-[10px] font-semibold text-gray-900">{p.name}</p>
                <p className="px-1 pb-1 text-xs font-bold text-orange-600">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        ) : null}

        <Link
          href={active.href}
          className="mt-auto inline-flex items-center justify-center gap-2 pt-5 text-sm font-bold text-orange-600 hover:underline"
        >
          View all {active.label.toLowerCase()}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
