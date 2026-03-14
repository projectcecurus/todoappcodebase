"use client";

import { ReactNode } from "react";

import { EmptyState } from "@/components/empty-state";
import { TaskItem } from "@/components/task-item";
import { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  emptyTitle: string;
  emptyDescription: string;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  emptyAction?: ReactNode;
};

export function TaskList({ tasks, emptyTitle, emptyDescription, onToggle, onDelete, onEdit, emptyAction }: TaskListProps) {
  if (!tasks.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
