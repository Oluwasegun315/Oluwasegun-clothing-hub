import type { Product } from "@/types/database";

/** IDs for your own catalog (separate from marketplace seed `11111111-…`). */
export function ownerProductId(index: number): string {
  const n = index + 1;
  const p2 = n.toString(16).padStart(4, "0");
  const p4 = n.toString(16).padStart(12, "0");
  return `22222222-${p2}-4000-8000-${p4}`;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=85",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
  "https://images.unsplash.com/photo-1541099649102-fbd7dacb814f?w=900&q=85",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=85",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
] as const;

type OwnerRow = {
  name: string;
  price: number;
  category?: string;
  age_group?: "adult" | "kids";
};

/**
 * Your store products — name & price (edit this list anytime).
 * These show on the site and are kept separate from duplicate catalog names.
 */
export const OWNER_PRODUCT_ROWS: OwnerRow[] = [
  { name: "Oluwasegun Classic Hoodie", price: 12500, category: "Streetwear", age_group: "adult" },
  { name: "Premium Cotton T-Shirt", price: 4500, category: "Streetwear", age_group: "adult" },
  { name: "Slim Fit Denim Jeans", price: 9800, category: "Denim", age_group: "adult" },
  { name: "Urban Bomber Jacket", price: 18500, category: "Outerwear", age_group: "adult" },
  { name: "Running Sneakers", price: 14200, category: "Footwear", age_group: "adult" },
  { name: "Formal Office Shirt", price: 7200, category: "Formal", age_group: "adult" },
  { name: "Ladies Wrap Dress", price: 11500, category: "Evening", age_group: "adult" },
  { name: "Tracksuit Set", price: 16800, category: "Active", age_group: "adult" },
  { name: "Leather Crossbody Bag", price: 8900, category: "Accessories", age_group: "adult" },
  { name: "Knit Sweater", price: 8400, category: "Knitwear", age_group: "adult" },
  { name: "Kids School Polo", price: 3500, category: "Streetwear", age_group: "kids" },
  { name: "Kids Denim Shorts", price: 4200, category: "Denim", age_group: "kids" },
  { name: "Kids Hoodie Set", price: 6500, category: "Streetwear", age_group: "kids" },
  { name: "Kids Sneakers", price: 7800, category: "Footwear", age_group: "kids" },
  { name: "Kids Party Dress", price: 9200, category: "Evening", age_group: "kids" },
  { name: "Kids Rain Jacket", price: 8100, category: "Outerwear", age_group: "kids" },
  { name: "Ankara Print Shirt", price: 6800, category: "Streetwear", age_group: "adult" },
  { name: "Senator Outfit", price: 22000, category: "Formal", age_group: "adult" },
  { name: "Agbada Classic", price: 35000, category: "Formal", age_group: "adult" },
  { name: "Casual Sandals", price: 5500, category: "Footwear", age_group: "adult" },
];

/** Hero spotlight — 3 IDs (indexes into OWNER rows or catalog). */
export const HERO_FEATURED_OWNER_INDEXES = [0, 3, 10] as const;

export function buildOwnerProducts(): Product[] {
  const now = new Date().toISOString();
  return OWNER_PRODUCT_ROWS.map((row, i) => {
    const img = IMAGES[i % IMAGES.length];
    const hover = IMAGES[(i + 2) % IMAGES.length];
    const age = row.age_group ?? "adult";
    return {
      id: ownerProductId(i),
      name: row.name,
      description: null,
      image_url: img,
      image_hover_url: hover,
      price: row.price,
      category: row.category ?? "Clothing",
      gender: age === "kids" ? "Kids" : "Unisex",
      age_group: age,
      created_at: now,
      rating: 4.8,
      is_trending: i < 5,
      badge: i === 0 ? "New" : null,
      color_name: null,
      sizes_available: age === "kids" ? "2Y,4Y,6Y,8Y,10Y,12Y" : "S,M,L,XL,XXL",
    };
  });
}

export const OWNER_PRODUCTS = buildOwnerProducts();
