# Push changes to GitHub (and Vercel)

Your live site deploys from **GitHub**. If fixes work on `localhost:3000` but not on Vercel, the code was probably not pushed yet.

## Automatic (after setup below)

Every time you **commit**, Husky runs `git push` so GitHub stays up to date.

1. Run once in the project folder:
   ```powershell
   npm install
   ```
2. When you save work, commit as usual:
   ```powershell
   git add -A
   git commit -m "Describe your change"
   ```
   The push to GitHub happens automatically after the commit.

## Manual one-command sync

```powershell
npm run sync:github
```

Optional message:

```powershell
powershell -File scripts/sync-github.ps1 -Message "Fix account dashboard"
```

## Check Vercel

1. [vercel.com](https://vercel.com) → your project → **Deployments**
2. Latest deployment should match the latest commit on GitHub `main`
3. Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`

## Account dashboard on the live site

After deploy: sign in → click **My account** → `https://your-site.vercel.app/account`
