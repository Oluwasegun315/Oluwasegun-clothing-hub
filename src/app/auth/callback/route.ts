import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

function safeNextPath(raw: string | null) {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/account";
  return raw;
}

function resolveSiteOrigin(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const isLocal = process.env.NODE_ENV === "development";

  if (isLocal) return request.nextUrl.origin;

  // Prefer the host the browser actually used (Vercel preview / custom domain).
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;

  // Only trust SITE_URL when it is not localhost (common misconfig on Vercel).
  if (siteUrl && !/localhost|127\.0\.0\.1/i.test(siteUrl)) return siteUrl;

  return request.nextUrl.origin;
}

/**
 * OAuth (Google) exchanges `code` for a session and sets auth cookies
 * on the redirect response (required for SSR session to stick).
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const next = safeNextPath(url.searchParams.get("next"));
  const origin = resolveSiteOrigin(request);
  const loginError = new URL("/login?error=oauth", origin);

  if (!code || !hasSupabaseEnv()) {
    return NextResponse.redirect(loginError);
  }

  const redirectUrl = new URL(next, origin);
  const response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("OAuth exchange failed:", error.message);
    return NextResponse.redirect(loginError);
  }

  return response;
}
