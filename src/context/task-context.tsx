"use client";

import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { createTask, deleteTask as removeTask, fetchTasks, updateTask } from "@/lib/supabase/tasks";
import { sortTasks } from "@/lib/utils";
import { NewTaskInput, Task } from "@/types/task";

type TaskContextValue = {
  tasks: Task[];
  session: Session | null;
  isLoading: boolean;
  errorMessage: string;
  isAddTaskOpen: boolean;
  editingTask: Task | null;
  openAddTask: () => void;
  closeAddTask: () => void;
  openEditTask: (task: Task) => void;
  addTask: (input: NewTaskInput) => Promise<void>;
  saveTask: (taskId: string, input: NewTaskInput) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState<SupabaseClient | null>(() => createClient());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  async function loadTasks() {
    setIsLoading(true);
    setErrorMessage("");

    if (!supabase) {
      setErrorMessage("Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.");
      setIsLoading(false);
      return;
    }

    try {
      const nextTasks = await fetchTasks(supabase);
      setTasks(sortTasks(nextTasks));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load tasks right now.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      if (!supabase) {
        setErrorMessage("Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.");
        setIsLoading(false);
        return;
      }

      const {
        data: { session: nextSession }
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setSession(nextSession);

      if (nextSession) {
        await loadTasks();
      } else {
        setTasks([]);
        setIsLoading(false);
      }
    }

    void initialize();

    const subscription =
      supabase?.auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession);
        if (nextSession) {
          void loadTasks();
        } else {
          setTasks([]);
          setIsLoading(false);
        }
      }).data.subscription ?? null;

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo(
    () => ({
      tasks,
      session,
      isLoading,
      errorMessage,
      isAddTaskOpen,
      editingTask,
      openAddTask: () => {
        setEditingTask(null);
        setIsAddTaskOpen(true);
      },
      closeAddTask: () => {
        setEditingTask(null);
        setIsAddTaskOpen(false);
      },
      openEditTask: (task: Task) => {
        setEditingTask(task);
        setIsAddTaskOpen(true);
      },
      addTask: async (input: NewTaskInput) => {
        setErrorMessage("");
        if (!supabase) {
          setErrorMessage("Supabase is not configured yet.");
          return;
        }
        try {
          const nextTask = await createTask(supabase, input);
          setTasks((current) => sortTasks([nextTask, ...current]));
          setEditingTask(null);
          setIsAddTaskOpen(false);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to save the task.";
          setErrorMessage(message);
        }
      },
      saveTask: async (taskId: string, input: NewTaskInput) => {
        setErrorMessage("");
        if (!supabase) {
          setErrorMessage("Supabase is not configured yet.");
          return;
        }
        try {
          const savedTask = await updateTask(supabase, taskId, input);
          setTasks((current) => sortTasks(current.map((task) => (task.id === taskId ? savedTask : task))));
          setEditingTask(null);
          setIsAddTaskOpen(false);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to update the task.";
          setErrorMessage(message);
        }
      },
      toggleTaskCompletion: async (taskId: string) => {
        setErrorMessage("");
        if (!supabase) {
          setErrorMessage("Supabase is not configured yet.");
          return;
        }
        const currentTask = tasks.find((task) => task.id === taskId);
        if (!currentTask) {
          return;
        }

        try {
          const savedTask = await updateTask(supabase, taskId, { completed: !currentTask.completed });
          setTasks((current) => sortTasks(current.map((task) => (task.id === taskId ? savedTask : task))));
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to update the task.";
          setErrorMessage(message);
        }
      },
      deleteTask: async (taskId: string) => {
        setErrorMessage("");
        if (!supabase) {
          setErrorMessage("Supabase is not configured yet.");
          return;
        }
        try {
          await removeTask(supabase, taskId);
          setTasks((current) => current.filter((task) => task.id !== taskId));
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to delete the task.";
          setErrorMessage(message);
        }
      },
      signOut: async () => {
        if (!supabase) {
          setErrorMessage("Supabase is not configured yet.");
          return;
        }
        await supabase.auth.signOut();
      }
    }),
    [editingTask, errorMessage, isAddTaskOpen, isLoading, session, tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}
