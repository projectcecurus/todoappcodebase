"use client";

import { TaskBoard } from "@/components/task-board";

export default function CompletedPage() {
  return (
    <TaskBoard
      eyebrow="Completed"
      title="Recently completed work"
      description="A clean archive of tasks you've already finished so progress stays visible."
      defaultFilter="completed"
      showFilters={false}
      emptyTitle="No completed tasks yet"
      emptyDescription="Once you mark tasks as complete, they'll show up here with subdued styling."
    />
  );
}
