"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { LineChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Longitudinal Progress Analytics"
        badgeText="Coming Soon"
        description="Advanced telemetry tracking historical interview score curves, mastery velocity, and cohort percentiles will activate once you accumulate evaluation records."
        icon={<LineChart className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
