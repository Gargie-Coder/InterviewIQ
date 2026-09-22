"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Milestone,
  CheckCircle2,
  Clock,
  ArrowDown,
  Sparkles,
  BookOpen,
  Info,
} from "lucide-react";
import { DEMO_ROADMAP } from "../../../lib/demoData";

export default function RoadmapPage() {
  const steps = DEMO_ROADMAP;

  const completedCount = steps.filter((s) => s.status === "Completed").length;
  const inProgressCount = steps.filter((s) => s.status === "In Progress").length;
  const recommendedCount = steps.filter((s) => s.status === "Recommended").length;

  const getStatusBadge = (status: "Completed" | "In Progress" | "Recommended") => {
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (status === "In Progress") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
        Recommended
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Personalized Learning Roadmap
            </h1>
            <Badge variant="coming-soon" size="sm">
              Adaptive Path Engine — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Structured competency milestones tracking your progression toward Backend Developer readiness.
          </p>
        </div>

        <Badge variant="neutral" size="md" className="self-start sm:self-auto">
          Track: <strong className="ml-1 text-slate-800">Backend / Software Engineer</strong>
        </Badge>
      </div>

      {/* Progress Summary Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-emerald-500">
          <span className="text-xs font-semibold text-slate-500 uppercase">Completed Stages</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{completedCount} of {steps.length}</div>
          <span className="text-xs text-emerald-600">Foundation verified</span>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Stages</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{inProgressCount} Stages</div>
          <span className="text-xs text-amber-600">FastAPI & Docker CI/CD</span>
        </Card>
        <Card className="p-4 border-l-4 border-l-brand-500">
          <span className="text-xs font-semibold text-slate-500 uppercase">Recommended Next</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{recommendedCount} Stages</div>
          <span className="text-xs text-brand-600">Cloud & System Design</span>
        </Card>
      </div>

      {/* Visual Roadmap Flow */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle>Milestone Pathway Blueprint</CardTitle>
          <CardDescription>
            Step-by-step sequence aligned with industry software hiring prerequisites.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.id} className="relative">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                          {step.stageTitle}
                        </h4>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.skills.map((sk, si) => (
                        <span
                          key={si}
                          className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {!isLast && (
                    <div className="flex justify-center my-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
