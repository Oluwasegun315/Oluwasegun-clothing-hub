"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site error", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Something went wrong</p>
      <h1 className="mt-2 text-2xl font-bold text-foreground">The page could not load</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please try again or go back to the shop.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset} className="rounded-full glow-button">
          Try again
        </Button>
        <Link href="/">
          <Button type="button" variant="outline" className="rounded-full">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
