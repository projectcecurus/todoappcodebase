"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useTasks } from "@/context/task-context";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/today", label: "Today" },
  { href: "/completed", label: "Completed" }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openAddTask, session, signOut } = useTasks();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-sm font-semibold text-white shadow-card">
              K
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-900">Keldo</p>
              <p className="text-sm text-slate-500">Task planning for focused days</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  pathname === link.href ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <button
                type="button"
                onClick={openAddTask}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() =>
                  void signOut().then(() => {
                    router.replace("/auth");
                    router.refresh();
                  })
                }
                className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
