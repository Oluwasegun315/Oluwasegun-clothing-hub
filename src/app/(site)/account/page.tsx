import { redirect } from "next/navigation";

import { AccountDashboard } from "@/components/account/account-dashboard";
import { getCartLines } from "@/lib/data/cart";
import { createClient, getSessionUser } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!hasSupabaseEnv()) redirect("/login?next=/account");

  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");

  const { lines } = await getCartLines();

  let profile: { full_name?: string | null; email?: string | null; avatar_url?: string | null } | null =
    null;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    profile = data;
  } catch {
    /* optional */
  }

  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    "Shopper";
  const email = profile?.email ?? user.email ?? "";
  const avatar =
    profile?.avatar_url ||
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined) ||
    null;

  const created = user.created_at ? new Date(user.created_at) : new Date();
  const memberSince = created.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <AccountDashboard
      displayName={displayName}
      email={email}
      avatar={avatar}
      memberSince={memberSince}
      lines={lines}
    />
  );
}
