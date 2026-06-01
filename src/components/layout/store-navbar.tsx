"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { AccountNav } from "@/components/layout/account-nav";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CategoryNav } from "@/components/store/category-nav";

const MAIN = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Streetwear", label: "Trending" },
  { href: "/shop?age=adult", label: "Men" },
  { href: "/shop?age=kids", label: "Kids" },
] as const;

export function StoreNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:px-6">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>{SITE_NAME}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-2">
              {MAIN.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-orange-50"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-orange-50"
              >
                Cart
              </Link>
              <AccountNav variant="mobile" onNavigate={() => setMenuOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="shrink-0 font-display text-sm font-bold tracking-wide text-primary sm:text-base">
          OLUWASEGUN
        </Link>

        <nav className="hidden gap-1 lg:flex">
          {MAIN.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                pathname === l.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-orange-50"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form action="/shop" method="get" className="ml-auto hidden max-w-xs flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input name="q" placeholder="Search clothing…" className="h-9 pl-9" />
          </div>
        </form>

        <Link href="/cart" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} aria-label="Cart">
          <ShoppingBag className="size-5" />
        </Link>
        <AccountNav />
      </div>
      <Suspense fallback={null}>
        <CategoryNav />
      </Suspense>
    </header>
  );
}
