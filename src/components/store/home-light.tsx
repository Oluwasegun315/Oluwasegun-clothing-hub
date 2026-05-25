import Link from "next/link";

import { HeroFeaturedSection } from "@/components/store/hero-featured-section";
import { ExploreSection } from "@/components/store/explore-section";
import { TrendingCarousel } from "@/components/store/trending-carousel";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";
import { StoreImage } from "@/components/store/store-image";

const PREVIEW = 8;

function ProductGridPreview({
  products,
  title,
  href,
}: {
  products: Product[];
  title: string;
  href: string;
}) {
  if (!products.length) return null;
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <Link href={href} className="text-sm font-bold text-primary hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <div className="relative aspect-[3/4] bg-neutral-100">
              {p.image_url ? <StoreImage src={p.image_url} alt={p.name} fill className="object-cover" /> : null}
            </div>
            <div className="p-2.5">
              <p className="line-clamp-2 text-xs font-semibold">{p.name}</p>
              <p className="mt-1 text-sm font-bold text-primary">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

type Props = {
  men: Product[];
  kids: Product[];
  streetwear: Product[];
  trending: Product[];
  menHero: Product[];
  kidsHero: Product[];
  totalCount: number;
};

export function HomeLight({
  men,
  kids,
  streetwear,
  trending,
  menHero,
  kidsHero,
  totalCount,
}: Props) {
  return (
    <div>
      <HeroFeaturedSection
        menHero={menHero}
        kidsHero={kidsHero}
        streetwear={streetwear}
        totalCount={totalCount}
      />

      <div className="py-10">
        <ExploreSection />
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 pb-14 sm:px-6">
        <div className="rounded-2xl bg-primary px-6 py-5 text-center text-primary-foreground shadow-lg sm:text-left">
          <p className="text-lg font-bold">{totalCount}+ styles in our store</p>
          <p className="mt-1 text-sm opacity-90">Trending streetwear, men&apos;s & kids&apos; — all in one place.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex h-11 items-center rounded-lg bg-white px-6 text-sm font-bold text-primary hover:bg-orange-50"
          >
            Explore full shop
          </Link>
        </div>

        <TrendingCarousel
          products={trending}
          title="Trending streetwear"
          subtitle="Every piece from your Streetwear folder — use arrows to browse."
          viewAllHref="/shop?category=Streetwear"
        />

        <ProductGridPreview products={streetwear.slice(0, PREVIEW)} title="Streetwear collection" href="/shop?category=Streetwear" />
        <ProductGridPreview products={men.slice(0, PREVIEW)} title="Men's collection" href="/shop?age=adult" />
        <ProductGridPreview products={kids.slice(0, PREVIEW)} title="Kids' collection" href="/shop?age=kids" />
      </div>
    </div>
  );
}
