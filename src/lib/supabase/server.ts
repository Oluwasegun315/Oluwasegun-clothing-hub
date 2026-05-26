import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

/**
 * Server Supabase client for Server Components, Route Handlers, and Server Actions.
 * Relies on middleware keeping the auth cookie fresh.
 */
export function createClient() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const cookieStore = cookies();

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — session refresh happens in middleware.
          }
        },
      },
    }
  );
}
