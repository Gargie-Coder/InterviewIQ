"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { SkillBar } from "../../../components/ui/SkillBar";
import {
  Network,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { DEMO_SKILL_GAPS } from "../../../lib/demoData";

export default function SkillGapsPage() {
  const { user } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"All" | "Strong" | "Developing" | "Needs Improvement">("All");

  const filteredSkills = activeCategoryFilter === "All"
    ? DEMO_SKILL_GAPS
    : DEMO_SKILL_GAPS.filter((s) => s.category === activeCategoryFilter);

  const strongCount = DEMO_SKILL_GAPS.filter((s) => s.category === "Strong").length;
  const devCount = DEMO_SKILL_GAPS.filter((s) => s.category === "Developing").length;
  const needsCount = DEMO_SKILL_GAPS.filter((s) => s.category === "Needs Improvement").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Skill Gap Analysis
            </h1>
            <Badge variant="coming-soon" size="sm">
              Skill Intelligence — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Visual competency calibration comparing your current proficiencies against target role requirements.
          </p>
        </div>

        <Badge variant="neutral" size="md" className="self-start sm:self-auto">
          Target Role: <strong className="ml-1 text-slate-800">Backend Developer</strong>
        </Badge>
      </div>

      {/* Feature notice banner */}
      <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-slate-800 font-semibold block mb-0.5">
            Automated Competency Calibration Engine
          </strong>
          This preview derives baseline estimates from candidate <strong className="underline decoration-slate-400">Alex Sharma</strong>. As you complete adaptive mock interviews and coding assessments, dynamic weights update each skill vector automatically.
        </div>
      </div>

      {/* 3 Summary Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          onClick={() => setActiveCategoryFilter(activeCategoryFilter === "Strong" ? "All" : "Strong")}
          className={`p-5 cursor-pointer border-l-4 border-l-emerald-500 transition-all ${
            activeCategoryFilter === "Strong" ? "ring-2 ring-emerald-400/40" : "hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Strong Proficiencies
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{strongCount}</div>
          <p className="mt-1 text-xs text-slate-500">Exceeds standard employer requirements.</p>
        </Card>

        <Card
          onClick={() => setActiveCategoryFilter(activeCategoryFilter === "Developing" ? "All" : "Developing")}
          className={`p-5 cursor-pointer border-l-4 border-l-amber-500 transition-all ${
            activeCategoryFilter === "Developing" ? "ring-2 ring-amber-400/40" : "hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Developing
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{devCount}</div>
          <p className="mt-1 text-xs text-slate-500">Close to benchmark; quick targeted wins.</p>
        </Card>

        <Card
          onClick={() => setActiveCategoryFilter(activeCategoryFilter === "Needs Improvement" ? "All" : "Needs Improvement")}
          className={`p-5 cursor-pointer border-l-4 border-l-rose-500 transition-all ${
            activeCategoryFilter === "Needs Improvement" ? "ring-2 ring-rose-400/40" : "hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Needs Improvement
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{needsCount}</div>
          <p className="mt-1 text-xs text-slate-500">Critical gaps to prioritize in preparation.</p>
        </Card>
      </div>

      {/* Detailed Skill Comparison Visualization */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Competency Calibration vs. Role Expectation</CardTitle>
            <CardDescription>
              Black marker indicates the minimum industry threshold ({`70%–80%`}) for Backend Developer positions.
            </CardDescription>
          </div>
          {activeCategoryFilter !== "All" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategoryFilter("All")}
              className="text-xs text-brand-600 self-start"
            >
              Show All ({DEMO_SKILL_GAPS.length})
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6 pt-5">
          {filteredSkills.map((item) => (
            <div key={item.skill} className="space-y-1">
              <SkillBar
                skill={item.skill}
                percentage={item.candidateLevel}
                targetPercentage={item.requiredLevel}
                category={item.category}
              />
              <div className="flex justify-between text-[11px] text-slate-400 px-0.5">
                <span>Candidate Level: <strong>{item.candidateLevel}%</strong></span>
                <span>Role Requirement: <strong>{item.requiredLevel}%</strong></span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
