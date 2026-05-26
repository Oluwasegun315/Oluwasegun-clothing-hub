"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";

import { NAV_LINKS, SHOP_CATEGORIES, SITE_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Sticky luxury navbar: scroll-aware glass surface, search, cart, profile, mobile sheet.
 */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setUserEmail(null);
        setAvatarUrl(null);
        setDisplayName(null);
        setCartCount(0);
        return;
      }
      setUserEmail(user.email ?? null);
      setAvatarUrl(
        (user.user_metadata?.avatar_url as string | undefined) ??
          (user.user_metadata?.picture as string | undefined) ??
          null
      );
      setDisplayName(
        (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          null
      );

      const { data: rows } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);
      if (cancelled) return;
      const sum = (rows ?? []).reduce((acc, r) => acc + (r.quantity ?? 0), 0);
      setCartCount(sum);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  const initials = useMemo(() => {
    const base = displayName || userEmail || "OH";
    const parts = base.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return base.slice(0, 2).toUpperCase();
  }, [displayName, userEmail]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setMobileOpen(false);
  };

  const onLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed out");
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav
      className={cn(
        "flex gap-6 text-sm tracking-wide text-muted-foreground",
        mobile ? "flex-col" : "hidden items-center lg:flex"
      )}
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => mobile && setMobileOpen(false)}
          className={cn(
            "transition-colors hover:text-foreground",
            pathname === link.href && "text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
          backdropFilter: scrolled ? "blur(22px)" : "blur(14px)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex shrink-0 flex-col leading-none">
            <span className="font-display text-xs tracking-[0.35em] text-primary">
              OLUWASEGUN
            </span>
            <span className="font-display text-[10px] tracking-[0.55em] text-muted-foreground transition group-hover:text-foreground">
              CLOTHING HUB
            </span>
          </Link>

          <NavLinks />

          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden rounded-full px-5 lg:inline-flex"
            )}
          >
            All products
          </Link>

          <form
            onSubmit={onSearchSubmit}
            className="ml-auto hidden min-w-[220px] max-w-md flex-1 items-center gap-2 md:flex"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hoodies, denim, kids wear…"
                className="h-10 rounded-full border-border bg-muted pl-10 text-sm"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Search on shop"
            >
              <Search className="size-5" />
            </Link>

            <Link
              href="/cart"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative"
              )}
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
              {cartCount > 0 ? (
                <Badge className="absolute -right-1 -top-1 min-w-5 justify-center px-1 text-[10px]">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              ) : null}
            </Link>

            {userEmail ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "rounded-full p-0"
                  )}
                  aria-label="Account menu"
                >
                  <Avatar className="size-9 border border-border">
                    <AvatarImage src={avatarUrl ?? undefined} alt="" />
                    <AvatarFallback className="bg-border text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {displayName || "Member"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    render={<Link href="/profile" className="w-full" />}
                    nativeButton={false}
                  >
                    <LayoutDashboard className="size-4" />
                    Profile / Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={onLogout}>
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "hidden sm:inline-flex"
                )}
              >
                <UserRound className="size-4" />
                Sign in
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      <SheetContent
        side="right"
        className="w-[min(100vw,380px)] border-l border-border"
      >
        <SheetHeader>
          <SheetTitle className="font-display tracking-[0.2em]">{SITE_NAME}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-6">
          <form onSubmit={onSearchSubmit} className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the hub…"
              className="h-10"
            />
            <Button type="submit" size="sm">
              Go
            </Button>
          </form>
          <NavLinks mobile />
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants(), "inline-flex w-full justify-center rounded-full")}
            >
              Browse all products
            </Link>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
          <div className="flex flex-wrap gap-2">
            {SHOP_CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
              >
                {c.label}
              </Link>
            ))}
          </div>
          {!userEmail ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants(), "inline-flex justify-center")}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "inline-flex justify-center"
                )}
              >
                Create account
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "inline-flex justify-center"
                )}
              >
                Profile
              </Link>
              <Button variant="destructive" onClick={onLogout}>
                Log out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
