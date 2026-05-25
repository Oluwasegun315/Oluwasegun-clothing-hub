import Link from "next/link";

import type { Product } from "@/types/database";
import { ProductCard } from "@/components/shop/product-card";
import { FashionMarquee } from "@/components/shop/fashion-marquee";
import { CampaignStrip } from "@/components/shop/campaign-strip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
};

function sortNewest(list: Product[]) {
  return [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Large marketplace shop: marquees, trending rail, adult + kids mega-grids, campaign strips, best sellers.
 */
export function ShopMega({ products }: Props) {
  const adult = products.filter((p) => (p.age_group ?? "adult") === "adult");
  const kids = products.filter((p) => p.age_group === "kids");
  const trending = products.filter((p) => p.is_trending).slice(0, 14);
  const newest = sortNewest(products).slice(0, 12);
  const best = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 10);

  return (
    <div className="w-full">
      <FashionMarquee />

      <section className="mx-auto max-w-[1680px] px-4 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        <div className="max-w-4xl">
          <p className="font-display text-xs tracking-[0.45em] text-primary md:text-sm">MARKETPLACE</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.92] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Oluwasegun
            <span className="block text-4xl text-muted-foreground sm:text-5xl md:text-6xl">Clothing Hub</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Adult runway + kids street — two mega universes, hundreds of editorial SKUs, premium cards, and
            filters tuned like a global luxury retailer.
          </p>
        </div>
      </section>

      {trending.length ? (
        <section className="mx-auto mt-16 max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary">TRENDING NOW</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">The heat map</h2>
            </div>
            <Link href="/new-arrivals" className={cn(buttonVariants({ variant: "outline" }), "rounded-full border-primary/25")}>
              New arrivals
            </Link>
          </div>
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 pt-1 [scrollbar-width:thin]">
            {trending.map((p, i) => (
              <div key={p.id} className="w-[min(78vw,280px)] shrink-0 sm:w-[240px] md:w-[260px]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto mt-8 max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <CampaignStrip
          title="Quiet volume. Loud presence."
          subtitle="Neutral palettes, architectural proportions, and fabric stories borrowed from Fear of God, Zara Studio, and Balenciaga street."
          image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&q=85"
        />
      </div>

      <section className="mx-auto mt-20 max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="font-display text-xs tracking-[0.45em] text-primary">01 — ADULT COLLECTION</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">Runway & street</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Oversized hoodies, cargos, denim, sneakers, tailoring — built for a global wardrobe rotation.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{adult.length} pieces live</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {adult.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <CampaignStrip
          title="Mini icons. Major moves."
          subtitle="Kids capsules with the same premium language — varsity, cargos, flex sneakers, and party moments."
          image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=2000&q=85"
          align="right"
        />
      </div>

      <section className="mx-auto mt-20 max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="font-display text-xs tracking-[0.45em] text-primary">02 — KIDS COLLECTION</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl lg:text-6xl">Young royalty</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Matching sets, varsity, denim, sneakers — playground-proof with campaign-level presentation.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{kids.length} pieces live</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {kids.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <FashionMarquee items={["KIDS STREET", "MINI LUXURY", "PLAYGROUND FLEX", "YOUNG ICONS", "FAMILY MATCH"]} />

      <section className="mx-auto mt-16 grid max-w-[1680px] gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-primary">NEW ARRIVALS</p>
          <h3 className="mt-2 font-display text-3xl text-foreground">Fresh drops</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {newest.slice(0, 6).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-primary">BEST SELLERS</p>
          <h3 className="mt-2 font-display text-3xl text-foreground">Crowd favourites</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {best.slice(0, 6).map((p, i) => (
              <ProductCard key={`best-${p.id}`} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
