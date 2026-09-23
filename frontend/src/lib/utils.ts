import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  fill: string;
  badge: string;
} {
  if (score >= 75) {
    return {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      fill: "bg-emerald-600",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
  }
  if (score >= 55) {
    return {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      fill: "bg-amber-500",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
    };
  }
  return {
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    fill: "bg-rose-500",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
  };
}

export function formatPercent(val: number): string {
  return `${Math.round(val)}%`;
}
