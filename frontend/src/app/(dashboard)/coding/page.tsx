"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Code2 } from "lucide-react";

export default function CodingPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Coding Interview Sandbox"
        badgeText="Coming Soon"
        description="An isolated cloud sandbox supporting live algorithmic problem-solving, automated test suite runners, and time/memory complexity profiling is currently under development."
        icon={<Code2 className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
