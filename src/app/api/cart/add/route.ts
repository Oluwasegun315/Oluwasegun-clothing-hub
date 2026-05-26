import { NextResponse } from "next/server";

import { getProductById } from "@/lib/data/products";
import { ensureStoreProduct } from "@/lib/supabase/ensure-store-product";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: "Store auth is not configured." }, { status: 503 });
  }

  let body: { productId?: string; quantity?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const productId = body.productId?.trim();
  const quantity = Math.max(1, Math.min(99, Number(body.quantity) || 1));

  if (!productId) {
    return NextResponse.json({ error: "Missing product." }, { status: 400 });
  }

  const product = await getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  let supabase;
  try {
    supabase = createClient();
  } catch {
    return NextResponse.json({ error: "Auth unavailable." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to use cart." }, { status: 401 });
  }

  const synced = await ensureStoreProduct(product, supabase);
  if (!synced) {
    return NextResponse.json(
      {
        error: "catalog_sync",
        message:
          "Run supabase/migrations/20260526_store_catalog_cart.sql and supabase/seed_local_store.sql in Supabase SQL Editor (one time).",
      },
      { status: 409 }
    );
  }

  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: product.id,
      quantity,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
