import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

import { AutoProductStrip } from "@/components/store/auto-product-strip";
import { BrandTrustBar } from "@/components/store/brand-trust-bar";
import { HubNewsletter } from "@/components/store/hub-newsletter";
import { LookbookEditorial } from "@/components/store/lookbook-editorial";
import { NewArrivalsSpotlight } from "@/components/store/new-arrivals-spotlight";
import { ProductSlider } from "@/components/store/product-slider";
import { PromoTicker } from "@/components/store/promo-ticker";
import { ShopperVoices } from "@/components/store/shopper-voices";
import { StyleEdits } from "@/components/store/style-edits";
import { TrendingCarousel } from "@/components/store/trending-carousel";
import type { Product } from "@/types/database";

type Props = {
  men: Product[];
  kids: Product[];
  streetwear: Product[];
  trending: Product[];
  totalCount: number;
};

function buildStyleEdits(men: Product[], kids: Product[], streetwear: Product[]) {
  const pack = (items: Product[]) => items.filter(Boolean).slice(0, 3);
  return [
    {
      title: "Street heat",
      mood: "Trending edit",
      href: "/shop?category=Streetwear",
      pieces: pack([streetwear[0], streetwear[2], streetwear[4]]),
    },
    {
      title: "Men's rotation",
      mood: "Adult edit",
      href: "/shop?age=adult",
      pieces: pack([men[0], men[2], men[4]]),
    },
    {
      title: "Kids' Sunday",
      mood: "Little icons",
      href: "/shop?age=kids",
      pieces: pack([kids[0], kids[2], kids[4]]),
    },
  ].filter((e) => e.pieces.length >= 2);
}

/** Premium storefront — editorial lookbook, style edits, trust, social proof, your real catalog. */
export function StoreHome({ men, kids, streetwear, trending, totalCount }: Props) {
  const heroSlides = [...streetwear.slice(0, 4), ...men.slice(0, 2), ...kids.slice(0, 2)].filter(Boolean);
  const styleEdits = buildStyleEdits(men, kids, streetwear);
  const newArrivals = [...streetwear.slice(0, 4), ...men.slice(0, 2)];
  const lookbookReady = streetwear[0] && men[0] && kids[0];

  return (
    <div className="bg-orange-50/40">
      <PromoTicker />

      {/* Hero */}
      <section className="border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-300">
                <Flame className="size-3.5 text-orange-500" aria-hidden />
                Code OLUWASEGUN10 · 10% off
              </span>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Dress loud.
                <span className="block text-orange-600">Move different.</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                Oluwasegun Clothing Hub — men&apos;s fits, kids&apos; comfort, and streetwear drops pulled from your
                rack. Real photos. Real prices. Built to feel like the boutiques people bookmark.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop?category=Streetwear"
                  className="inline-flex h-12 items-center rounded-full bg-orange-500 px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600"
                >
                  Shop the drop
                </Link>
                <Link
                  href="/new-arrivals"
                  className="inline-flex h-12 items-center rounded-full border-2 border-gray-900 bg-white px-8 text-sm font-bold text-gray-900 hover:bg-gray-50"
                >
                  New arrivals
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">{totalCount}+</span> pieces live · Men · Kids · Streetwear
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-orange-200/80 bg-white p-3 shadow-xl ring-1 ring-black/5">
              <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-orange-600">
                Featured rotation
              </p>
              <ProductSlider
                products={heroSlides.length ? heroSlides : streetwear.slice(0, 6)}
                autoPlayMs={3200}
                aspectClass="aspect-[4/5] min-h-[320px] sm:min-h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      <BrandTrustBar />

      {lookbookReady ? (
        <LookbookEditorial streetwear={streetwear[0]} men={men[0]} kids={kids[0]} />
      ) : null}

      {/* Quick explore */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { href: "/shop?category=Streetwear", label: "Trending streetwear", count: streetwear.length, hint: "What's hot" },
            { href: "/shop?age=adult", label: "Men's clothing", count: men.length, hint: "Daily fits" },
            { href: "/shop?age=kids", label: "Kids' clothing", count: kids.length, hint: "Little icons" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-lg"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{item.hint}</p>
                <p className="mt-1 font-bold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.count} pieces</p>
              </div>
              <ArrowRight className="size-5 text-orange-500 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {styleEdits.length > 0 ? <StyleEdits edits={styleEdits} /> : null}

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <TrendingCarousel
          products={trending}
          title="Trending now"
          subtitle="The streetwear wall — auto-sliding picks from your folder."
          viewAllHref="/shop?category=Streetwear"
        />
      </section>

      <NewArrivalsSpotlight products={newArrivals} />

      <section className="mx-auto max-w-7xl space-y-12 px-4 pb-8 sm:px-6">
        <AutoProductStrip
          products={streetwear}
          title="Streetwear"
          subtitle="The full trending wall — slides on its own."
          viewAllHref="/shop?category=Streetwear"
          badge="Streetwear"
          autoPlayMs={2700}
        />
        <AutoProductStrip
          products={men}
          title="Men's clothing"
          subtitle="Adult rotation from your men's rack."
          viewAllHref="/shop?age=adult"
          badge="Men"
          autoPlayMs={2900}
        />
        <AutoProductStrip
          products={kids}
          title="Kids' clothing"
          subtitle="Kids' picks — comfort-first, photo-real."
          viewAllHref="/shop?age=kids"
          badge="Kids"
          autoPlayMs={3000}
        />
      </section>

      <ShopperVoices />
      <HubNewsletter />
    </div>
  );
}
