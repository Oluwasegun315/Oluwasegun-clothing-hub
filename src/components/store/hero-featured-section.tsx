import type { Product } from "@/types/database";
import { HeroLeftShowcase } from "@/components/store/hero-left-showcase";
import { HeroPremiumPanel } from "@/components/store/hero-premium-panel";

type Props = {
  menHero: Product[];
  kidsHero: Product[];
  streetwear: Product[];
  totalCount: number;
};

/**
 * Homepage hero — LEFT: brand showcase (always filled).
 * RIGHT: product carousel.
 */
export function HeroFeaturedSection({ menHero, kidsHero, streetwear, totalCount }: Props) {
  return (
    <section className="border-b-2 border-orange-100 bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.4em] text-orange-600">
          Welcome to your store
        </p>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <HeroLeftShowcase streetwear={streetwear} totalCount={totalCount} />
          <HeroPremiumPanel trending={streetwear.slice(0, 8)} men={menHero} kids={kidsHero} />
        </div>
      </div>
    </section>
  );
}
