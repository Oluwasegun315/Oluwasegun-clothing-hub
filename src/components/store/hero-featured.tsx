import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/database";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  totalCount: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
    price
  );
}

/**
 * Pro buyer hero: 3 featured clothing pieces + clear shop CTA.
 */
export function HeroFeatured({ products, totalCount }: Props) {
  const featured = products.slice(0, 3);

  return (
    <section className="border-b border-border bg-gradient-to-br from-orange-50 via-white to-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-14 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Oluwasegun Clothing Hub</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Quality fashion for
            <span className="text-primary"> every day</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            {totalCount} styles in stock — adult & kids. Tap a look below or browse the full shop.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-lg px-8")}>
              Shop all products
            </Link>
            <Link
              href="/shop?age=kids"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-lg px-8")}
            >
              Kids collection
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className={cn(
                "group overflow-hidden rounded-2xl border border-border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl",
                i === 1 && "sm:mt-6"
              )}
            >
              <div className="relative aspect-[3/4] bg-neutral-100">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 33vw, 200px"
                    priority={i === 0}
                  />
                ) : null}
                {p.badge ? (
                  <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    {p.badge}
                  </span>
                ) : null}
              </div>
              <div className="space-y-1 p-3">
                <p className="line-clamp-2 text-xs font-semibold leading-snug text-foreground sm:text-sm">{p.name}</p>
                <p className="text-sm font-bold text-primary sm:text-base">{formatPrice(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
