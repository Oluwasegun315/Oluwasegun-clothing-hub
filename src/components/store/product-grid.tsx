import type { Product } from "@/types/database";
import { ProductTile } from "@/components/store/product-tile";

type Props = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({ products, emptyMessage = "No products found." }: Props) {
  if (!products.length) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductTile key={p.id} product={p} />
      ))}
    </div>
  );
}
