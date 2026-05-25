"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Client-only newsletter row so `onSubmit` is not serialized from a Server Component. */
export function FooterNewsletter() {
  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        type="email"
        required
        placeholder="you@domain.com"
        className="h-10 border-border bg-muted"
      />
      <Button type="submit" className="glow-button shrink-0">
        Join
      </Button>
    </form>
  );
}
