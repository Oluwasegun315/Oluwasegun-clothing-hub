"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Something went wrong</p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">Could not load this product</h1>
      <p className="mt-2 text-sm text-gray-600">Please try again or browse the shop.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset} className="rounded-full">
          Try again
        </Button>
        <Link href="/shop">
          <Button type="button" variant="outline" className="rounded-full">
            Back to shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
