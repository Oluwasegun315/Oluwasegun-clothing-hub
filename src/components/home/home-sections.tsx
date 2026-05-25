"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import type { Product } from "@/types/database";
import { CampaignStrip } from "@/components/shop/campaign-strip";
import { ProductCard } from "@/components/shop/product-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const testimonials = [
  {
    quote:
      "It feels like walking into a campaign — every scroll is intentional, every piece has presence.",
    name: "Amara K.",
    role: "Creative Director, Lagos",
  },
  {
    quote:
      "The tailoring section alone rewired how I shop online. This is not fast fashion energy.",
    name: "Jonas M.",
    role: "Architect, Berlin",
  },
  {
    quote:
      "Dark, minimal, confident. Exactly how a modern luxury house should feel on the web.",
    name: "Lena V.",
    role: "Stylist, NYC",
  },
] as const;

const gallery = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=900&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80",
] as const;

type HomeSectionsProps = {
  products: Product[];
};

/**
 * Homepage editorial blocks: collections, arrivals, trending, story, voices, gallery.
 * Uses live `products` rows for merchandising grids when Supabase is configured.
 */
export function HomeSections({ products }: HomeSectionsProps) {
  const featured = products.slice(0, 4);
  const arrivals = products.slice(0, 8);
  const trending = products.slice(4, 12);

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <CampaignStrip
          title="Global quiet luxury"
          subtitle="Adult street systems and kids flex lines — one hub, two universes. Oversized volumes, neutral palettes, and campaign-grade drops."
          image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          href="/shop"
          align="left"
        />
      </div>

      {/* Featured collections */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.08),_transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary">FEATURED</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl text-foreground sm:text-5xl">
                Collections engineered for silhouette.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                Curated capsules that move between runway discipline and street velocity — each
                piece chosen for emotional impact.
              </p>
            </div>
            <Link
              href="/collections"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "self-start rounded-full border-primary/25 bg-muted px-6 text-foreground hover:bg-border lg:self-auto"
              )}
            >
              View collections
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                title: "Nocturne Tailoring",
                copy: "Midnight palettes, razor lapels, slow luxury.",
                href: "/collections",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
              },
              {
                title: "Velocity Street",
                copy: "Oversized volumes, matte hardware, kinetic energy.",
                href: "/collections",
                image:
                  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=80",
              },
              {
                title: "Lunar Evening",
                copy: "Silk tension, negative space, cinematic light.",
                href: "/collections",
                image:
                  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&q=80",
              },
              {
                title: "Apex Active",
                copy: "Performance skins, reflective seams, future motion.",
                href: "/collections",
                image:
                  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
              },
            ].map((c) => (
              <motion.div key={c.title} variants={item}>
                <Link href={c.href} className="group block overflow-hidden rounded-2xl border border-border bg-muted">
                  <div className="relative aspect-[4/5]">
                    <Image src={c.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5">
                      <p className="font-display text-lg text-primary-foreground">{c.title}</p>
                      <p className="mt-2 text-sm text-primary-foreground/90">{c.copy}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-display text-xs tracking-[0.4em] text-primary">NEW ARRIVALS</p>
              <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Fresh from the atelier.</h2>
            </div>
            <Link href="/new-arrivals" className={cn(buttonVariants(), "rounded-full px-6 glow-button")}>
              Shop arrivals
            </Link>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {arrivals.length ? (
              arrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect Supabase and run `supabase/schema.sql` to hydrate live products.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-primary" />
            <p className="font-display text-xs tracking-[0.4em] text-primary">TRENDING</p>
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-foreground sm:text-5xl">
            What the hub is obsessing over right now.
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trending.length ? (
              trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
            ) : null}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
              alt="Boutique interior"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-transparent to-primary/60" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-primary">LUXURY BRAND STORY</p>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              Oluwasegun is a frequency — not a logo.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Born from the tension between global street culture and couture discipline, Oluwasegun
              Clothing Hub is a living moodboard for people who dress like they mean it. We chase
              silhouette, texture, and narrative — building a digital flagship that feels as
              intimate as a private fitting, as electric as a runway finale.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted p-5">
                <p className="font-display text-3xl text-primary">24+</p>
                <p className="mt-2 text-sm text-muted-foreground">Global atelier partners</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-5">
                <p className="font-display text-3xl text-primary">∞</p>
                <p className="mt-2 text-sm text-muted-foreground">Ways to remix your identity</p>
              </div>
            </div>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-10 inline-flex rounded-full border-primary/25 bg-transparent px-6 text-foreground hover:bg-border"
              )}
            >
              Read the manifesto
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-xs tracking-[0.4em] text-primary">VOICES</p>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Trusted by tastemakers.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="glass-dark rounded-2xl p-6"
              >
                <blockquote className="text-sm leading-relaxed text-primary-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-xs tracking-[0.25em] text-muted-foreground">
                  {t.name.toUpperCase()} — {t.role.toUpperCase()}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-gradient-to-br from-white/[0.07] to-transparent px-6 py-12 text-center sm:px-12">
          <p className="font-display text-xs tracking-[0.4em] text-primary">NEWSLETTER</p>
          <h3 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">First access. Private drops.</h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Join the inner list — curated edits, early releases, and invitations to digital salons.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              className="h-11 flex-1 rounded-full border border-border bg-background/40 px-5 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
              placeholder="Email address"
              type="email"
              required
            />
            <Button type="submit" className="rounded-full px-6 glow-button">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Instagram-style gallery */}
      <section className="border-t border-border py-16">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-primary">FIELD NOTES</p>
            <h3 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">A living moodboard.</h3>
          </div>
          <Link href="/shop" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
            @oluwasegunhub
          </Link>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              className="relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width:768px) 50vw, 16vw" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured product strip (uses DB when available) */}
      {featured.length ? (
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-foreground sm:text-3xl">Editor&apos;s picks</h3>
              <Link href="/shop" className={cn(buttonVariants({ variant: "ghost" }), "text-muted-foreground")}>
                View all
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
