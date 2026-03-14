import { SupabaseClient } from "@supabase/supabase-js";

import { NewTaskInput, Task } from "@/types/task";

type TaskRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  due_date: string;
  priority: Task["priority"];
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export function mapTaskRow(task: TaskRow): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    dueDate: task.due_date,
    priority: task.priority,
    completed: task.completed,
    createdAt: task.created_at,
    updatedAt: task.updated_at
  };
}

export async function fetchTasks(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((task) => mapTaskRow(task as TaskRow));
}

export async function createTask(supabase: SupabaseClient, input: NewTaskInput) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description || null,
      due_date: input.dueDate,
      priority: input.priority,
      completed: false
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTaskRow(data as TaskRow);
}

export async function updateTask(
  supabase: SupabaseClient,
  taskId: string,
  input: Partial<NewTaskInput> & { completed?: boolean }
) {
  const payload: Record<string, string | boolean | null> = {};

  if (input.title !== undefined) payload.title = input.title;
  if (input.description !== undefined) payload.description = input.description || null;
  if (input.dueDate !== undefined) payload.due_date = input.dueDate;
  if (input.priority !== undefined) payload.priority = input.priority;
  if (input.completed !== undefined) payload.completed = input.completed;

  const { data, error } = await supabase.from("tasks").update(payload).eq("id", taskId).select().single();

  if (error) {
    throw error;
  }

  return mapTaskRow(data as TaskRow);
}

export async function deleteTask(supabase: SupabaseClient, taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw error;
  }
}
