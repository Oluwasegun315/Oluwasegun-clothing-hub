import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** About the brand — editorial storytelling page (static content, production-ready layout). */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
            alt="Fashion retail interior"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-transparent to-primary/70" />
        </div>
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-primary">ABOUT THE BRAND</p>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
            Oluwasegun Clothing Hub is a global attitude.
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              We exist at the intersection of couture discipline and street velocity — a digital
              flagship for people who treat dressing as creative direction, not routine.
            </p>
            <p>
              Every interaction is designed to feel like a private viewing: cinematic pacing,
              tactile surfaces, and typography that whispers instead of shouts. This is not a
              template store — it is a living house of style.
            </p>
            <p>
              Behind the scenes, Supabase powers authentication, profiles, catalog data, and cart
              persistence — so the experience you see here can scale from prototype to production
              without compromising craft.
            </p>
          </div>
          <Link
            href="/shop"
            className={cn(buttonVariants(), "mt-10 inline-flex rounded-full px-8 glow-button")}
          >
            Shop the vision
          </Link>
        </div>
      </div>
    </div>
  );
}
