import Link from "next/link";
import { Package, ShoppingBag, ShoppingCart, Store, User } from "lucide-react";

import { AccountSignOut } from "@/components/account/account-sign-out";
import { StoreImage } from "@/components/store/store-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import type { CartItemWithProduct } from "@/types/database";

type Props = {
  displayName: string;
  email: string;
  avatar: string | null;
  memberSince: string;
  lines: CartItemWithProduct[];
};

export function AccountDashboard({ displayName, email, avatar, memberSince, lines }: Props) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = lines.reduce((sum, line) => {
    const price = line.product ? Number(line.product.price) : 0;
    return sum + price * line.quantity;
  }, 0);

  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">My account</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Welcome back, {displayName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your bag, orders, and details — all in one place.
          </p>
        </div>
        <AccountSignOut />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-orange-200 bg-orange-50/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShoppingBag className="size-4 text-primary" />
              Items in bag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{itemCount}</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShoppingCart className="size-4 text-primary" />
              Bag total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{formatPrice(cartTotal)}</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <User className="size-4 text-primary" />
              Member since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{memberSince}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-foreground">Your shopping bag</h2>
            {lines.length > 0 ? (
              <Link href="/cart" className="text-sm font-medium text-primary hover:underline">
                View full cart
              </Link>
            ) : null}
          </div>

          {lines.length === 0 ? (
            <Card className="mt-4 border-dashed border-border">
              <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Your bag is empty. Start adding styles you love.</p>
                <Link href="/shop" className={cn(buttonVariants(), "rounded-full glow-button")}>
                  <Store className="mr-2 size-4" />
                  Browse shop
                </Link>
              </CardContent>
            </Card>
          ) : (
            <ul className="mt-4 space-y-3">
              {lines.slice(0, 6).map((line) => (
                <li
                  key={line.id}
                  className="flex gap-4 rounded-xl border border-border bg-white p-3 shadow-sm"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {line.product?.image_url ? (
                      <StoreImage
                        src={line.product.image_url}
                        alt={line.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground line-clamp-2">
                      {line.product?.name ?? "Product"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Qty {line.quantity}
                      {line.product ? ` · ${formatPrice(Number(line.product.price))}` : ""}
                    </p>
                    {line.product ? (
                      <Link
                        href={`/product/${line.product.id}`}
                        className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                      >
                        View product
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 6 ? (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              +{lines.length - 6} more in your{" "}
              <Link href="/cart" className="text-primary hover:underline">
                full cart
              </Link>
            </p>
          ) : null}
        </section>

        <aside className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Account details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
              <Avatar className="size-20 border border-border" size="lg">
                <AvatarImage src={avatar ?? undefined} alt="" />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-1">
                <p className="font-semibold text-foreground">{displayName}</p>
                <p className="text-sm text-muted-foreground">{email || "No email on file"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/40">
            <CardHeader>
              <CardTitle className="text-base">Quick links</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link
                href="/shop"
                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start rounded-lg")}
              >
                <Store className="mr-2 size-4" />
                Continue shopping
              </Link>
              <Link
                href="/cart"
                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start rounded-lg")}
              >
                <ShoppingCart className="mr-2 size-4" />
                View cart ({itemCount})
              </Link>
              <div className="flex items-start gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted-foreground">
                <Package className="mt-0.5 size-4 shrink-0 text-primary" />
                Order history will appear here when checkout is enabled.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
