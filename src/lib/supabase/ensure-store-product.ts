import { createClient as createAdminClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Product } from "@/types/database";
import { getServiceRoleKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

function productRow(product: Product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    image_hover_url: product.image_hover_url ?? product.image_url,
    price: product.price,
    category: product.category,
    gender: product.gender,
    age_group: product.age_group ?? "adult",
    rating: product.rating ?? 4.8,
    is_trending: product.is_trending ?? false,
    badge: product.badge,
    color_name: product.color_name,
    sizes_available: product.sizes_available,
    created_at: product.created_at,
  };
}

/** Upsert catalog row using the signed-in user's session (needs RLS policy in Supabase). */
export async function ensureStoreProductForUser(
  supabase: SupabaseClient,
  product: Product
): Promise<boolean> {
  const { error } = await supabase.from("products").upsert(productRow(product), { onConflict: "id" });
  return !error;
}

/** Fallback: service role upsert when SUPABASE_SERVICE_ROLE_KEY is set on Vercel. */
export async function ensureStoreProductInDatabase(product: Product): Promise<boolean> {
  if (!hasSupabaseEnv()) return false;

  const serviceKey = getServiceRoleKey();
  if (!serviceKey) return false;

  const admin = createAdminClient(getSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await admin.from("products").upsert(productRow(product), { onConflict: "id" });
  return !error;
}

export async function ensureStoreProduct(product: Product, supabase?: SupabaseClient): Promise<boolean> {
  if (supabase) {
    const ok = await ensureStoreProductForUser(supabase, product);
    if (ok) return true;
  }
  return ensureStoreProductInDatabase(product);
}
