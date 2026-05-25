import { BadgeCheck, Camera, Shirt, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Camera,
    title: "Shot on your rack",
    body: "Every listing uses your real inventory photos — what you see is what ships.",
  },
  {
    icon: Shirt,
    title: "Men, kids & street",
    body: "One hub for adult fits, little ones, and the trending streetwear wall.",
  },
  {
    icon: Sparkles,
    title: "OLUWASEGUN10",
    body: "10% off when you checkout with the house code — built for first-time fans.",
  },
  {
    icon: BadgeCheck,
    title: "Clear USD prices",
    body: "No guesswork at checkout. Tap a piece, see the price, add to bag.",
  },
] as const;

export function BrandTrustBar() {
  return (
    <section className="border-b border-orange-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{p.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
