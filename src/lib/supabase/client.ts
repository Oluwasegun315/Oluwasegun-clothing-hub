import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client for Client Components (cart, auth forms, filters).
 * Call only from event handlers or useEffect — not during static build render.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them in Vercel → Settings → Environment Variables."
    );
  }

  return createBrowserClient(url, key);
}
