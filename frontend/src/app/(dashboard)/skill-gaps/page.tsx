"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Network } from "lucide-react";

export default function SkillGapsPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Skill Gap Intelligence Engine"
        badgeText="Coming Soon"
        description="Dynamic multi-source competency graph calibration comparing candidate proficiencies against real market benchmarks is currently under development."
        icon={<Network className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
