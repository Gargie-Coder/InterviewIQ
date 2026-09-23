"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Compass } from "lucide-react";

export default function RolePrepPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Role-Specific Preparation Tracks"
        badgeText="Coming Soon"
        description="Comprehensive curriculum tracks covering Software Engineer, Backend, Frontend, Data Science, and DevOps career transitions are staged for upcoming releases."
        icon={<Compass className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
