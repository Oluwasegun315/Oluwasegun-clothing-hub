"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {
  /** Compact icon-only on desktop header */
  variant?: "header" | "mobile";
  onNavigate?: () => void;
};

/** Shows Sign in / Create account when logged out; profile menu when logged in. */
export function AccountNav({ variant = "header", onNavigate }: Props) {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      setReady(true);
      return;
    }

    let cancelled = false;
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch {
      setReady(true);
      return;
    }

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setSignedIn(false);
        setEmail(null);
        setName(null);
        setAvatar(null);
        setReady(true);
        return;
      }
      setSignedIn(true);
      setEmail(user.email ?? null);
      setName(
        (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          null
      );
      setAvatar(
        (user.user_metadata?.avatar_url as string | undefined) ??
          (user.user_metadata?.picture as string | undefined) ??
          null
      );
      setReady(true);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncUser();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  const initials = useMemo(() => {
    const base = (name || email || "OH").trim() || "OH";
    const parts = base.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return base.slice(0, 2).toUpperCase();
  }, [name, email]);

  const onLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Signed out");
      onNavigate?.();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out");
    }
  };

  if (!ready) {
    return (
      <span
        className={cn(
          variant === "header" && "hidden h-9 w-20 animate-pulse rounded-md bg-muted sm:inline-block"
        )}
        aria-hidden
      />
    );
  }

  if (signedIn) {
    if (variant === "mobile") {
      return (
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your account</p>
          <p className="text-sm font-medium text-foreground">{name || "Member"}</p>
          {email ? <p className="text-xs text-muted-foreground">{email}</p> : null}
          <Link
            href="/account"
            onClick={onNavigate}
            className={cn(buttonVariants(), "justify-center rounded-md glow-button")}
          >
            <LayoutDashboard className="mr-2 size-4" />
            My account dashboard
          </Link>
          <Button type="button" variant="outline" className="rounded-md" onClick={onLogout}>
            <LogOut className="mr-2 size-4" />
            Sign out
          </Button>
        </div>
      );
    }

    return (
      <Link
        href="/account"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "hidden gap-2 rounded-md pl-1.5 pr-3 sm:inline-flex"
        )}
        aria-label="My account dashboard"
      >
        <Avatar className="size-7 border border-border">
          <AvatarImage src={avatar ?? undefined} alt="" />
          <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
        </Avatar>
        <span className="max-w-[140px] truncate">My account</span>
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Link
          href="/login"
          onClick={onNavigate}
          className={cn(buttonVariants(), "justify-center rounded-md glow-button")}
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className={cn(buttonVariants({ variant: "outline" }), "justify-center rounded-md")}
        >
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link
        href="/signup"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-md text-muted-foreground")}
      >
        Join
      </Link>
      <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-md")}>
        <User className="mr-1 size-4" />
        Sign in
      </Link>
    </div>
  );
}
