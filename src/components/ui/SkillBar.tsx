import React from "react";
import { cn, getScoreColor } from "../../lib/utils";

interface SkillBarProps {
  skill: string;
  percentage: number; // 0 to 100
  targetPercentage?: number;
  category?: "Strong" | "Developing" | "Needs Improvement";
  className?: string;
}

export function SkillBar({
  skill,
  percentage,
  targetPercentage,
  category,
  className,
}: SkillBarProps) {
  const colors = getScoreColor(percentage);

  const categoryBadgeStyles = {
    Strong: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Developing: "bg-amber-50 text-amber-700 border-amber-200",
    "Needs Improvement": "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-800">{skill}</span>
        <div className="flex items-center gap-2">
          {category && (
            <span
              className={cn(
                "text-[11px] px-2 py-0.5 rounded border font-medium",
                categoryBadgeStyles[category]
              )}
            >
              {category}
            </span>
          )}
          <span className="font-semibold text-slate-900 w-9 text-right">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="relative w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colors.fill)}
          style={{ width: `${percentage}%` }}
        />
        {targetPercentage && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
            style={{ left: `${targetPercentage}%` }}
            title={`Target: ${targetPercentage}%`}
          />
        )}
      </div>
    </div>
  );
}
