/** Client helper — adds a product via server API (syncs catalog + cart). */
export async function addToCartApi(
  productId: string,
  quantity = 1
): Promise<{ ok: true } | { ok: false; message: string; needsSignIn?: boolean; needsCatalog?: boolean }> {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    message?: string;
  };

  if (res.status === 401) {
    return { ok: false, message: "Sign in to use cart", needsSignIn: true };
  }

  if (res.status === 409 || data.error === "catalog_sync") {
    return {
      ok: false,
      message: data.message ?? "Catalog sync required in Supabase.",
      needsCatalog: true,
    };
  }

  if (!res.ok) {
    return { ok: false, message: data.error ?? data.message ?? "Could not add to cart" };
  }

  return { ok: true };
}
