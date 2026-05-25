import Link from "next/link";

import type { Product } from "@/types/database";
import { ProductCard } from "@/components/shop/product-card";
import { SHOP_CATEGORIES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  totalCount: number;
  activeAge?: string;
  activeCategory?: string;
  activeGender?: string;
  searchQ?: string;
};

function sectionTitle(activeAge?: string, activeCategory?: string) {
  if (activeCategory && activeCategory !== "all") return `${activeCategory} collection`;
  if (activeAge === "kids") return "Kids clothing store";
  if (activeAge === "adult") return "Adult clothing store";
  return "All clothing";
}

/**
 * Shop catalog: products first, always — no giant banners blocking the grid.
 */
export function ShopCatalog({
  products,
  totalCount,
  activeAge,
  activeCategory,
  activeGender,
  searchQ,
}: Props) {
  const title = sectionTitle(activeAge, activeCategory);
  const showCategoryShortcuts = !activeCategory || activeCategory === "all";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      {/* Shop header */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Oluwasegun Clothing Hub</p>
        <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {totalCount} items to explore
          {searchQ ? ` · Search: “${searchQ}”` : ""}
          {activeGender && activeGender !== "all" ? ` · ${activeGender}` : ""}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/shop" className={cn(buttonVariants({ size: "sm" }), "rounded-full")}>
            All products
          </Link>
          <Link
            href="/shop?age=adult"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            Adult
          </Link>
          <Link
            href="/shop?age=kids"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            Kids
          </Link>
          <Link
            href="/new-arrivals"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            New arrivals
          </Link>
        </div>
      </div>

      {/* Category shortcuts */}
      {showCategoryShortcuts ? (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Browse by category</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {SHOP_CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {c.emoji} {c.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* Main product grid — THE SHOP */}
      <div className="mt-10">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-6 py-16 text-center">
            <p className="font-display text-xl text-foreground">No products match these filters</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another category or clear filters.</p>
            <Link href="/shop" className={cn(buttonVariants(), "mt-6 rounded-full")}>
              View all clothing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
