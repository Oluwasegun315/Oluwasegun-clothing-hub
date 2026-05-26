"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Props = {
  productId: string;
  isAuthed: boolean;
};

/** PDP primary actions: quantity + add to cart with optimistic feedback. */
export function ProductAddControls({ productId, isAuthed }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!isAuthed) {
      toast.message("Sign in required", { description: "Log in to add items to your cart." });
      router.push(`/login?next=/product/${productId}`);
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + qty })
          .eq("id", existing.id);
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity: qty,
        });
        if (error?.code === "23503") {
          toast.message("Run catalog seed in Supabase", {
            description: "Open supabase/seed_marketplace.sql in the SQL editor once so cart can sync.",
          });
          return;
        }
        if (error) throw error;
      }
      toast.success("Added to cart");
      router.refresh();
    } catch {
      toast.error("Could not add to cart");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 rounded-full border border-border bg-muted px-2 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </Button>
        <span className="min-w-[2ch] text-center text-sm tabular-nums">{qty}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setQty((q) => Math.min(12, q + 1))}
          aria-label="Increase quantity"
        >
          +
        </Button>
      </div>
      <Button type="button" className="rounded-full px-10 glow-button" disabled={busy} onClick={add}>
        {busy ? "Adding…" : "Add to cart"}
      </Button>
    </div>
  );
}
