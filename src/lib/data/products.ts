import type { Product } from "@/types/database";
import {
  filterCatalog,
  applyProductLimit,
  type CatalogProductFilters,
} from "@/lib/data/marketplace-catalog";
import { getAllLocalProducts } from "@/lib/data/local-store-catalog";
import { resolveProductId } from "@/lib/data/resolve-product-id";

export type { CatalogProductFilters as ProductQueryFilters };

/** Store catalog = your `men cloth` + `kids cloth` images only (no duplicate stock photos). */
export async function getProducts(filters: CatalogProductFilters = {}): Promise<Product[]> {
  const local = getAllLocalProducts();
  const filtered = filterCatalog(local, filters);
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return applyProductLimit(filtered, filters.limit);
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts({ limit: 500 });
  const resolved = resolveProductId(id);
  return all.find((p) => p.id === resolved || p.id === id) ?? null;
}
