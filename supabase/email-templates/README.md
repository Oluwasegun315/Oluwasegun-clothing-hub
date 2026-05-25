# Supabase email templates — Oluwasegun Clothing Hub

Use these in the **Supabase Dashboard** so auth emails match your site (white + orange, no black).

## 1. Open the right place

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. **Authentication** → **Email Templates** (left sidebar under Auth).
3. For each template type below, paste the **Subject** and **Body** from the matching `.html` file in this folder.

## 2. URL configuration (required)

**Authentication** → **URL Configuration**:

| Field | Value |
|--------|--------|
| **Site URL** | `http://localhost:3000` (dev) or your live domain |
| **Redirect URLs** | Add both: `http://localhost:3000/auth/callback` and `https://YOUR-DOMAIN.com/auth/callback` |

Must match `NEXT_PUBLIC_SITE_URL` in `.env.local`.

## 3. Which template to edit

| Supabase template | File in this folder | When it sends |
|-------------------|---------------------|---------------|
| Confirm signup | `confirm-signup.html` | Email + password signup |
| Magic Link | `magic-link.html` | Magic link sign-in (if enabled) |
| Reset Password | `reset-password.html` | Forgot password |
| Change Email Address | `change-email.html` | User changes email |
| Invite user | `invite-user.html` | Admin invites a user |

## 4. Subject lines (suggested)

| Template | Subject |
|----------|---------|
| Confirm signup | `Confirm your Oluwasegun Clothing Hub account` |
| Magic Link | `Your sign-in link — Oluwasegun Clothing Hub` |
| Reset Password | `Reset your password — Oluwasegun Clothing Hub` |
| Change Email | `Confirm your new email — Oluwasegun Clothing Hub` |
| Invite user | `You're invited to Oluwasegun Clothing Hub` |

## 5. Variables (do not remove)

Supabase replaces these automatically:

- `{{ .ConfirmationURL }}` — main button link (confirm, reset, magic link, etc.)
- `{{ .SiteURL }}` — your configured Site URL
- `{{ .Email }}` — recipient email
- `{{ .Token }}` — OTP code (only if you use OTP instead of link)

## 6. Optional: custom sender (SMTP)

Default mail comes from Supabase (`noreply@mail.app.supabase.io`). For your own domain:

**Project Settings** → **Authentication** → **SMTP Settings** → enable custom SMTP (Resend, SendGrid, Gmail app password, etc.).

## 7. Test

1. Sign up on `/signup` with a real inbox.
2. Open the email → click **Confirm** → you should land on `/auth/callback` then `/profile`.
3. Use **Forgot password** on `/login` to test `reset-password.html`.

## 8. Google / Discord

OAuth emails are sent by Google/Discord, not these templates. Only **email/password** flows use the templates above.
