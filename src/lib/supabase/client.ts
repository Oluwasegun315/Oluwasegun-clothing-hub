import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env";

/**
 * Browser Supabase client for Client Components (cart, auth forms, filters).
 * Call only from event handlers or useEffect — not during static build render.
 */
export function createClient() {
  if (!hasSupabaseEnv()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them in Vercel → Settings → Environment Variables."
    );
  }

  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
