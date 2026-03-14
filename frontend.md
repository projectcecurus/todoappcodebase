You are an expert full-stack engineer. Build the frontend foundation for a simple todo and schedule planning web app called “Keldo” using Next.js, TypeScript, App Router, and Tailwind CSS.

Project stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase will be added later, so for now create the frontend in a way that is easy to connect to a backend
- Deployable to Vercel

Goal:
Create a clean, modern MVP frontend for Keldo, a lightweight productivity app that helps users:
- add tasks
- plan their schedules
- view today’s tasks
- mark tasks complete
- filter tasks by status

Design direction:
Use a visual style similar to a clean modern dashboard UI:
- white or very light background
- white cards with subtle borders or soft shadows
- blue as the primary action color
- rounded corners
- clear typography
- spacious layout
- minimal and distraction-free
- dashboard style similar to a lightweight productivity app
- include a top navigation/header
- include task summary cards
- include a clean task list
- include an add-task modal or panel
- use priority indicators for Low / Medium / High
- completed tasks should look visually distinct
- overall feel: modern, simple, professional, easy to use

Brand:
- App name: Keldo
- Use “Keldo” in the header/logo area
- Keep branding simple and professional

Build requirements:
1. Set up the app structure using Next.js App Router.
2. Use TypeScript throughout.
3. Use Tailwind CSS for styling.
4. Create reusable components and keep the code clean and production-friendly.
5. Use mock data for now so the UI can render before backend integration.
6. Organize code clearly for easy future expansion.

Pages / views to build:
1. Main dashboard page
2. Today page
3. Completed tasks page

Core UI sections to include:
- Top navbar/header with app name “Keldo”
- Primary action button: “Add Task”
- Summary cards:
  - Pending Tasks
  - Today’s Tasks
  - Completed Tasks
- Main task list area
- Filter tabs or segmented controls:
  - All
  - Pending
  - Completed
  - Today
- Add Task modal or slide-over form
- Empty states
- Loading/skeleton-ready structure even if fake for now

Data model to assume for the frontend:
Each task should support:
- id
- title
- description
- dueDate
- priority (low, medium, high)
- completed
- createdAt

Frontend behavior for now:
- Use local React state or mock data to render the interface
- Clicking “Add Task” should open the modal
- The modal should include:
  - Task Title
  - Description
  - Due Date
  - Priority dropdown
  - Save button
  - Cancel button
- Checkbox UI for completion should exist
- Edit and delete icons/buttons should exist in the UI even if they are not fully wired yet
- Show realistic sample tasks in the lists

Create these components:
- Header / Navbar
- DashboardStats
- TaskFilters
- TaskList
- TaskItem
- AddTaskModal
- EmptyState
- SectionHeading or similar reusable utility component

Suggested file structure:
- src/app/page.tsx
- src/app/today/page.tsx
- src/app/completed/page.tsx
- src/components/...
- src/types/task.ts
- src/data/mockTasks.ts
- src/lib/utils.ts if needed

Component expectations:
Header/Navbar:
- app name Keldo on the left
- nav links like Dashboard, Today, Completed
- Add Task button on the right

Dashboard page:
- welcome or simple heading
- stats cards for pending, today, completed
- section called Today’s Schedule or Task Overview
- list of tasks

Today page:
- show only tasks due today
- heading and clean list

Completed page:
- show completed tasks only
- completed styling

Task item design:
- checkbox
- title
- small metadata row for due date and priority
- edit button
- delete button
- visually clean horizontal card/list item
- completed tasks should show subdued styling or line-through

Priority styling:
- Low = subtle green indicator
- Medium = amber/yellow indicator
- High = red indicator
Do this tastefully and minimally

Implementation quality requirements:
- Write clean, modular, readable code
- Use Tailwind utility classes consistently
- Use accessible buttons, labels, modal semantics where possible
- Avoid overengineering
- Avoid external UI libraries unless truly necessary
- Keep MVP-simple and production-minded

Deliverables:
1. Full code for all relevant files
2. Clear file-by-file output
3. Any necessary installation commands
4. Any notes needed to run locally

Important:
- Do not build Supabase yet
- Do not build authentication yet
- Focus on frontend structure, pages, components, layout, and styling
- Ensure the app looks polished enough for an MVP demo
- Make the frontend easy to connect to Supabase in the next step

Do not overengineer.