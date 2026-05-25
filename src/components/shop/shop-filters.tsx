"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
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

const genders = ["all", "Men", "Women", "Unisex", "Boys", "Girls", "Kids"] as const;

const ages = ["all", "adult", "kids"] as const;

type Props = {
  initialQ?: string;
};

/**
 * Shop toolbar: search, category, gender, adult/kids universe — all URL-driven for SSR + shareable links.
 */
export function ShopFilters({ initialQ = "" }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  const current = useMemo(
    () => ({
      q: params.get("q") ?? "",
      category: params.get("category") ?? "all",
      gender: params.get("gender") ?? "all",
      age: params.get("age") ?? "all",
    }),
    [params]
  );

  const push = (next: { q?: string; category?: string; gender?: string; age?: string }) => {
    const sp = new URLSearchParams(params.toString());
    const merged = {
      q: next.q ?? current.q,
      category: next.category ?? current.category,
      gender: next.gender ?? current.gender,
      age: next.age ?? current.age,
    };
    if (merged.q) sp.set("q", merged.q);
    else sp.delete("q");
    if (merged.category && merged.category !== "all") sp.set("category", merged.category);
    else sp.delete("category");
    if (merged.gender && merged.gender !== "all") sp.set("gender", merged.gender);
    else sp.delete("gender");
    if (merged.age && merged.age !== "all") sp.set("age", merged.age);
    else sp.delete("age");
    const qs = sp.toString();
    startTransition(() => router.push(qs ? `/shop?${qs}` : "/shop"));
  };

  return (
    <div className="space-y-8">
      <form
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
        onSubmit={(e) => {
          e.preventDefault();
          push({ q });
        }}
      >
        <div className="relative min-h-[3rem] flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cargos, hoodies, kids flex, quiet luxury…"
            className="h-12 rounded-2xl border-border bg-background/50 pl-12 text-base md:h-14 md:text-lg"
          />
        </div>
        <Button type="submit" className="h-12 rounded-2xl px-10 text-base md:h-14" disabled={pending}>
          Search
        </Button>
      </form>

      <div>
        <span className="text-[10px] font-medium tracking-[0.35em] text-muted-foreground">UNIVERSE</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {ages.map((a) => (
            <Button
              key={a}
              type="button"
              size="lg"
              variant={current.age === a ? "default" : "outline"}
              className="rounded-full border-border px-6"
              onClick={() => push({ age: a })}
              disabled={pending}
            >
              {a === "all" ? "All" : a === "adult" ? "Adult collection" : "Kids collection"}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-medium tracking-[0.35em] text-muted-foreground">CATEGORY</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={current.category === c ? "default" : "outline"}
              className="rounded-full border-border"
              onClick={() => push({ category: c })}
              disabled={pending}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-medium tracking-[0.35em] text-muted-foreground">GENDER / FIT</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {genders.map((g) => (
            <Button
              key={g}
              type="button"
              size="sm"
              variant={current.gender === g ? "default" : "outline"}
              className="rounded-full border-border"
              onClick={() => push({ gender: g })}
              disabled={pending}
            >
              {g}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
