import { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p> : null}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {description ? <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}
