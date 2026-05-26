import { getProductById } from "@/lib/data/products";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { CartItemWithProduct, Product } from "@/types/database";

type CartLinesResult = {
  user: { id: string } | null;
  lines: CartItemWithProduct[];
};

/** Loads the signed-in member cart with joined product rows (shape depends on FK hint). */
export async function getCartLines(): Promise<CartLinesResult> {
  if (!hasSupabaseEnv()) {
    return { user: null, lines: [] };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, lines: [] };

  const { data, error } = await supabase
    .from("cart_items")
    .select("id, user_id, product_id, quantity, products(*)")
    .eq("user_id", user.id);

  if (error) {
    console.error("getCartLines", error.message);
    return { user, lines: [] };
  }

  const lines: CartItemWithProduct[] = await Promise.all(
    (data ?? []).map(async (row: unknown) => {
      const r = row as {
        id: string;
        user_id: string;
        product_id: string;
        quantity: number;
        products: Product | Product[] | null;
      };
      let product: Product | null = Array.isArray(r.products) ? r.products[0] ?? null : r.products;
      if (!product) {
        product = await getProductById(r.product_id);
      }
      return {
        id: r.id,
        user_id: r.user_id,
        product_id: r.product_id,
        quantity: r.quantity,
        product,
      };
    })
  );

  return { user, lines };
}
