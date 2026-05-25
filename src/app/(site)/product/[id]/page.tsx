import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProductById } from "@/lib/data/products";
import { getRelatedProducts } from "@/lib/data/local-store-catalog";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductAddControls } from "@/components/shop/product-add-controls";
import { ProductDetailExplorer } from "@/components/shop/product-detail-explorer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) redirect("/shop");

  const related = getRelatedProducts(product, 5);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const rating = product.rating ?? 4.8;
  const sizeList =
    product.sizes_available?.split(/[,/]/).map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <ProductDetailExplorer current={product} related={related} />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge ? (
              <Badge className="border-0 bg-primary/90 text-[10px] font-semibold tracking-widest text-primary-foreground">
                {product.badge}
              </Badge>
            ) : null}
            {product.is_trending ? (
              <Badge variant="outline" className="border-primary/30 text-[10px] tracking-widest text-foreground">
                Trending
              </Badge>
            ) : null}
            {product.age_group === "kids" ? (
              <Badge variant="outline" className="border-primary/40 text-[10px] tracking-widest text-primary">
                Kids collection
              </Badge>
            ) : null}
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-primary">Product</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-orange-50 px-3 py-1.5 text-sm">
              <Star className="size-4 fill-primary text-primary" aria-hidden />
              <span className="font-medium tabular-nums">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">rating</span>
            </div>
          </div>
          <Separator className="my-6 bg-border" />
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.category ? (
              <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium">
                {product.category}
              </span>
            ) : null}
            {product.gender ? (
              <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium">
                {product.gender}
              </span>
            ) : null}
          </div>
          {sizeList.length ? (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Sizes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizeList.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-semibold text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-8">
            <ProductAddControls productId={product.id} isAuthed={Boolean(user)} />
          </div>

          {related.length > 0 ? (
            <div className="mt-10 rounded-xl border border-border bg-orange-50/50 p-4">
              <p className="text-sm font-bold text-foreground">More in this collection</p>
              <ul className="mt-2 space-y-1">
                {related.slice(0, 4).map((r) => (
                  <li key={r.id}>
                    <Link href={`/product/${r.id}`} className="text-sm text-primary hover:underline">
                      {r.name} — {formatPrice(r.price)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Link href={product.age_group === "kids" ? "/shop?age=kids" : "/shop?age=adult"} className={cn(buttonVariants({ variant: "ghost" }), "mt-8 px-0 text-muted-foreground")}>
            ← Back to {product.age_group === "kids" ? "kids" : "men"}&apos;s shop
          </Link>
        </div>
      </div>
    </div>
  );
}
