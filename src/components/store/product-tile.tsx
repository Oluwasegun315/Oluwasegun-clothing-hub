"use client";

import Link from "next/link";

import { StoreImage } from "@/components/store/store-image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/database";
import { addToCartApi } from "@/lib/cart/add-to-cart";
import { notifyCartUpdated } from "@/lib/cart/use-cart-count";
import { formatPrice } from "@/lib/format-price";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

/** Product card — bag button sends guests to sign in first. */
export function ProductTile({ product }: Props) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      const result = await addToCartApi(product.id, 1);
      if (result.ok) {
        toast.success("Added to cart");
        notifyCartUpdated();
        router.refresh();
        return;
      }
      if (result.needsSignIn) {
        toast.message("Sign in to use cart");
        router.push(`/login?next=/product/${product.id}`);
        return;
      }
      if (result.needsCatalog) {
        toast.message("Store setup needed", { description: result.message });
        return;
      }
      toast.error(result.message);
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
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
          <Button
            type="button"
            size="sm"
            className="h-8 rounded-md px-3"
            disabled={adding}
            onClick={addToCart}
            title="Sign in required to add to cart"
          >
            <ShoppingBag className="size-4" />
          </Button>
        </div>
        <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <LogIn className="size-3" aria-hidden />
          Sign in to add to bag
        </p>
      </div>
    </article>
  );
}
