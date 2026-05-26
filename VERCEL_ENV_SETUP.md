# Vercel environment variables (required for sign-in & cart)

Products work without these, but **sign-in, sign-up, and cart** need Supabase env vars on Vercel.

## Steps

1. Open [Vercel Dashboard](https://vercel.com) → your project **oluwasegun-clothing-hub**
2. Go to **Settings** → **Environment Variables**
3. Add these three variables (enable **Production**, **Preview**, and **Development** for each):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://axwjdywwizujdnmkzgdl.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Copy from [Supabase](https://supabase.com/dashboard) → Project **axwjdywwizujdnmkzgdl** → **Project Settings** → **API** → **anon public** key (starts with `eyJ…`) **or** **publishable** key (`sb_publishable_…`) |
| `NEXT_PUBLIC_SITE_URL` | `https://oluwasegun-clothing-hub-h1n7.vercel.app` |

4. Click **Save**
5. Go to **Deployments** → open the latest deployment → **⋯** → **Redeploy** (required so the new vars load)

## Supabase redirect URLs (for Google / email links)

Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL:** `https://oluwasegun-clothing-hub-h1n7.vercel.app`
- **Redirect URLs:** add  
  `https://oluwasegun-clothing-hub-h1n7.vercel.app/auth/callback`

## Local development

Copy `.env.local.example` to `.env.local` and fill the same values (use `http://localhost:3000` for `NEXT_PUBLIC_SITE_URL`).
