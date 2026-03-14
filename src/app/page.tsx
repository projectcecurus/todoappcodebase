"use client";

import { DashboardStats } from "@/components/dashboard-stats";
import { TaskBoard } from "@/components/task-board";
import { useTasks } from "@/context/task-context";

export default function DashboardPage() {
  const { tasks } = useTasks();

  return (
    <TaskBoard
      eyebrow="Dashboard"
      title="Stay on top of your day"
      description="Keldo keeps your most important tasks, today's priorities, and completed work in one focused dashboard."
      defaultFilter="all"
      emptyTitle="Nothing on the board yet"
      emptyDescription="Add your first task to start shaping today and the rest of the week."
    >
      <DashboardStats tasks={tasks} />
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Today's Schedule</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Your focus window at a glance</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Start with urgent deliverables, keep medium-priority work moving, and clear a few quick wins when you need momentum.
          </p>
        </div>
      </section>
    </TaskBoard>
  );
}
