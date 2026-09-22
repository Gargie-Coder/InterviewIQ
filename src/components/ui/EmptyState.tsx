import React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Sparkles, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  badgeText?: string;
  icon?: React.ReactNode;
  actionHref?: string;
  actionText?: string;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  badgeText = "Coming Soon",
  icon,
  actionHref = "/dashboard",
  actionText = "Explore Available Features",
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-subtle flex flex-col items-center",
        className
      )}
    >
      <div className="mb-4">
        {badgeText && (
          <Badge variant="coming-soon" size="md">
            {badgeText}
          </Badge>
        )}
      </div>

      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-4">
        {icon || <Sparkles className="w-6 h-6" />}
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionHref && (
          <Link href={actionHref}>
            <Button variant="primary" size="md">
              {actionText}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        )}
        {secondaryAction}
      </div>
    </div>
  );
}
