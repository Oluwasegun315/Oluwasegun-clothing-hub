export const SITE_NAME = "OLUWASEGUN CLOTHING HUB";

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
] as const;

/** Main marketplace departments — shown on home + nav. */
export const SHOP_CATEGORIES = [
  { label: "Streetwear", href: "/shop?category=Streetwear", emoji: "👕" },
  { label: "Outerwear", href: "/shop?category=Outerwear", emoji: "🧥" },
  { label: "Footwear", href: "/shop?category=Footwear", emoji: "👟" },
  { label: "Denim", href: "/shop?category=Denim", emoji: "👖" },
  { label: "Active", href: "/shop?category=Active", emoji: "⚡" },
  { label: "Kids", href: "/shop?age=kids", emoji: "🧒" },
] as const;

export const SHOP_UNIVERSES = [
  { label: "All", href: "/shop" },
  { label: "Adult", href: "/shop?age=adult" },
  { label: "Kids", href: "/shop?age=kids" },
  { label: "Women", href: "/shop?gender=Women" },
  { label: "Men", href: "/shop?gender=Men" },
  { label: "New", href: "/new-arrivals" },
] as const;

/** Public site URL for OAuth redirects (must match Supabase redirect allow list). */
export function getPublicSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
