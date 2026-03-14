import { Task, TaskFilter, TaskPriority } from "@/types/task";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isToday(date: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const value = new Date(`${date}T00:00:00`);
  return value.getTime() === today.getTime();
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function getPriorityClasses(priority: TaskPriority) {
  if (priority === "high") {
    return "bg-red-50 text-red-700 ring-red-200";
  }
  if (priority === "medium") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }
  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export function filterTasks(tasks: Task[], filter: TaskFilter) {
  if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  }
  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  if (filter === "today") {
    return tasks.filter((task) => isToday(task.dueDate));
  }
  return tasks;
}

export function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (isToday(a.dueDate) && !isToday(b.dueDate)) {
      return -1;
    }

    if (!isToday(a.dueDate) && isToday(b.dueDate)) {
      return 1;
    }

    return a.dueDate.localeCompare(b.dueDate) || b.createdAt.localeCompare(a.createdAt);
  });
}
