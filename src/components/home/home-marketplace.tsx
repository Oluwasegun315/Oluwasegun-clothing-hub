import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/types/database";
import { ProductCard } from "@/components/shop/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
};

function ProductGridSection({
  title,
  subtitle,
  href,
  items,
}: {
  title: string;
  subtitle: string;
  href: string;
  items: Product[];
}) {
  if (!items.length) return null;
  return (
    <section className="border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
          </div>
          <Link
            href={href}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full border-primary/30")}
          >
            See all
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Homepage commerce blocks: dense product grids so it reads as a clothing marketplace immediately.
 */
export function HomeMarketplace({ products }: Props) {
  const trending = products.filter((p) => p.is_trending).slice(0, 12);
  const adult = products.filter((p) => (p.age_group ?? "adult") === "adult").slice(0, 12);
  const kids = products.filter((p) => p.age_group === "kids").slice(0, 12);
  const newest = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 16);

  const trendingShow = trending.length >= 4 ? trending : products.slice(0, 12);

  return (
    <div className="bg-background">
      <ProductGridSection
        title="Trending now"
        subtitle="Best-rated hoodies, shells, and street pieces shoppers are adding to cart."
        href="/shop"
        items={trendingShow}
      />
      <ProductGridSection
        title="Adult clothing"
        subtitle="Streetwear, outerwear, denim, formal, and evening — full adult marketplace."
        href="/shop?age=adult"
        items={adult}
      />
      <ProductGridSection
        title="Kids clothing"
        subtitle="Mini streetwear, school-ready layers, and play-proof outerwear for boys and girls."
        href="/shop?age=kids"
        items={kids}
      />
      <ProductGridSection
        title="New arrivals"
        subtitle="Fresh drops across every category — updated like a real fashion retailer."
        href="/new-arrivals"
        items={newest}
      />

      {/* Brand trust strip */}
      <section className="border-t border-border bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-xs tracking-[0.35em] text-primary">OLUWASEGUN CLOTHING HUB</p>
          <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
            A real clothing brand. A real marketplace.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse 100+ pieces with photos, prices, sizes, and categories. Sign in to save your cart and
            checkout when you are ready.
          </p>
          <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full px-10 glow-button")}>
            Open full shop
          </Link>
        </div>
      </section>
    </div>
  );
}
