"use client";

import { formatDate, getPriorityClasses, cn } from "@/lib/utils";
import { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
};

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-[28px] border bg-white p-5 shadow-card transition sm:flex-row sm:items-start sm:justify-between",
        task.completed ? "border-slate-200/80 bg-slate-50/70" : "border-slate-200"
      )}
    >
      <div className="flex items-start gap-4">
        <input
          aria-label={`Mark ${task.title} complete`}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <div className="space-y-3">
          <div>
            <h3 className={cn("text-lg font-semibold tracking-tight text-slate-900", task.completed && "text-slate-500 line-through")}>
              {task.title}
            </h3>
            <p className={cn("mt-1 text-sm leading-6 text-slate-600", task.completed && "text-slate-400")}>{task.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Due {formatDate(task.dueDate)}</span>
            <span className={cn("rounded-full px-3 py-1 capitalize ring-1", getPriorityClasses(task.priority))}>{task.priority}</span>
            {task.completed ? <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-600">Completed</span> : null}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-start">
        <button
          type="button"
          aria-label={`Edit ${task.title}`}
          onClick={() => onEdit(task)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          Edit
        </button>
        <button
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task.id)}
          className="rounded-xl border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
