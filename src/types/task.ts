export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskFilter = "all" | "pending" | "completed" | "today";

export type NewTaskInput = Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">;
