import Link from "next/link";
import { Mail, Share2 } from "lucide-react";

import { SITE_NAME } from "@/lib/constants";

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t border-orange-100 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold tracking-wide text-white">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
              Men&apos;s, kids&apos;, and streetwear — one hub built around your inventory. Use{" "}
              <span className="font-bold text-orange-400">OLUWASEGUN10</span> for 10% off.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Shop</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/shop?category=Streetwear" className="hover:text-white">
                Trending streetwear
              </Link>
              <Link href="/shop?age=adult" className="hover:text-white">
                Men&apos;s
              </Link>
              <Link href="/shop?age=kids" className="hover:text-white">
                Kids&apos;
              </Link>
              <Link href="/new-arrivals" className="hover:text-white">
                New arrivals
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Help</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
              <Link href="/about" className="hover:text-white">
                About the hub
              </Link>
              <Link href="/login" className="hover:text-white">
                Sign in
              </Link>
              <a href="mailto:hello@oluwasegun.com" className="inline-flex items-center gap-1.5 hover:text-white">
                <Mail className="size-3.5" aria-hidden />
                Contact
              </a>
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Oluwasegun Clothing Hub</p>
          <span className="inline-flex items-center gap-1.5 text-gray-400">
            <Share2 className="size-3.5" aria-hidden />
            Share your fit · tag the hub
          </span>
        </div>
      </div>
    </footer>
  );
}
