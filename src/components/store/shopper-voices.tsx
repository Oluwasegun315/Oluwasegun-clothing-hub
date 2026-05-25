import { Quote } from "lucide-react";

const VOICES = [
  {
    quote:
      "The streetwear wall is actually curated — I found three pieces I would've missed in a plain grid.",
    name: "Tunde A.",
    detail: "Repeat buyer · Men's & trending",
  },
  {
    quote:
      "Kids' section photos look real, not stock. Sizing felt honest and checkout was straightforward.",
    name: "Chioma E.",
    detail: "Kids' shop · Weekend restock",
  },
  {
    quote:
      "OLUWASEGUN10 worked first try. Felt like a proper boutique online, not a template store.",
    name: "Jay R.",
    detail: "First order · Streetwear drop",
  },
] as const;

/** Social proof strip — reviews drive fashion conversion (Revolve, Gymshark pattern). */
export function ShopperVoices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-orange-600">From the community</p>
      <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">Why people stay</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {VOICES.map((v) => (
          <figure
            key={v.name}
            className="relative rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
          >
            <Quote className="size-8 text-orange-200" aria-hidden />
            <blockquote className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{v.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 border-t border-orange-50 pt-4">
              <p className="font-bold text-gray-900">{v.name}</p>
              <p className="text-xs text-gray-500">{v.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
