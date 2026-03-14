"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AddTaskModal } from "@/components/add-task-modal";
import { Header } from "@/components/header";
import { TaskProvider } from "@/context/task-context";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-50 bg-grid [background-size:22px_22px]">
        {isAuthPage ? null : <Header />}
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
        {isAuthPage ? null : <AddTaskModal />}
      </div>
    </TaskProvider>
  );
}
