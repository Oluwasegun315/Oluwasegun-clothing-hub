import { createClient } from "@supabase/supabase-js";

import type { Product } from "@/types/database";
import { getServiceRoleKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

/**
 * Upserts a local-catalog product into Supabase so cart FK constraints succeed.
 * Requires SUPABASE_SERVICE_ROLE_KEY on the server (Vercel env).
 */
export async function ensureStoreProductInDatabase(product: Product): Promise<boolean> {
  if (!hasSupabaseEnv()) return false;

  const serviceKey = getServiceRoleKey();
  if (!serviceKey) return false;

  const admin = createClient(getSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await admin.from("products").upsert(
    {
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
    },
    { onConflict: "id" }
  );

  return !error;
}
