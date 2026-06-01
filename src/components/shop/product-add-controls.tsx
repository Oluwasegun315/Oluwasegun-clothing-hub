"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { addToCartApi } from "@/lib/cart/add-to-cart";
import { notifyCartUpdated } from "@/lib/cart/use-cart-count";
import { Button } from "@/components/ui/button";

type Props = {
  productId: string;
  isAuthed: boolean;
};

/** PDP actions — guests must sign in before adding to cart. */
export function ProductAddControls({ productId, isAuthed }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);

  const loginHref = `/login?next=${encodeURIComponent(`/product/${productId}`)}`;

  const add = async () => {
    if (!isAuthed) {
      toast.message("Sign in first", { description: "Create an account or log in to add items to your bag." });
      router.push(loginHref);
      return;
    }
    setBusy(true);
    try {
      const result = await addToCartApi(productId, qty);
      if (result.ok) {
        toast.success("Added to cart");
        notifyCartUpdated();
        router.refresh();
        return;
      }
      if (result.needsSignIn) {
        router.push(loginHref);
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
      setBusy(false);
    }
  };

  if (!isAuthed) {
    return (
      <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
        <p className="text-sm font-semibold text-gray-900">Sign in to add to your bag</p>
        <p className="mt-1 text-sm text-gray-600">Quick sign-in keeps your cart saved across devices.</p>
        <Link href={loginHref} className="mt-4 inline-flex">
          <Button type="button" className="w-full rounded-full px-8 glow-button sm:w-auto">
            <LogIn className="mr-2 size-4" />
            Sign in to shop
          </Button>
        </Link>
      </div>
    );
  }

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
        <ShoppingBag className="mr-2 size-4" />
        {busy ? "Adding…" : "Add to cart"}
      </Button>
    </div>
  );
}
