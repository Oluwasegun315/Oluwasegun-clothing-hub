"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getPublicSiteUrl } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function SignupForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = `${getPublicSiteUrl()}/auth/callback?next=${encodeURIComponent("/profile")}`;

  const onOAuth = async (provider: "google" | "discord") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) toast.error(error.message);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: redirectTo,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Account ready — welcome in.");
      router.push("/profile");
      router.refresh();
    } else {
      toast.message("Check your inbox", {
        description: "Confirm your email to activate the account (if confirmations are enabled).",
      });
    }
  };

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.1),_transparent_55%)]" />
      <div className="rounded-3xl border border-border bg-background/50 p-8 shadow-[0_40px_120px_-60px_rgba(234,88,12,0.25)] backdrop-blur-xl">
        <p className="font-display text-xs tracking-[0.4em] text-primary">JOIN</p>
        <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Create your member profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-primary/25 bg-muted"
            onClick={() => onOAuth("google")}
          >
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-primary/25 bg-muted"
            onClick={() => onOAuth("discord")}
          >
            Continue with Discord
          </Button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <Separator className="flex-1 bg-border" />
          <span className="text-xs tracking-[0.3em] text-muted-foreground">OR EMAIL</span>
          <Separator className="flex-1 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 border-border bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-border bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border-border bg-muted"
            />
          </div>
          <Button type="submit" className="mt-2 w-full rounded-full glow-button" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <SignupForm />
    </Suspense>
  );
}
