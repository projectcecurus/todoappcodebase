"use client";

import { TaskBoard } from "@/components/task-board";

export default function TodayPage() {
  return (
    <TaskBoard
      eyebrow="Today"
      title="Tasks due today"
      description="A dedicated view for what needs attention before the day is done."
      defaultFilter="today"
      showFilters={false}
      emptyTitle="You're clear for today"
      emptyDescription="No tasks are due today yet. Add one from the header when something comes up."
    />
  );
}
