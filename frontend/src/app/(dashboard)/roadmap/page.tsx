"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Milestone } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Personalized Learning Roadmap"
        badgeText="Coming Soon"
        description="Automated sequential milestone generator mapping out prioritized technical proficiencies from foundation to system design is under development."
        icon={<Milestone className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
