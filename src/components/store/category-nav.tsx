"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  { label: "All", href: "/shop", match: {} },
  { label: "Trending", href: "/shop?category=Streetwear", match: { category: "Streetwear" } },
  { label: "Men", href: "/shop?age=adult", match: { age: "adult" } },
  { label: "Kids", href: "/shop?age=kids", match: { age: "kids" } },
  { label: "Outerwear", href: "/shop?category=Outerwear", match: { category: "Outerwear" } },
  { label: "Footwear", href: "/shop?category=Footwear", match: { category: "Footwear" } },
  { label: "Denim", href: "/shop?category=Denim", match: { category: "Denim" } },
  { label: "Active", href: "/shop?category=Active", match: { category: "Active" } },
  { label: "New", href: "/new-arrivals", match: { page: "/new-arrivals" } },
] as const;

export function CategoryNav() {
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <nav className="flex gap-2 overflow-x-auto border-t border-border bg-orange-50/80 px-4 py-2 sm:px-6 [scrollbar-width:thin]">
      {LINKS.map((l) => {
        let active = false;
        if ("page" in l.match && l.match.page) {
          active = pathname === l.match.page;
        } else if (pathname === "/shop") {
          const age = params.get("age");
          const category = params.get("category");
          if ("age" in l.match && l.match.age) active = age === l.match.age && !category;
          else if ("category" in l.match && l.match.category) active = category === l.match.category;
          else if (l.href === "/shop") active = !age && !category && !params.get("gender") && !params.get("q");
        }
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-white text-foreground hover:bg-primary/10"
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
