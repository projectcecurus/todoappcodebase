import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Finalize project proposal",
    description: "Review the draft, tighten the scope, and send the final version to the client.",
    dueDate: "2026-03-14",
    priority: "high",
    completed: false,
    createdAt: "2026-03-12T09:00:00.000Z",
    updatedAt: "2026-03-12T09:00:00.000Z"
  },
  {
    id: "task-2",
    title: "Plan next week's content calendar",
    description: "Outline the themes, deadlines, and ownership for five scheduled posts.",
    dueDate: "2026-03-14",
    priority: "medium",
    completed: false,
    createdAt: "2026-03-12T12:30:00.000Z",
    updatedAt: "2026-03-12T12:30:00.000Z"
  },
  {
    id: "task-3",
    title: "Book dentist appointment",
    description: "Call the clinic and confirm an afternoon slot before the end of the month.",
    dueDate: "2026-03-16",
    priority: "low",
    completed: false,
    createdAt: "2026-03-13T08:20:00.000Z",
    updatedAt: "2026-03-13T08:20:00.000Z"
  },
  {
    id: "task-4",
    title: "Send sprint recap to the team",
    description: "Share progress, blockers, and next priorities in the team channel.",
    dueDate: "2026-03-13",
    priority: "medium",
    completed: true,
    createdAt: "2026-03-10T17:45:00.000Z",
    updatedAt: "2026-03-10T17:45:00.000Z"
  },
  {
    id: "task-5",
    title: "Update onboarding checklist",
    description: "Add the new documentation links and clarify the setup order for new hires.",
    dueDate: "2026-03-15",
    priority: "high",
    completed: false,
    createdAt: "2026-03-13T11:10:00.000Z",
    updatedAt: "2026-03-13T11:10:00.000Z"
  },
  {
    id: "task-6",
    title: "Archive completed invoices",
    description: "Move signed invoices into the shared finance folder and tag them by month.",
    dueDate: "2026-03-11",
    priority: "low",
    completed: true,
    createdAt: "2026-03-09T14:10:00.000Z",
    updatedAt: "2026-03-09T14:10:00.000Z"
  }
];
