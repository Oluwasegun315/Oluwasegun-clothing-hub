"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { CartItemWithProduct } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  initialLines: CartItemWithProduct[];
};

/** Cart surface: quantity edits, removals, and subtotal — syncs to Supabase + refreshes route. */
export function CartView({ initialLines }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [lines, setLines] = useState(initialLines);

  useEffect(() => {
    setLines(initialLines);
  }, [initialLines]);

  const subtotal = lines.reduce((acc, line) => {
    const price = line.product ? Number(line.product.price) : 0;
    return acc + price * line.quantity;
  }, 0);

  const refresh = () =>
    startTransition(() => {
      router.refresh();
    });

  const setQuantity = async (lineId: string, next: number) => {
    const safe = Math.max(1, Math.min(99, next));
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, quantity: safe } : l))
    );
    const supabase = createClient();
    const { error } = await supabase.from("cart_items").update({ quantity: safe }).eq("id", lineId);
    if (error) {
      toast.error(error.message);
      refresh();
      return;
    }
    toast.success("Cart updated");
    refresh();
  };

  const removeLine = async (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
    const supabase = createClient();
    const { error } = await supabase.from("cart_items").delete().eq("id", lineId);
    if (error) {
      toast.error(error.message);
      refresh();
      return;
    }
    toast.success("Removed from cart");
    refresh();
  };

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-3xl text-foreground">Your cart is a blank canvas.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Discover pieces with presence in the shop — curated for silhouette and story.
        </p>
        <Link href="/shop" className={cn(buttonVariants(), "mt-8 inline-flex rounded-full px-8 glow-button")}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-primary">CART</p>
          <h1 className="mt-2 font-display text-4xl text-foreground">Selected pieces</h1>
        </div>
        {pending ? <Skeleton className="h-4 w-24" /> : null}
      </div>

      <div className="mt-10 space-y-6">
        {lines.map((line) => (
          <div
            key={line.id}
            className="flex flex-col gap-6 rounded-2xl border border-border bg-muted p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border sm:h-32 sm:w-28">
              {line.product?.image_url ? (
                <Image src={line.product.image_url} alt="" fill className="object-cover" sizes="200px" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1">
              <Link href={line.product ? `/product/${line.product.id}` : "#"} className="font-display text-lg text-foreground hover:text-primary">
                {line.product?.name ?? "Unknown product"}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                ${line.product ? Number(line.product.price).toFixed(2) : "—"} each
              </p>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background/30 px-2 py-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  onClick={() => setQuantity(line.id, line.quantity - 1)}
                >
                  −
                </Button>
                <span className="min-w-[2ch] text-center text-sm tabular-nums">{line.quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full"
                  onClick={() => setQuantity(line.id, line.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button type="button" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeLine(line.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-10 bg-border" />

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground">SUBTOTAL</p>
          <p className="mt-2 font-display text-3xl text-foreground">${subtotal.toFixed(2)}</p>
          <p className="mt-2 text-xs text-muted-foreground">Taxes & shipping calculated at checkout (demo).</p>
        </div>
        <Button className="rounded-full px-10 glow-button" type="button" onClick={() => toast.message("Checkout is a demo", { description: "Wire your payments provider when ready." })}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
