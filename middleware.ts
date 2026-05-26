import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/**
 * Only run auth refresh on routes that need Supabase session.
 * Skipping `/` and static shop pages fixes RSC header text leaking into HTML on Vercel.
 */
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/cart",
    "/profile",
    "/auth/:path*",
    "/product/:path*",
    "/api/:path*",
  ],
};
