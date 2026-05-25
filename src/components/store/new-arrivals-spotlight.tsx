import Link from "next/link";
import { Sparkles } from "lucide-react";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";

type Props = {
  products: Product[];
};

/** "Just landed" row — urgency merchandising used by Zara, H&M, Uniqlo homepages. */
export function NewArrivalsSpotlight({ products }: Props) {
  const picks = products.slice(0, 6);
  if (!picks.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase text-white">
            <Sparkles className="size-3" aria-hidden />
            Just landed
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">Fresh from the rack</h2>
          <p className="mt-1 text-gray-600">Newest heat across streetwear and men&apos;s — updated from your folders.</p>
        </div>
        <Link href="/new-arrivals" className="text-sm font-bold text-orange-600 hover:underline">
          All new arrivals →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {picks.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition hover:border-orange-400 hover:shadow-md"
          >
            <div className="relative aspect-[3/4] bg-neutral-100">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : null}
              <span className="absolute left-2 top-2 rounded bg-gray-900 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                New
              </span>
            </div>
            <div className="p-2.5">
              <p className="line-clamp-2 text-xs font-semibold text-gray-900">{p.name}</p>
              <p className="mt-0.5 text-sm font-bold text-orange-600">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
