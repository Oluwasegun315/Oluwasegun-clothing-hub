"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/database";
import { addToCartApi } from "@/lib/cart/add-to-cart";
import { notifyCartUpdated } from "@/lib/cart/use-cart-count";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
  index?: number;
  size?: "default" | "hero";
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * E-commerce product card: clothing photo, visible price/name, quick add — marketplace standard.
 */
export function ProductCard({ product, index = 0, size = "default" }: ProductCardProps) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverUrl = product.image_hover_url ?? product.image_url;
  const rating = product.rating ?? 4.8;

  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      const result = await addToCartApi(product.id, 1);
      if (result.ok) {
        toast.success("Added to cart", { description: product.name });
        notifyCartUpdated();
        router.refresh();
        return;
      }
      if (result.needsSignIn) {
        toast.message("Sign in to add to cart", { description: "Create an account or log in." });
        router.push(`/login?next=/product/${product.id}`);
        return;
      }
      if (result.needsCatalog) {
        toast.message("One-time setup needed", { description: result.message });
        return;
      }
      toast.error(result.message);
    } catch {
      toast.error("Could not update cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2), ease }}
      className={cn("group", size === "hero" && "md:col-span-2 md:row-span-2")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:border-primary/40 hover:shadow-md">
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            size === "hero" ? "aspect-[4/5] md:min-h-[420px]" : "aspect-[3/4]"
          )}
        >
          <Link href={`/product/${product.id}`} className="absolute inset-0 block">
            {product.image_url ? (
              <>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes={size === "hero" ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                  className={cn(
                    "object-cover transition duration-500",
                    hover && hoverUrl ? "scale-105 opacity-0" : "scale-100 opacity-100"
                  )}
                />
                {hoverUrl ? (
                  <Image
                    src={hoverUrl}
                    alt=""
                    fill
                    sizes={size === "hero" ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                    className={cn(
                      "object-cover transition duration-500",
                      hover ? "scale-105 opacity-100" : "scale-100 opacity-0"
                    )}
                  />
                ) : null}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
            )}
          </Link>

          <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
            {product.badge ? (
              <Badge className="border-0 bg-primary text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
                {product.badge}
              </Badge>
            ) : null}
            {product.is_trending ? (
              <Badge variant="secondary" className="bg-white/95 text-[9px] font-semibold text-primary">
                Trending
              </Badge>
            ) : null}
          </div>

          <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm">
            <Star className="size-3 fill-primary text-primary" aria-hidden />
            {rating.toFixed(1)}
          </div>

          <Button
            type="button"
            size="icon"
            className="absolute bottom-2 right-2 z-10 size-9 rounded-full bg-primary text-primary-foreground shadow-md"
            onClick={quickAdd}
            disabled={adding}
            aria-label="Add to cart"
          >
            <ShoppingBag className="size-4" />
          </Button>
        </div>

        <Link href={`/product/${product.id}`} className="block space-y-1 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {product.category ? <span>{product.category}</span> : null}
            {product.category && product.gender ? <span>·</span> : null}
            {product.gender ? <span>{product.gender}</span> : null}
            {product.age_group === "kids" ? (
              <Badge variant="outline" className="ml-auto border-primary/30 px-1.5 py-0 text-[9px] text-primary">
                Kids
              </Badge>
            ) : null}
          </div>
          <h3 className="line-clamp-2 font-medium leading-snug text-foreground">{product.name}</h3>
          <div className="flex items-center justify-between pt-1">
            <p className="text-lg font-semibold text-primary">${Number(product.price).toFixed(2)}</p>
            <span className="text-[10px] text-muted-foreground">View →</span>
          </div>
        </Link>
      </div>
    </motion.article>
  );
}
