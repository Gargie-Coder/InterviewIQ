"use client";

import React from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { HelpCircle } from "lucide-react";

export default function QuestionsPage() {
  return (
    <div className="py-8">
      <EmptyState
        title="Topic-Based Question Bank"
        badgeText="Coming Soon"
        description="Searchable repository of 500+ curated technical and scenario-based interview questions across Python, SQL, React, Systems, and Algorithms is under active curation."
        icon={<HelpCircle className="w-6 h-6" />}
        actionHref="/dashboard"
        actionText="Back to Dashboard"
      />
    </div>
  );
}
