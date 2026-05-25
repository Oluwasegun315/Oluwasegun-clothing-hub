import Link from "next/link";
import { Flame, Shirt, Baby, Sparkles, Grid3X3 } from "lucide-react";

import { cn } from "@/lib/utils";

const TILES = [
  {
    href: "/shop?category=Streetwear",
    label: "Trending streetwear",
    desc: "Hot styles everyone is buying",
    icon: Flame,
    accent: "bg-orange-600",
  },
  {
    href: "/shop?age=adult",
    label: "Men's shop",
    desc: "Everyday & occasion wear",
    icon: Shirt,
    accent: "bg-primary",
  },
  {
    href: "/shop?age=kids",
    label: "Kids' shop",
    desc: "Comfort for all ages",
    icon: Baby,
    accent: "bg-amber-600",
  },
  {
    href: "/new-arrivals",
    label: "New arrivals",
    desc: "Fresh drops this week",
    icon: Sparkles,
    accent: "bg-rose-500",
  },
  {
    href: "/shop",
    label: "Full catalog",
    desc: "Browse everything",
    icon: Grid3X3,
    accent: "bg-neutral-700",
  },
] as const;

export function ExploreSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <h2 className="text-xl font-bold text-foreground">Explore the store</h2>
      <p className="mt-1 text-sm text-muted-foreground">Jump straight to what you want — men, kids, trending & more.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col rounded-xl border border-border bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <span className={cn("inline-flex size-10 items-center justify-center rounded-lg text-white", t.accent)}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="mt-3 font-bold text-foreground group-hover:text-primary">{t.label}</span>
              <span className="mt-1 text-xs text-muted-foreground">{t.desc}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
