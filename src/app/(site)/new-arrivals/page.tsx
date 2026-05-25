import Link from "next/link";

import { ProductGrid } from "@/components/store/product-grid";
import { getTrendingProducts } from "@/lib/data/local-store-catalog";

export default function NewArrivalsPage() {
  const products = getTrendingProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">Trending & new</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {products.length} hot styles — streetwear drops and featured picks
      </p>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
          ← Back to full shop
        </Link>
      </p>
    </div>
  );
}
