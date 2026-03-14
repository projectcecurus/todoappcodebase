import { TaskFilter } from "@/types/task";
import { cn } from "@/lib/utils";

type TaskFiltersProps = {
  activeFilter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

const filters: Array<{ value: TaskFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "today", label: "Today" }
];

export function TaskFilters({ activeFilter, onChange }: TaskFiltersProps) {
  return (
    <div className="inline-flex w-full flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card sm:w-auto">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={cn(
            "rounded-xl px-4 py-2.5 text-sm font-medium transition",
            activeFilter === filter.value ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
