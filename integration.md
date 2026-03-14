You are an expert full-stack engineer. Continue building the Keldo MVP by integrating Supabase into the existing Next.js + TypeScript + Tailwind CSS app.

Existing app context:
Keldo is a simple todo and schedule planning web app with a modern dashboard UI. The frontend already includes:
- dashboard page
- today page
- completed page
- add task modal
- task list UI
- filters
- clean reusable components

Now implement the backend/data/auth layer using Supabase.

Tech stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database + auth)
- Deployable to Vercel

Product goal:
Keldo should allow users to:
- sign up
- sign in
- sign out
- create tasks
- edit tasks
- delete tasks
- mark tasks completed
- filter tasks by All / Pending / Completed / Today
- persist tasks across refresh and sessions
- only see their own tasks

MVP scope:
Keep it simple, realistic, and production-minded.
Do not add unnecessary complexity.

Data requirements:
Create a Supabase-backed tasks table with fields such as:
- id
- user_id
- title
- description
- due_date
- priority
- completed
- created_at
- updated_at

Use a realistic schema with proper defaults and types.
Enable Row Level Security so users can only access their own tasks.

Please provide:
1. SQL for creating the tasks table
2. SQL for enabling RLS
3. Policies so authenticated users can:
   - insert their own tasks
   - read only their own tasks
   - update only their own tasks
   - delete only their own tasks

Auth requirements:
Implement simple authentication using Supabase Auth:
- email + password sign up
- email + password sign in
- sign out
- protect task-related routes so the app is usable only for authenticated users, or handle auth gating clearly in the UI

Frontend/backend implementation requirements:
1. Connect the app to Supabase using environment variables
2. Create a reusable Supabase client setup
3. Replace mock task data with real Supabase data
4. Wire the Add Task modal to insert tasks into Supabase
5. Allow editing a task
6. Allow deleting a task
7. Allow toggling completion status
8. Fetch tasks for the logged-in user
9. Build filtering logic for:
   - All
   - Pending
   - Completed
   - Today
10. Ensure dashboard stat cards are driven by real task data
11. Ensure today page and completed page use real filtered data

Suggested architecture:
- lib/supabase client helpers
- auth-related utilities
- task query helpers or server actions
- clear separation between UI and data logic where reasonable
- keep the code understandable for an MVP

Preferred implementation style:
- Use modern Next.js App Router patterns
- Use TypeScript types for task and auth-related data
- Keep forms simple and functional
- Use either server actions or a clean client-driven approach, but choose one realistic path and implement it consistently
- Do not overengineer with too many abstractions

UI/UX expectations:
- Keep the same design language already established:
  - clean dashboard
  - white cards
  - blue actions
  - minimal layout
- Add auth pages or auth section with a polished but simple UI
- Show friendly empty states
- Show basic loading/error states
- Keep everything MVP-appropriate

Functional acceptance criteria:
- A new user can sign up
- A returning user can sign in
- Authenticated users can add a task
- Users can edit a task
- Users can delete a task
- Users can mark tasks complete/incomplete
- Dashboard reflects correct counts
- Today page only shows today’s tasks
- Completed page only shows completed tasks
- Users only see their own tasks
- Data persists after refresh and new login

Environment configuration:
Expect these variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Please include:
1. All required code changes
2. Any new files
3. Any updated files
4. SQL setup
5. Instructions for how to configure Supabase
6. Instructions for local development
7. Notes for deploying on Vercel

Extra details:
- If needed, create an auth page like /auth
- Redirect users appropriately after login
- If a user is not logged in, show a clear login/signup experience
- Keep the app simple and polished, not enterprise-heavy

Important:
- Build the code so it is realistic for an actual MVP
- Do not add features outside the PRD unnecessarily
- Do not build recurring tasks, notifications, calendar sync, or advanced analytics
- Focus only on what is needed for the MVP

Do not overengineer.