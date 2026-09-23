"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { TrendingUp } from "lucide-react";

export default function SkillTestPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Skill Improvement Delta Testing"
        badgeText="Coming Soon"
        description="The empirical research component measuring Before-Learning vs. After-Learning mastery deltas across repeated evaluations is currently being calibrated."
        icon={<TrendingUp className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
