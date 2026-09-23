"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { GraduationCap } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Course Recommendations"
        badgeText="Coming Soon"
        description="Personalized pedagogical resource integration connecting candidates to curated courses mapped directly to identified skill gaps is currently under development."
        icon={<GraduationCap className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
