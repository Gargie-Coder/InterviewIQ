"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ScoreCard } from "../../../components/ui/ScoreCard";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  LineChart,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  Award,
} from "lucide-react";

export default function AnalyticsPage() {
  const interviewHistory = [
    { session: "Mock #1 — General", date: "Sep 10", score: 65, tech: 62, comm: 70 },
    { session: "Mock #2 — Backend APIs", date: "Sep 14", score: 71, tech: 72, comm: 69 },
    { session: "Mock #3 — Systems & Concurrency", date: "Sep 18", score: 74, tech: 75, comm: 72 },
    { session: "Mock #4 — Full Software Engineer", date: "Sep 22", score: 77, tech: 78, comm: 72 },
  ];

  const strongestTopics = [
    { topic: "Relational Queries (SQL)", score: 86, tag: "Strong" },
    { topic: "Python Concurrency & Asyncio", score: 84, tag: "Strong" },
    { topic: "REST API Design Principles", score: 82, tag: "Strong" },
  ];

  const weakestTopics = [
    { topic: "Distributed Caching & Redis", score: 48, tag: "Needs Improvement" },
    { topic: "Container Orchestration (K8s)", score: 42, tag: "Needs Improvement" },
    { topic: "High-Volume System Design", score: 45, tag: "Needs Improvement" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Progress Analytics
            </h1>
            <Badge variant="coming-soon" size="sm">
              Analytics Engine — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Longitudinal telemetry tracking candidate competency acquisition, interview ratings, and concept mastery curves.
          </p>
        </div>

        <Badge variant="neutral" size="md" className="self-start sm:self-auto">
          Cohort: Software Engineer 2024
        </Badge>
      </div>

      {/* 4 Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="Avg Interview Score"
          score={77}
          suffix="%"
          trend="+12% over 4 wks"
          subtitle="4 evaluations completed"
          icon={<Award className="w-4 h-4" />}
        />
        <ScoreCard
          title="Skill Velocity"
          score={83}
          suffix=" pts"
          trend="Accelerating"
          subtitle="+18.5% average gain"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <ScoreCard
          title="Question Accuracy"
          score={79}
          suffix="%"
          trend="Top 25%"
          subtitle="48 questions answered"
          icon={<CheckCircle2 className="w-4 h-4" />}
        />
        <ScoreCard
          title="Curriculum Completion"
          score={62}
          suffix="%"
          trend="On Track"
          subtitle="5 of 8 roadmap stages"
          icon={<Layers className="w-4 h-4" />}
        />
      </div>

      {/* Historical Trend Chart Simulation */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Interview Scores Over Time</CardTitle>
            <CardDescription>
              Progression curve across completed mock interview rounds.
            </CardDescription>
          </div>
          <Badge variant="success" size="sm">
            Steady Upward Trajectory
          </Badge>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Visual Column / Bar Chart */}
          <div className="grid grid-cols-4 gap-4 items-end h-48 pt-6 pb-2 border-b border-slate-200">
            {interviewHistory.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-bold text-slate-800">{item.score}%</span>
                <div
                  className="w-full max-w-[64px] bg-brand-600 rounded-t-lg transition-all hover:bg-brand-700"
                  style={{ height: `${item.score * 1.5}px` }}
                />
                <span className="text-[11px] text-slate-500 font-medium">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {interviewHistory.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 font-semibold">{item.session}</strong>
                <div className="mt-1 flex justify-between text-slate-500">
                  <span>Tech: {item.tech}%</span>
                  <span>Comm: {item.comm}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strongest vs Weakest Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Topics */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Highest Mastery Topics
            </CardTitle>
            <CardDescription className="text-xs">
              Consistently high rubric marks across all evaluations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            {strongestTopics.map((top, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{top.topic}</span>
                  <span className="text-emerald-700">{top.score}%</span>
                </div>
                <ProgressBar value={top.score} size="sm" barClassName="bg-emerald-600" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weakest Topics */}
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Priority Deficit Topics
            </CardTitle>
            <CardDescription className="text-xs">
              Recommended focus areas for subsequent study sprints.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            {weakestTopics.map((top, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{top.topic}</span>
                  <span className="text-rose-700">{top.score}%</span>
                </div>
                <ProgressBar value={top.score} size="sm" barClassName="bg-rose-500" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
