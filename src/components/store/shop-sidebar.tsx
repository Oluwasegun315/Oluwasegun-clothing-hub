"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "all",
  "Streetwear",
  "Outerwear",
  "Footwear",
  "Denim",
  "Knitwear",
  "Active",
  "Formal",
  "Evening",
  "Accessories",
] as const;

export function ShopSidebar() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");

  const age = params.get("age") ?? "all";
  const category = params.get("category") ?? "all";
  const gender = params.get("gender") ?? "all";

  const go = (next: Record<string, string>) => {
    const sp = new URLSearchParams();
    const merged = {
      q: next.q ?? params.get("q") ?? "",
      age: next.age ?? age,
      category: next.category ?? category,
      gender: next.gender ?? gender,
    };
    if (merged.q) sp.set("q", merged.q);
    if (merged.age !== "all") sp.set("age", merged.age);
    if (merged.category !== "all") sp.set("category", merged.category);
    if (merged.gender !== "all") sp.set("gender", merged.gender);
    const qs = sp.toString();
    startTransition(() => router.push(qs ? `/shop?${qs}` : "/shop"));
  };

  return (
    <aside className="space-y-6 rounded-lg border border-border bg-white p-4 lg:sticky lg:top-28 lg:self-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go({ q });
        }}
      >
        <label className="text-xs font-semibold uppercase text-muted-foreground">Search</label>
        <div className="mt-2 flex gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Hoodie, denim…"
            className="h-9"
          />
          <Button type="submit" size="sm" disabled={pending}>
            Go
          </Button>
        </div>
      </form>

      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Who</p>
        <ul className="mt-2 space-y-1">
          {[
            { label: "Everyone", value: "all" },
            { label: "Men", value: "adult" },
            { label: "Kids", value: "kids" },
          ].map((item) => (
            <li key={item.value}>
              <button
                type="button"
                disabled={pending}
                onClick={() => go({ age: item.value })}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  age === item.value ? "bg-primary text-primary-foreground" : "hover:bg-orange-50"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Category</p>
        <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                disabled={pending}
                onClick={() => go({ category: c })}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  category === c ? "bg-primary text-primary-foreground" : "hover:bg-orange-50"
                )}
              >
                {c === "all" ? "All categories" : c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Gender</p>
        <ul className="mt-2 space-y-1">
          {["all", "Men", "Women", "Unisex", "Boys", "Girls"].map((g) => (
            <li key={g}>
              <button
                type="button"
                disabled={pending}
                onClick={() => go({ gender: g })}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  gender === g ? "bg-primary text-primary-foreground" : "hover:bg-orange-50"
                )}
              >
                {g === "all" ? "All" : g}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/shop" className="block text-center text-sm text-primary hover:underline">
        Clear all filters
      </Link>
    </aside>
  );
}
