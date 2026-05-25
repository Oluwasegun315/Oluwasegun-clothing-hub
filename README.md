# Oluwasegun Clothing Hub

Men's, kids', and streetwear marketplace built with Next.js 14 and Supabase.

## Local development

```bash
npm install
cp .env.local.example .env.local
# Fill Supabase URL, anon key, and site URL in .env.local
npm run sync:assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel recommended)

1. Push this repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com) → **Add New Project** → select your repo.
3. Add **Environment Variables** (same as `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → your live URL, e.g. `https://your-app.vercel.app`
4. Deploy.
5. In **Supabase** → Authentication → URL Configuration:
   - **Site URL** = your Vercel URL
   - **Redirect URLs** = `https://your-app.vercel.app/auth/callback`

## Auth email templates

Copy HTML from `supabase/email-templates/` into Supabase Dashboard → Authentication → Email Templates.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run sync:assets` | Sync product images to `public/assett` |
