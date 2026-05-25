import Link from "next/link";

import { SHOP_UNIVERSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Sticky-feel department chips under the hero — marketplace navigation. */
export function ShopUniverseBar() {
  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {SHOP_UNIVERSES.map((u) => (
          <Link
            key={u.href}
            href={u.href}
            className={cn(
              "shrink-0 rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-foreground transition",
              "hover:border-primary hover:bg-primary/10 hover:text-primary"
            )}
          >
            {u.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
