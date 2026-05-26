"use client";

import Link from "next/link";

import { StoreImage } from "@/components/store/store-image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/format-price";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

/** Simple clothing product card — always shows name, category, price. */
export function ProductTile({ product }: Props) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.message("Sign in to use cart");
        router.push(`/login?next=/product/${product.id}`);
        return;
      }
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        });
        if (error?.code === "23503") {
          toast.message("Run supabase/seed_marketplace.sql in Supabase first");
          return;
        }
        if (error) throw error;
      }
      toast.success("Added to cart");
    } catch {
      toast.error("Could not add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-white">
      <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] bg-neutral-100">
        {product.image_url ? (
          <StoreImage src={product.image_url} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No photo</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
          {product.category ?? "Clothing"}
          {product.age_group === "kids" ? " · Kids" : ""}
        </p>
        <Link href={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <Button type="button" size="sm" className="h-8 rounded-md px-3" disabled={adding} onClick={addToCart}>
            <ShoppingBag className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
