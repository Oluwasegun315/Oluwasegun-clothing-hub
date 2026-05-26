import { createClient } from "@/lib/supabase/client";

/** Start Google/Discord sign-in — must navigate to the URL Supabase returns. */
export async function startOAuthSignIn(
  provider: "google" | "discord",
  redirectTo: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data?.url) {
    return {
      ok: false,
      message:
        provider === "google"
          ? "Google sign-in is not enabled in Supabase. Enable Google under Authentication → Providers."
          : "Discord sign-in is not enabled in Supabase.",
    };
  }

  window.location.assign(data.url);
  return { ok: true };
}
