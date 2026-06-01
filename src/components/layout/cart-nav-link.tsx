"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartCount } from "@/lib/cart/use-cart-count";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  className?: string;
  onNavigate?: () => void;
};

export function CartNavLink({ className, onNavigate }: Props) {
  const count = useCartCount();

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative", className)}
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <ShoppingBag className="size-5" />
      {count > 0 ? (
        <Badge className="absolute -right-1 -top-1 flex min-w-5 justify-center px-1 text-[10px] font-bold">
          {count > 99 ? "99+" : count}
        </Badge>
      ) : null}
    </Link>
  );
}
