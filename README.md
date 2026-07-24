# Sai's Learning Log

A Next.js + Supabase blog for AI, DSA, system design, and personal learning notes.

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create your admin user in Supabase Auth.
4. Add your user ID to `public.blog_admins`.
5. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Install dependencies and run:

```bash
npm install
npm run dev
```

## Posting

Open `/admin`, log in with your Supabase email/password, write a post, and publish it. Public readers can browse posts at `/posts`.

Only users listed in `public.blog_admins` can publish. A normal authenticated account cannot create, update, or delete posts.
