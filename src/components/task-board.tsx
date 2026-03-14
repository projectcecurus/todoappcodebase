"use client";

import { ReactNode, useState } from "react";

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
  const { tasks, toggleTaskCompletion, deleteTask, openEditTask, isLoading, errorMessage } = useTasks();
  const [activeFilter, setActiveFilter] = useState<TaskFilter>(defaultFilter);

  const filteredTasks = filterTasks(tasks, activeFilter);

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      {children}
      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Task Overview</h2>
            <p className="mt-1 text-sm text-slate-500">Review, complete, and clean up tasks without leaving the page.</p>
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
        />
        )}
      </section>
    </div>
  );
}
