"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const CART_UPDATED_EVENT = "hub-cart-updated";

/** Total item quantity in the signed-in user's cart (for navbar badge). */
export function useCartCount() {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!hasSupabaseEnv()) {
      setCount(0);
      return;
    }

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCount(0);
        return;
      }

      const { data: rows } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);

      const total = (rows ?? []).reduce((sum, row) => sum + (row.quantity ?? 0), 0);
      setCount(total);
    } catch {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    void refresh();

    if (!hasSupabaseEnv()) return;

    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });

    const onCartUpdated = () => void refresh();
    window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
    };
  }, [refresh]);

  return count;
}

export function notifyCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }
}
