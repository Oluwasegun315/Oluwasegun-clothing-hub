import Link from "next/link";
import { Globe2, Send, CirclePlay } from "lucide-react";

import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";

/**
 * Editorial footer: navigation, socials, newsletter field (wire to your backend later).
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="font-display text-sm tracking-[0.35em] text-primary">
              {SITE_NAME}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A global fashion house energy — precision tailoring, street tension, and
              cinematic presentation. Built for explorers of silhouette and story.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="https://instagram.com"
                className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                aria-label="Instagram"
              >
              <Globe2 className="size-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                aria-label="X"
              >
              <Send className="size-4" />
              </Link>
              <Link
                href="https://youtube.com"
                className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                aria-label="YouTube"
              >
              <CirclePlay className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
              EXPLORE
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cart" className="transition hover:text-foreground">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
              PRIVATE LIST
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Early access to drops, atelier events, and limited collaborations.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Oluwasegun Clothing Hub. Crafted for motion.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-foreground">
              Brand
            </Link>
            <span className="text-muted-foreground/60">Privacy</span>
            <span className="text-muted-foreground/60">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
