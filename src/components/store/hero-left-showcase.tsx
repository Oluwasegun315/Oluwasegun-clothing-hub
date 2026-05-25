import Link from "next/link";
import { ArrowRight, Flame, Shirt, Baby, Grid3X3 } from "lucide-react";

import type { Product } from "@/types/database";

type Props = {
  streetwear: Product[];
  totalCount: number;
};

const EXPLORE = [
  { href: "/shop?category=Streetwear", label: "Trending", icon: Flame, desc: "Hot streetwear" },
  { href: "/shop?age=adult", label: "Men", icon: Shirt, desc: "Men's styles" },
  { href: "/shop?age=kids", label: "Kids", icon: Baby, desc: "Kids' wear" },
  { href: "/shop", label: "All shop", icon: Grid3X3, desc: "Full catalog" },
] as const;

/** Left hero panel — always visible (server-rendered images + copy). */
export function HeroLeftShowcase({ streetwear, totalCount }: Props) {
  const mosaic = streetwear.slice(0, 4);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl border-2 border-orange-200 bg-white shadow-2xl">
      {/* Photo mosaic background */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 opacity-30">
        {mosaic.map((p) =>
          p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.id} src={p.image_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div key={p.id} className="bg-orange-100" />
          )
        )}
        {mosaic.length < 4
          ? Array.from({ length: 4 - mosaic.length }).map((_, i) => (
              <div key={`fill-${i}`} className="bg-orange-50" />
            ))
          : null}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-orange-50/85" />

      <div className="relative flex h-full min-h-[520px] flex-col justify-between p-6 sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-600">
            Oluwasegun Clothing Hub
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Your style tells your story.
            <span className="mt-2 block text-orange-600">Wear it with pride.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-gray-700">
            We built this store for people who care how they look — sharp outfits, happy kids, and streetwear
            that turns heads. Step in and find something that feels like you.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border-2 border-orange-500 bg-orange-500 p-5 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest opacity-90">Limited welcome offer</p>
          <p className="mt-2 text-3xl font-bold">10% OFF</p>
          <p className="mt-1 text-sm opacity-95">First order only · use code at checkout</p>
          <p className="mt-3 inline-block rounded-lg bg-white px-4 py-2 font-mono text-lg font-bold text-orange-600">
            OLUWASEGUN10
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-bold text-gray-900">
            Explore {totalCount}+ styles — start here
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {EXPLORE.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-orange-200 bg-white/90 p-3 shadow-sm transition hover:border-orange-500 hover:bg-orange-50 hover:shadow-md"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-gray-900 group-hover:text-orange-600">
                      {item.label}
                    </span>
                    <span className="block text-xs text-gray-600">{item.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600 sm:w-auto sm:px-10"
        >
          Shop the full collection
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
