import { redirect } from "next/navigation";

import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    "Member";
  const email = profile?.email ?? user.email ?? "";
  const avatar =
    profile?.avatar_url ||
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined) ||
    null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <p className="font-display text-xs tracking-[0.4em] text-primary">PROFILE</p>
      <h1 className="mt-3 font-display text-4xl text-foreground">Your atelier dashboard</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Session-backed profile row from Supabase (`profiles`) — extend with orders, wishlists, or loyalty tiers.
      </p>

      <Card className="mt-10 border-border bg-muted">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-16 border border-border" size="lg">
            <AvatarImage src={avatar ?? undefined} alt="" />
            <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl text-foreground">{displayName}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
        </CardHeader>
        <Separator className="bg-border" />
        <CardContent className="space-y-4 pt-6 text-sm text-muted-foreground">
          <p>
            User id: <span className="font-mono text-xs text-foreground/80">{user.id}</span>
          </p>
          <p>
            You are signed in with Supabase Auth. Logout is available from the navbar account menu.
          </p>
          <Link href="/shop" className={cn(buttonVariants(), "inline-flex rounded-full glow-button")}>
            Continue shopping
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
