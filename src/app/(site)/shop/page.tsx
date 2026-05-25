import { Suspense } from "react";

import { ProductGrid } from "@/components/store/product-grid";
import { ShopSidebar } from "@/components/store/shop-sidebar";
import { ShopTrendingBanner } from "@/components/store/shop-trending-banner";
import { getProducts } from "@/lib/data/products";
import { Skeleton } from "@/components/ui/skeleton";

type Search = Record<string, string | string[] | undefined>;

function pick(v: string | string[] | undefined) {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

export default async function ShopPage({ searchParams }: { searchParams: Search }) {
  const q = pick(searchParams.q);
  const category = pick(searchParams.category);
  const gender = pick(searchParams.gender);
  const age = pick(searchParams.age);

  const products = await getProducts({
    q,
    category: category ?? "all",
    gender: gender ?? "all",
    age_group: age ?? "all",
    limit: 200,
  });

  const title =
    category === "Streetwear"
      ? "Trending streetwear"
      : category && category !== "all"
        ? category
        : age === "kids"
          ? "Kids' clothing"
          : age === "adult"
            ? "Men's clothing"
            : "All clothing";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{products.length} items</p>

      {category === "Streetwear" ? <ShopTrendingBanner products={products} /> : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
          <ShopSidebar />
        </Suspense>
        <div>
          <ProductGrid products={products} emptyMessage="No items match. Try another filter or search." />
        </div>
      </div>
    </div>
  );
}
