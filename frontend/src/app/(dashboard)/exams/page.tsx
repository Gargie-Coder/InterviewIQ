"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Award } from "lucide-react";

export default function ExamsPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Role-Specific Timed Assessments"
        badgeText="Coming Soon"
        description="Comprehensive diagnostic exams validating candidate depth across databases, distributed systems, API security, and code quality are staged for integration."
        icon={<Award className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
