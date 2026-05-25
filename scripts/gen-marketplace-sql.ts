import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { MARKETPLACE_CATALOG } from "../src/lib/data/marketplace-catalog";

function esc(s: string) {
  return s.replace(/'/g, "''");
}

const rows = MARKETPLACE_CATALOG.map(
  (p) =>
    `('${p.id}','${esc(p.name)}','${esc(p.description ?? "")}','${esc(p.image_url ?? "")}','${esc(p.image_hover_url ?? "")}',${p.price},'${esc(p.category ?? "")}','${esc(p.gender ?? "")}','${p.age_group ?? "adult"}',${p.rating ?? 4.8},${p.is_trending ?? false},${p.badge ? `'${esc(p.badge)}'` : "null"},${p.color_name ? `'${esc(p.color_name)}'` : "null"},'${esc(p.sizes_available ?? "XS,S,M,L,XL")}', now())`
);

const sql = `-- Run in Supabase SQL Editor (clears old catalog rows with deterministic IDs, then loads full marketplace)
-- Optional: backup first. Clears products that start with catalog UUID prefix.

DELETE FROM public.cart_items WHERE product_id::text LIKE '11111111-%';
DELETE FROM public.products WHERE id::text LIKE '11111111-%';

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_hover_url text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS age_group text DEFAULT 'adult';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating numeric(3,2) DEFAULT 4.80;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_trending boolean DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS badge text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS color_name text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sizes_available text DEFAULT 'XS,S,M,L,XL';

INSERT INTO public.products (id, name, description, image_url, image_hover_url, price, category, gender, age_group, rating, is_trending, badge, color_name, sizes_available, created_at)
VALUES
${rows.join(",\n")};
`;

writeFileSync(join(process.cwd(), "supabase", "seed_marketplace.sql"), sql);
console.log("Wrote supabase/seed_marketplace.sql", MARKETPLACE_CATALOG.length, "rows");
