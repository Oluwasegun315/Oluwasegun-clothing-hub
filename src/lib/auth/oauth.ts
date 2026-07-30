import { createClient } from "@/lib/supabase/client";

/** Start Google sign-in — must navigate to the URL Supabase returns. */
export async function startOAuthSignIn(
  provider: "google",
  redirectTo: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    if (!data?.url) {
      return {
        ok: false,
        message:
          "Google sign-in is not enabled in Supabase. Enable Google under Authentication → Providers.",
      };
    }

    window.location.assign(data.url);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Could not start Google sign-in. Check Supabase env vars on Vercel.",
    };
  }
}
