# Keldo

Keldo is a Next.js + TypeScript + Tailwind MVP for task planning, backed by Supabase Auth and a `tasks` table with row-level security.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. In Supabase SQL Editor, run:

- [supabase/schema.sql](C:\Users\Kelvin PC\todoappcode\supabase\schema.sql)

4. Start the app:

```bash
npm run dev
```

## Deploy To Vercel

1. Push this project to GitHub.
2. In Vercel, create a new project and import the repo.
3. Keep the framework preset as `Next.js`.
4. Add these environment variables in Vercel Project Settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Deploy.

## Supabase Setup

Run the SQL in [supabase/schema.sql](C:\Users\Kelvin PC\todoappcode\supabase\schema.sql) to create:

- `public.tasks`
- the `updated_at` trigger
- row-level security policies for authenticated users

## Production Checklist

- Confirm users can sign up and sign in
- Confirm users can add, edit, complete, and delete tasks
- Confirm `/today` and `/completed` show the expected filtered data
- Confirm one user cannot see another user’s tasks
- Add the same environment variables to Vercel before going live
