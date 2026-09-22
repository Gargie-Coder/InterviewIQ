"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ScoreCard } from "../../../components/ui/ScoreCard";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  TrendingUp,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Info,
} from "lucide-react";
import { DEMO_SKILL_IMPROVEMENTS } from "../../../lib/demoData";

export default function SkillImprovementPage() {
  const improvements = DEMO_SKILL_IMPROVEMENTS;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Skill Improvement Delta Test
            </h1>
            <Badge variant="coming-soon" size="sm">
              Empirical Research Component
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Measures measurable candidate skill acquisition before and after targeted modular remediation.
          </p>
        </div>
      </div>

      {/* Research Methodology Pipeline Banner */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl border-none">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
            Four-Stage Longitudinal Calibration Model
          </span>
          <Badge variant="default" size="sm" className="bg-slate-700 text-slate-200 border-slate-600">
            Active Study Design
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 font-semibold block">Stage 1</span>
            <strong className="text-sm text-white block mt-0.5">Before Learning</strong>
            <span className="text-[11px] text-slate-400">Baseline Diagnostic</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 font-semibold block">Stage 2</span>
            <strong className="text-sm text-white block mt-0.5">Assessment</strong>
            <span className="text-[11px] text-slate-400">Multi-Source Scoring</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 font-semibold block">Stage 3</span>
            <strong className="text-sm text-white block mt-0.5">Targeted Learning</strong>
            <span className="text-[11px] text-slate-400">Curated Remediation</span>
          </div>

          <div className="p-3 bg-brand-950/80 rounded-lg border border-brand-700/60 ring-1 ring-brand-500/40">
            <span className="text-xs text-brand-300 font-semibold block">Stage 4</span>
            <strong className="text-sm text-white block mt-0.5">After Learning</strong>
            <span className="text-[11px] text-emerald-400 font-bold">+18.5% Mean Delta</span>
          </div>
        </div>
      </Card>

      {/* Evaluated Skill Deltas */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle>Skill Growth & Validation Results</CardTitle>
          <CardDescription>
            Documented performance shifts across repeated evaluations for Alex Sharma.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-5">
          {improvements.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                    {metric.skill}
                  </h4>
                  <span className="text-xs text-slate-500">
                    Verified across {metric.assessmentCount} independent evaluation rounds
                  </span>
                </div>

                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
                  +{metric.delta}% Improvement
                </span>
              </div>

              {/* Comparative Dual Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Before Learning</span>
                    <strong className="text-slate-800">{metric.beforeLearningScore}%</strong>
                  </div>
                  <ProgressBar value={metric.beforeLearningScore} size="sm" barClassName="bg-slate-400" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>After Targeted Learning</span>
                    <strong className="text-emerald-700">{metric.afterLearningScore}%</strong>
                  </div>
                  <ProgressBar value={metric.afterLearningScore} size="sm" barClassName="bg-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
