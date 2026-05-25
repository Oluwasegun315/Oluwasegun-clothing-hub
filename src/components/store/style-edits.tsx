import Link from "next/link";

import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/format-price";

type Edit = {
  title: string;
  mood: string;
  href: string;
  pieces: Product[];
};

type Props = {
  edits: Edit[];
};

/**
 * "Shop the look" rows — what ASOS, Mr Porter & Nike do: curated outfits, not random grids.
 */
export function StyleEdits({ edits }: Props) {
  return (
    <section className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-orange-400">Style edits</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Complete the fit</h2>
        <p className="mt-2 max-w-xl text-gray-400">
          Curated combinations from your catalog — tap any piece to view or build the bag.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {edits.map((edit) => (
            <div
              key={edit.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">{edit.mood}</p>
              <h3 className="mt-1 text-xl font-bold">{edit.title}</h3>
              <div className="mt-4 flex gap-2">
                {edit.pieces.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="group relative aspect-[3/4] w-1/3 overflow-hidden rounded-lg bg-neutral-800"
                  >
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {edit.pieces.map((p) => (
                  <li key={`line-${p.id}`}>
                    <Link href={`/product/${p.id}`} className="flex justify-between gap-2 text-sm hover:text-orange-300">
                      <span className="line-clamp-1">{p.name}</span>
                      <span className="shrink-0 font-bold text-orange-300">{formatPrice(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={edit.href}
                className="mt-4 inline-block text-sm font-bold text-orange-400 hover:text-orange-300"
              >
                Shop this edit →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
