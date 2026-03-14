"use client";

import { FormEvent, useEffect, useState } from "react";

import { useTasks } from "@/context/task-context";
import { TaskPriority } from "@/types/task";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium" as TaskPriority
};

export function AddTaskModal() {
  const { addTask, closeAddTask, editingTask, isAddTaskOpen, saveTask } = useTasks();
  const [formState, setFormState] = useState(initialState);

  const isEditing = Boolean(editingTask);

  useEffect(() => {
    if (editingTask) {
      setFormState({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
        priority: editingTask.priority
      });
      return;
    }

    if (isAddTaskOpen) {
      setFormState(initialState);
    }
  }, [editingTask, isAddTaskOpen]);

  if (!isAddTaskOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formState.title.trim() || !formState.dueDate) {
      return;
    }

    const payload = {
      title: formState.title.trim(),
      description: formState.description.trim(),
      dueDate: formState.dueDate,
      priority: formState.priority
    };

    if (editingTask) {
      void saveTask(editingTask.id, payload);
    } else {
      void addTask(payload);
    }
  }

  function handleClose() {
    setFormState(initialState);
    closeAddTask();
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">New Task</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              {isEditing ? "Update the details and keep moving" : "Add something worth shipping today"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Close
          </button>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Task Title</span>
            <input
              required
              value={formState.title}
              onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-brand-500"
              placeholder="Prepare launch checklist"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
            <textarea
              value={formState.description}
              onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500"
              placeholder="Add the key details so future-you has context."
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Due Date</span>
              <input
                required
                type="date"
                value={formState.dueDate}
                onChange={(event) => setFormState((current) => ({ ...current, dueDate: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Priority</span>
              <select
                value={formState.priority}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, priority: event.target.value as TaskPriority }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm capitalize text-slate-900 outline-none transition focus:border-brand-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {isEditing ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
