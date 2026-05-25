import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/types/database";

type Props = {
  streetwear: Product;
  men: Product;
  kids: Product;
};

/** Magazine-style shop-by-world cards — like Zara Home / END. lookbook rows. */
export function LookbookEditorial({ streetwear, men, kids }: Props) {
  const cards = [
    {
      product: streetwear,
      label: "The drop",
      tagline: "Graphics, chains & heat — what's moving now.",
      href: "/shop?category=Streetwear",
      tone: "from-black/75 via-black/25 to-transparent",
    },
    {
      product: men,
      label: "Everyday kings",
      tagline: "Clean tees, layers, and weekend-ready fits.",
      href: "/shop?age=adult",
      tone: "from-orange-950/80 via-orange-900/30 to-transparent",
    },
    {
      product: kids,
      label: "Little icons",
      tagline: "Comfort-first pieces they'll actually wear.",
      href: "/shop?age=kids",
      tone: "from-amber-950/75 via-amber-900/25 to-transparent",
    },
  ] as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-orange-600">Shop by world</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Three closets. One hub.
        </h2>
        <p className="mt-3 text-gray-600">
          Top fashion sites don&apos;t dump a grid — they tell you where to go. Pick your lane and
          shop the edit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-200 shadow-lg ring-1 ring-black/5"
          >
            {c.product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.product.image_url}
                alt={c.product.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className={`absolute inset-0 bg-gradient-to-t ${c.tone}`} />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-300">{c.label}</p>
              <p className="mt-2 text-xl font-bold leading-snug">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-200 group-hover:text-white">
                Enter shop
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
