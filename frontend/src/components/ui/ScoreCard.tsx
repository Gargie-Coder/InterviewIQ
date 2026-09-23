import React from "react";
import { cn, getScoreColor } from "../../lib/utils";
import { Card } from "./Card";

interface ScoreCardProps {
  title: string;
  score: number;
  max?: number;
  subtitle?: string;
  trend?: string;
  icon?: React.ReactNode;
  suffix?: string;
  className?: string;
}

export function ScoreCard({
  title,
  score,
  max = 100,
  subtitle,
  trend,
  icon,
  suffix = "",
  className,
}: ScoreCardProps) {
  const percent = Math.round((score / max) * 100);
  const colors = getScoreColor(percent);

  return (
    <Card className={cn("p-5 flex flex-col justify-between hover:border-slate-300 transition-colors", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {score}
          {suffix}
        </span>
        {max === 100 && !suffix && (
          <span className="text-sm font-medium text-slate-400">/ 100</span>
        )}
        {trend && (
          <span className="ml-auto text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-3">
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", colors.fill)}
            style={{ width: `${percent}%` }}
          />
        </div>
        {subtitle && (
          <p className="mt-2 text-xs text-slate-500 truncate">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
