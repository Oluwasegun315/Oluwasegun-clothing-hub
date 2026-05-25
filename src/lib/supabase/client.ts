import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client for Client Components (cart, auth forms, filters).
 * Uses the public anon key — never put service_role keys here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
