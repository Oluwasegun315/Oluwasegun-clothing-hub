import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

/**
 * OAuth (Google / Discord) exchanges `code` for a session and sets auth cookies.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let next = url.searchParams.get("next") ?? "/account";
  if (!next.startsWith("/")) next = "/account";

  if (!code || !hasSupabaseEnv()) {
    return NextResponse.redirect(new URL("/login?error=oauth", url.origin));
  }

  const cookieStore = cookies();
  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=oauth", url.origin));
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocal = process.env.NODE_ENV === "development";

  if (isLocal) {
    return NextResponse.redirect(new URL(next, url.origin));
  }
  if (siteUrl) {
    return NextResponse.redirect(new URL(next, siteUrl));
  }
  if (forwardedHost) {
    return NextResponse.redirect(new URL(next, `https://${forwardedHost}`));
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
