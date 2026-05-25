import Link from "next/link";
import { Flame } from "lucide-react";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";

type Props = {
  products: Product[];
};

/** Premium header when viewing trending / streetwear shop. */
export function ShopTrendingBanner({ products }: Props) {
  const featured = products.slice(0, 4);
  if (!featured.length) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Flame className="size-4" aria-hidden />
            Trending streetwear
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">What everyone is buying</h2>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Curated from your Streetwear collection — premium looks, everyday prices. Use code OLUWASEGUN10 for 10%
            off.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Back to home
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featured.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="overflow-hidden rounded-xl border border-border bg-white transition hover:border-primary hover:shadow-md"
          >
            <div className="relative aspect-[3/4] bg-neutral-100">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
              ) : null}
              <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                Hot
              </span>
            </div>
            <p className="truncate p-2 text-xs font-semibold">{p.name}</p>
            <p className="px-2 pb-2 text-sm font-bold text-primary">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
