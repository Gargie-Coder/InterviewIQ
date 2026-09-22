"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import { ScoreCard } from "../../../components/ui/ScoreCard";
import { SkillBar } from "../../../components/ui/SkillBar";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  FileText,
  Briefcase,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  TrendingUp,
  FileCheck2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, resumeAnalysis, jobMatchResult } = useApp();

  const skillOverview = [
    { skill: "Python", percentage: 84, category: "Strong" as const },
    { skill: "Java", percentage: 76, category: "Strong" as const },
    { skill: "SQL", percentage: 69, category: "Developing" as const },
    { skill: "System Design", percentage: 48, category: "Needs Improvement" as const },
    { skill: "Communication", percentage: 72, category: "Developing" as const },
  ];

  const recentActivity = [
    {
      action: "Resume analyzed",
      detail: "Overall score computed at 78/100 across 5 dimensions",
      time: "25 minutes ago",
      icon: FileText,
      iconColor: "text-brand-600 bg-brand-50 border-brand-100",
      href: "/resume-analyzer",
    },
    {
      action: "Job match completed",
      detail: "Evaluated vs. NexaCloud Software Engineer (82% fit)",
      time: "2 hours ago",
      icon: Briefcase,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/job-match",
    },
    {
      action: "Mock interview completed",
      detail: "Technical & behavioral session scored 77% overall",
      time: "Yesterday",
      icon: Bot,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
      href: "/interview",
    },
    {
      action: "Python assessment completed",
      detail: "Advanced asyncio & OOP fundamentals verified (84%)",
      time: "2 days ago",
      icon: CheckCircle2,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/skill-test",
    },
  ];

  const recommendedSteps = [
    {
      title: "1. Practice System Design",
      description: "Close your largest deficit area. Review distributed caching, rate limiters, and microservices patterns.",
      actionText: "Practice in AI Interview",
      href: "/interview",
      tag: "Highest Impact",
      tagVariant: "warning" as const,
    },
    {
      title: "2. Complete SQL Assessment",
      description: "Elevate your SQL rating from 69% to 80%+ by mastering B-tree indexing and transaction isolation.",
      actionText: "View Questions",
      href: "/questions",
      tag: "Quick Win",
      tagVariant: "default" as const,
    },
    {
      title: "3. Take a Technical Mock Interview",
      description: "Rehearse with real-time rubric feedback on relevance, technical depth, and communication clarity.",
      actionText: "Launch Interviewer",
      href: "/interview",
      tag: "Recommended",
      tagVariant: "success" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good morning, {user.name}
            </h1>
            <Badge variant="neutral" size="sm">
              Target: {user.targetRole}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here&apos;s your interview preparation overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interview">
            <Button variant="primary" size="lg" className="font-semibold shadow-subtle">
              <Play className="w-4 h-4 mr-2 fill-current" />
              Start Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="Resume Score"
          score={resumeAnalysis.overallScore || 78}
          trend="+4 pts"
          subtitle={`Skills: ${resumeAnalysis.breakdown.skills} • Exp: ${resumeAnalysis.breakdown.experience}`}
          icon={<FileText className="w-4 h-4" />}
        />
        <ScoreCard
          title="Job Match"
          score={jobMatchResult.jobMatchScore || 82}
          suffix="%"
          trend="Strong Fit"
          subtitle="Compared to target requisitions"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <ScoreCard
          title="Interview Readiness"
          score={71}
          suffix="%"
          trend="+8%"
          subtitle="4 mock rounds completed"
          icon={<Bot className="w-4 h-4" />}
        />
        <ScoreCard
          title="Skill Coverage"
          score={73}
          suffix="%"
          subtitle="6 of 8 core competencies verified"
          icon={<Layers className="w-4 h-4" />}
        />
      </div>

      {/* Skill Overview and Recommended Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Overview Bar Chart */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Skill Overview</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assessed proficiency levels relative to {user.targetRole} benchmarks.
                </p>
              </div>
              <Link href="/skill-gaps">
                <Button variant="ghost" size="sm" className="text-xs text-brand-600">
                  Detailed Gaps
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {skillOverview.map((item) => (
                <SkillBar
                  key={item.skill}
                  skill={item.skill}
                  percentage={item.percentage}
                  category={item.category}
                />
              ))}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Strong (&ge;75%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Developing (55-74%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Needs Improvement (&lt;55%)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Recommended Next Steps */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardTitle>Recommended Next Steps</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Prioritized interventions based on your recent performance.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {recommendedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                      {step.title}
                    </h4>
                    <Badge variant={step.tagVariant} size="sm">
                      {step.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="pt-1 flex justify-end">
                    <Link href={step.href}>
                      <Button variant="outline" size="sm" className="text-xs py-1 h-7">
                        {step.actionText}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Your preparation milestones and evaluation history.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            4 events logged
          </Badge>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0">
          {recentActivity.map((act, index) => {
            const Icon = act.icon;
            return (
              <div
                key={index}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${act.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block">
                      {act.action}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {act.detail}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {act.time}
                  </span>
                  <Link href={act.href}>
                    <Button variant="ghost" size="sm" className="text-xs text-brand-600 h-7 px-2">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
