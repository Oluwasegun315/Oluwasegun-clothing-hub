/**
 * Generates supabase/seed_local_store.sql from store-manifest.json
 * Run: node scripts/gen-local-store-sql.mjs
 * Then paste/run the SQL in Supabase SQL Editor (once).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "src/lib/data/store-manifest.json"), "utf8")
);

const HIDDEN_STREET = new Set(["Boxer.jpg"]);

function esc(s) {
  return String(s ?? "").replace(/'/g, "''");
}

function localProductId(collection, index) {
  const segment = collection === "men" ? "4d01" : collection === "kids" ? "4d02" : "4d03";
  const tail = (index + 1).toString(16).padStart(12, "0");
  return `33333333-${segment}-4000-8000-${tail}`;
}

function publicAssetUrl(collection, filename) {
  const folder =
    collection === "men" ? "men-cloth" : collection === "kids" ? "kids-cloth" : "streetwear";
  return `/assett/${folder}/${encodeURIComponent(filename)}`;
}

// Minimal display names — full names live in product-display-names.ts at runtime
function rowsFor(collection, files, category, gender, ageGroup, trendingAll) {
  return files
    .filter((f) => !(collection === "streetwear" && HIDDEN_STREET.has(f)))
    .map((file, index) => {
      const id = localProductId(collection, index);
      const url = publicAssetUrl(collection, file);
      const name = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").trim() || "Clothing item";
      const price = 25 + (index % 40);
      return `('${id}','${esc(name)}','${esc(name)} — Oluwasegun Clothing Hub.','${esc(url)}','${esc(url)}',${price},'${esc(category)}','${esc(gender)}','${ageGroup}',4.9,${trendingAll ? "true" : index < 6 ? "true" : "false"},${trendingAll ? "'Trending'" : index < 3 ? "'Featured'" : "null"},null,'S,M,L,XL', now())`;
    });
}

const allRows = [
  ...rowsFor("streetwear", manifest.streetwear ?? [], "Streetwear", "Unisex", "adult", true),
  ...rowsFor("men", manifest.men ?? [], "Men's Clothing", "Men", "adult", false),
  ...rowsFor("kids", manifest.kids ?? [], "Kids' Clothing", "Kids", "kids", false),
];

const sql = `-- Oluwasegun local store catalog (your photos) — run once in Supabase SQL Editor
DELETE FROM public.cart_items WHERE product_id::text LIKE '33333333-%';
DELETE FROM public.products WHERE id::text LIKE '33333333-%';

INSERT INTO public.products (id, name, description, image_url, image_hover_url, price, category, gender, age_group, rating, is_trending, badge, color_name, sizes_available, created_at)
VALUES
${allRows.join(",\n")};
`;

writeFileSync(join(root, "supabase/seed_local_store.sql"), sql);
console.log("Wrote supabase/seed_local_store.sql with", allRows.length, "products");
