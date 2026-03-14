"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { TaskFilters } from "@/components/task-filters";
import { TaskList } from "@/components/task-list";
import { useTasks } from "@/context/task-context";
import { filterTasks } from "@/lib/utils";
import { TaskFilter } from "@/types/task";

type TaskBoardProps = {
  title: string;
  description: string;
  defaultFilter: TaskFilter;
  emptyTitle: string;
  emptyDescription: string;
  eyebrow?: string;
  showFilters?: boolean;
  children?: ReactNode;
};

export function TaskBoard({
  title,
  description,
  defaultFilter,
  emptyTitle,
  emptyDescription,
  eyebrow,
  showFilters = true,
  children
}: TaskBoardProps) {
  const { tasks, toggleTaskCompletion, deleteTask, openAddTask, openEditTask, isLoading, errorMessage, session } = useTasks();
  const [activeFilter, setActiveFilter] = useState<TaskFilter>(defaultFilter);

  const filteredTasks = filterTasks(tasks, activeFilter);
  const isAuthenticated = Boolean(session);

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      {children}
      {!isAuthenticated ? (
        <section className="rounded-[32px] border border-brand-100 bg-white p-6 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Account Required</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Sign in to create, edit, complete, and delete tasks</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                The dashboard, Today view, and Completed view are all connected to your private Supabase-backed task data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Task Overview</h2>
            <p className="mt-1 text-sm text-slate-500">
              {isAuthenticated
                ? "Review, complete, edit, and clean up tasks without leaving the page."
                : "Sign in first to unlock task creation, editing, completion, and deletion."}
            </p>
          </div>
          {showFilters ? <TaskFilters activeFilter={activeFilter} onChange={setActiveFilter} /> : null}
        </div>
        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
        ) : null}
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-28 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-card" />
            <div className="h-28 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-card" />
            <div className="h-28 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-card" />
          </div>
        ) : (
        <TaskList
          tasks={filteredTasks}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
          onEdit={openEditTask}
          emptyAction={
            isAuthenticated ? (
              <button
                type="button"
                onClick={openAddTask}
                className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Add Your First Task
              </button>
            ) : (
              <Link
                href="/auth"
                className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Sign In To Start
              </Link>
            )
          }
        />
        )}
      </section>
    </div>
  );
}
