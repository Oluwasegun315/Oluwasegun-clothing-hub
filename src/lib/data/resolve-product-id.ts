import { localProductId, type StoreCollection } from "@/lib/data/local-store-catalog";

const LEGACY_ID = /^33333333-(men|kids|streetwear)-(\d{4})$/;

/** Maps old product links to current UUID-shaped ids after catalog update. */
export function resolveProductId(id: string): string {
  const match = id.match(LEGACY_ID);
  if (!match) return id;
  const collection = match[1] as StoreCollection;
  const index = Math.max(0, parseInt(match[2], 10) - 1);
  return localProductId(collection, index);
}
