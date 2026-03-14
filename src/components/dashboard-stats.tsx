import { Task } from "@/types/task";
import { isToday } from "@/lib/utils";

type DashboardStatsProps = {
  tasks: Task[];
};

export function DashboardStats({ tasks }: DashboardStatsProps) {
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const todayCount = tasks.filter((task) => isToday(task.dueDate) && !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const cards = [
    {
      label: "Pending Tasks",
      value: pendingCount,
      detail: "Active priorities across your board",
      accent: "from-brand-500/20 to-brand-100"
    },
    {
      label: "Today's Tasks",
      value: todayCount,
      detail: "Items due before the day wraps up",
      accent: "from-amber-400/20 to-amber-100"
    },
    {
      label: "Completed Tasks",
      value: completedCount,
      detail: "Tasks already checked off this cycle",
      accent: "from-emerald-400/20 to-emerald-100"
    }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${card.accent} p-6 shadow-card`}>
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{card.value}</p>
          <p className="mt-3 text-sm text-slate-600">{card.detail}</p>
        </article>
      ))}
    </section>
  );
}
