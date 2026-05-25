"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Drop list CTA — early access + code reminder (standard on premium DTC fashion). */
export function HubNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800 px-6 py-12 text-white shadow-xl sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-100">The hub list</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">First look at every drop</h2>
          <p className="mt-3 text-orange-50">
            Join for restock alerts and style edits. Use <strong className="text-white">OLUWASEGUN10</strong> for 10%
            off your first bag.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              toast.success("You're on the list — use OLUWASEGUN10 at checkout.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-12 border-0 bg-white/95 text-gray-900 placeholder:text-gray-500"
            />
            <Button type="submit" className="h-12 shrink-0 bg-gray-950 px-8 font-bold hover:bg-black">
              Get access
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
