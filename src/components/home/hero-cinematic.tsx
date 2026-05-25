"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** High-impact editorial slides — full-bleed fashion, minimal wash so imagery stays vivid. */
const SLIDES = [
  {
    id: "runway",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90",
    kicker: "SS26 / FLAGSHIP DROP",
    title: "Own the sidewalk.",
    highlight: "Runway energy.",
    subtitle:
      "Oversized street, quiet luxury tailoring, and drops that hit like a campaign — not a catalog.",
    primaryCta: { href: "/shop", label: "Shop the edit" },
    secondaryCta: { href: "/new-arrivals", label: "New arrivals" },
  },
  {
    id: "street",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2400&q=90",
    kicker: "STREET SYSTEMS",
    title: "Volume. Attitude.",
    highlight: "Zero noise.",
    subtitle:
      "Cargos, hoodies, and hardware-forward layers built for motion — the kind of fit people stop you for.",
    primaryCta: { href: "/shop?category=Streetwear", label: "Streetwear" },
    secondaryCta: { href: "/collections", label: "Collections" },
  },
  {
    id: "evening",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=90",
    kicker: "EVENING / TAILORING",
    title: "Turn heads",
    highlight: "after dark.",
    subtitle:
      "Silk tension, razor lines, and evening pieces that photograph themselves — dress like the room owes you.",
    primaryCta: { href: "/shop?category=Evening", label: "Evening edit" },
    secondaryCta: { href: "/shop", label: "Full marketplace" },
  },
  {
    id: "kids",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2400&q=90",
    kicker: "LITTLE ICONS",
    title: "Kids flex.",
    highlight: "Grown-up taste.",
    subtitle:
      "Premium mini streetwear and play-proof outerwear — same editorial eye, scaled for the next generation.",
    primaryCta: { href: "/shop?age=kids", label: "Shop kids" },
    secondaryCta: { href: "/shop?age=adult", label: "Adult universe" },
  },
] as const;

const STATS = [
  { value: "100+", label: "Curated SKUs" },
  { value: "2", label: "Universes" },
  { value: "24/7", label: "Global hub" },
] as const;

/**
 * Split editorial hero: bold copy panel + full-height imagery with Ken Burns motion.
 */
export function HeroCinematic() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const id = window.setInterval(next, 6500);
    return () => window.clearInterval(id);
  }, [next]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background lg:min-h-[92vh]">
      <div className="grid min-h-[100svh] lg:min-h-[92vh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Copy panel */}
        <div className="relative z-10 flex flex-col justify-between px-5 pb-10 pt-24 sm:px-8 lg:px-10 lg:py-14 xl:px-14">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              <span className="font-display text-[10px] tracking-[0.35em] text-primary sm:text-xs">
                OLUWASEGUN CLOTHING HUB
              </span>
            </div>
            <p className="font-display text-xs tabular-nums tracking-widest text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </p>
          </div>

          <div className="mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-xs tracking-[0.4em] text-primary">{slide.kicker}</p>
                <h1 className="mt-4 font-display text-[2.75rem] leading-[0.9] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  {slide.title}
                  <span className="block text-primary">{slide.highlight}</span>
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                  <Link
                    href={slide.primaryCta.href}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "group h-12 rounded-full px-8 text-sm font-semibold tracking-wide glow-button"
                    )}
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 rounded-full border-primary/40 px-8 text-sm tracking-wide hover:bg-primary/10"
                    )}
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8 lg:mt-10">
            <ul className="grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <li key={s.label}>
                  <p className="font-display text-2xl text-primary sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-12 bg-primary" : "w-3 bg-primary/25 hover:bg-primary/45"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-full border-primary/30"
                  onClick={prev}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-full border-primary/30"
                  onClick={next}
                  aria-label="Next slide"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative min-h-[52vh] lg:min-h-full">
          <div className="absolute inset-0 lg:inset-y-3 lg:right-3 lg:left-0">
            <div className="relative h-full overflow-hidden rounded-none lg:rounded-[2rem] lg:border lg:border-primary/20 lg:shadow-[0_40px_100px_-40px_rgba(234,88,12,0.45)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + "-img"}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.07, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      priority
                      className="object-cover object-[center_20%]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Light wash — image stays the hero */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent lg:bg-gradient-to-l lg:from-primary/50 lg:via-transparent lg:to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent lg:from-white/20"
                aria-hidden
              />

              {/* Slide label on image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 lg:bottom-8 lg:left-8 lg:right-8">
                <p className="max-w-[200px] font-display text-[10px] leading-relaxed tracking-[0.35em] text-primary-foreground drop-shadow-sm sm:text-xs">
                  {slide.kicker}
                </p>
                <span className="rounded-full border border-primary-foreground/40 bg-primary/90 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-primary-foreground">
                  LIVE DROP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
