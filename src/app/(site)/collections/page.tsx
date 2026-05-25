import Link from "next/link";

import { ProductGrid } from "@/components/store/product-grid";
import { getProducts } from "@/lib/data/products";

export default async function CollectionsPage() {
  const products = await getProducts({ limit: 24 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">Collections</h1>
      <p className="mt-1 text-sm text-muted-foreground">Browse curated picks from the catalog</p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
          View all products in shop →
        </Link>
      </p>
    </div>
  );
}
