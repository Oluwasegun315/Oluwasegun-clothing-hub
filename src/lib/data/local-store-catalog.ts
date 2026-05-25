import type { Product } from "@/types/database";
import manifest from "@/lib/data/store-manifest.json";
import { getProductDisplayName, type StoreCollection } from "@/lib/data/product-display-names";

export type { StoreCollection };

/** Images kept in the folder but hidden from shop & trending (not on-brand). */
const HIDDEN_FILES: Partial<Record<StoreCollection, readonly string[]>> = {
  streetwear: ["Boxer.jpg"],
};

function visibleFilenames(collection: StoreCollection, filenames: string[]) {
  const hidden = new Set(HIDDEN_FILES[collection] ?? []);
  return filenames.filter((f) => !hidden.has(f));
}

export function publicAssetUrl(collection: StoreCollection, filename: string) {
  const folder =
    collection === "men" ? "men-cloth" : collection === "kids" ? "kids-cloth" : "streetwear";
  return `/assett/${folder}/${encodeURIComponent(filename)}`;
}

export function localProductId(collection: StoreCollection, index: number): string {
  return `33333333-${collection}-${String(index + 1).padStart(4, "0")}`;
}

const USD_MEN = [45, 58, 32, 78, 42, 65, 88, 55, 48, 72, 38, 52, 95, 120, 62, 85, 68, 75, 59, 44, 49, 56, 41, 36, 28];
const USD_KIDS = [18, 22, 28, 32, 38, 45, 20, 26, 35, 16, 24, 30, 19, 27, 34, 40, 21, 23, 29, 31, 25, 33, 37, 17];
const USD_STREET = [55, 62, 48, 72, 68, 58, 64, 70, 66, 75, 89, 52, 54, 56, 78, 49, 85, 95, 28, 59, 65, 45, 69, 71, 73, 67, 63, 61, 57, 53, 51, 47];

function priceFor(collection: StoreCollection, index: number) {
  const table =
    collection === "men" ? USD_MEN : collection === "kids" ? USD_KIDS : USD_STREET;
  return table[index % table.length];
}

function buildCollection(collection: StoreCollection, filenames: string[]): Product[] {
  const now = new Date().toISOString();
  const isStreet = collection === "streetwear";
  const isMen = collection === "men";

  return filenames.map((file, index) => {
    const name = getProductDisplayName(collection, file, index);
    const url = publicAssetUrl(collection, file);
    return {
      id: localProductId(collection, index),
      name,
      description: isStreet
        ? `${name} — trending streetwear at Oluwasegun Clothing Hub.`
        : isMen
          ? `${name} — men's wear from Oluwasegun Clothing Hub.`
          : `${name} — kids' wear from Oluwasegun Clothing Hub.`,
      image_url: url,
      image_hover_url: url,
      price: priceFor(collection, index),
      category: isStreet ? "Streetwear" : isMen ? "Men's Clothing" : "Kids' Clothing",
      gender: isStreet ? "Unisex" : isMen ? "Men" : "Kids",
      age_group: isStreet ? "adult" : isMen ? "adult" : "kids",
      created_at: now,
      rating: 4.9,
      is_trending: isStreet ? true : index < 6,
      badge: isStreet ? "Trending" : index < 3 ? "Featured" : index < 6 ? "New" : null,
      color_name: null,
      sizes_available: isStreet || isMen ? "S,M,L,XL,XXL" : "2Y,4Y,6Y,8Y,10Y,12Y",
    };
  });
}

type CatalogCache = { men: Product[]; kids: Product[]; streetwear: Product[] };

let cached: CatalogCache | null = null;

export function getLocalStoreCatalog(): CatalogCache {
  if (cached) return cached;
  cached = {
    men: buildCollection("men", visibleFilenames("men", manifest.men)),
    kids: buildCollection("kids", visibleFilenames("kids", manifest.kids)),
    streetwear: buildCollection(
      "streetwear",
      visibleFilenames("streetwear", manifest.streetwear ?? [])
    ),
  };
  return cached;
}

export function getAllLocalProducts(): Product[] {
  const { men, kids, streetwear } = getLocalStoreCatalog();
  return [...streetwear, ...men, ...kids];
}

export function getTrendingProducts(): Product[] {
  const { streetwear, men, kids } = getLocalStoreCatalog();
  const extra = [...men, ...kids].filter((p) => p.is_trending).slice(0, 8);
  return [...streetwear, ...extra];
}

export function getHeroFeaturedProducts() {
  const { men, kids, streetwear } = getLocalStoreCatalog();
  return {
    menHero: men.slice(0, 3),
    kidsHero: kids.slice(0, 3),
    streetwearHero: streetwear.slice(0, 3),
  };
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  const all = getAllLocalProducts();
  const pool =
    product.category === "Streetwear"
      ? all.filter((p) => p.category === "Streetwear")
      : product.age_group === "kids"
        ? all.filter((p) => p.age_group === "kids")
        : all.filter((p) => p.age_group === "adult" && p.category !== "Streetwear");
  return pool.filter((p) => p.id !== product.id).slice(0, limit);
}

export function clearLocalStoreCache() {
  cached = null;
}
