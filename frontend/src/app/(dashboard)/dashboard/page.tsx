"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Play,
  UploadCloud,
  FileCheck2,
} from "lucide-react";

interface DashboardData {
  userName: string;
  targetRole: string;
  resumeScore: number | null;
  matchScore: number | null;
  interviewReadiness: number | null;
  interviewsCount: number;
  hasResume: boolean;
  hasJobMatch: boolean;
  skills: Array<{ skill: string; percentage: number; category: "Strong" | "Developing" | "Needs Improvement" }>;
  recentActivity: Array<{
    action: string;
    detail: string;
    time: string;
    type: string;
    href: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useApp();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/dashboard/stats")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setStats(data);
        })
        .finally(() => setLoadingStats(false));
    }
  }, [isAuthenticated]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading your candidate dashboard...</p>
        </div>
      </div>
    );
  }

  const resumeScore = stats?.resumeScore;
  const matchScore = stats?.matchScore;
  const interviewReadiness = stats?.interviewReadiness;
  const skillCount = user.skills?.length || 0;

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
        {resumeScore !== null && resumeScore !== undefined ? (
          <ScoreCard
            title="Resume Score"
            score={resumeScore}
            subtitle="Analyzed from your uploaded resume"
            icon={<FileText className="w-4 h-4" />}
          />
        ) : (
          <Card className="p-5 flex flex-col justify-between border-dashed border-slate-300 bg-slate-50/50">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Resume Score
              </span>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                No resume analyzed yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Upload your PDF resume to compute your score.
              </p>
            </div>
            <Link href="/resume-analyzer" className="mt-4">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Upload Resume
              </Button>
            </Link>
          </Card>
        )}

        {matchScore !== null && matchScore !== undefined ? (
          <ScoreCard
            title="Job Match"
            score={matchScore}
            suffix="%"
            subtitle="Target requisition alignment"
            icon={<Briefcase className="w-4 h-4" />}
          />
        ) : (
          <Card className="p-5 flex flex-col justify-between border-dashed border-slate-300 bg-slate-50/50">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Job Match
              </span>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                No job matched yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Paste a target job posting to compare skills.
              </p>
            </div>
            <Link href="/job-match" className="mt-4">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Run Job Match
              </Button>
            </Link>
          </Card>
        )}

        {interviewReadiness !== null && interviewReadiness !== undefined ? (
          <ScoreCard
            title="Interview Readiness"
            score={interviewReadiness}
            suffix="%"
            subtitle={`Average across ${stats?.interviewsCount || 1} mock rounds`}
            icon={<Bot className="w-4 h-4" />}
          />
        ) : (
          <Card className="p-5 flex flex-col justify-between border-dashed border-slate-300 bg-slate-50/50">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interview Readiness
              </span>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                0 Mock rounds
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Take an AI mock interview to benchmark answers.
              </p>
            </div>
            <Link href="/interview" className="mt-4">
              <Button variant="primary" size="sm" className="w-full text-xs">
                Start Mock
              </Button>
            </Link>
          </Card>
        )}

        <ScoreCard
          title="Skill Coverage"
          score={skillCount > 0 ? Math.min(95, 40 + skillCount * 8) : 50}
          suffix="%"
          subtitle={`${skillCount} skills identified in profile`}
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
                  Proficiencies identified for {user.targetRole}.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {stats?.skills && stats.skills.length > 0 ? (
                stats.skills.map((item) => (
                  <SkillBar
                    key={item.skill}
                    skill={item.skill}
                    percentage={item.percentage}
                    category={item.category}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500">
                    Upload your resume to extract and display your verified skill competencies.
                  </p>
                  <Link href="/resume-analyzer" className="inline-block mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      Analyze Resume
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Recommended Next Steps */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3">
              <CardTitle>Recommended Next Steps</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Suggested actions to boost your preparation.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {!stats?.hasResume && (
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                      1. Upload Your Resume
                    </h4>
                    <Badge variant="warning" size="sm">
                      Essential
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    Parse your PDF to compute your baseline score and extract technical proficiencies.
                  </p>
                  <div className="pt-1 flex justify-end">
                    <Link href="/resume-analyzer">
                      <Button variant="outline" size="sm" className="text-xs py-1 h-7">
                        Upload PDF
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                    2. Take AI Mock Interview
                  </h4>
                  <Badge variant="success" size="sm">
                    Recommended
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">
                  Practice questions tailored to {user.targetRole} with real-time rubric feedback.
                </p>
                <div className="pt-1 flex justify-end">
                  <Link href="/interview">
                    <Button variant="primary" size="sm" className="text-xs py-1 h-7">
                      Start Interview
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                    3. Match Job Description
                  </h4>
                  <Badge variant="neutral" size="sm">
                    Analysis
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">
                  Compare your resume against live requirements to detect missing keywords.
                </p>
                <div className="pt-1 flex justify-end">
                  <Link href="/job-match">
                    <Button variant="outline" size="sm" className="text-xs py-1 h-7">
                      Compare Job
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
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
              Your preparation milestones and evaluation events.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            {stats?.recentActivity?.length || 0} events logged
          </Badge>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0">
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((act, index) => (
              <div
                key={index}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-slate-50 text-brand-600 border-slate-200">
                    <Clock className="w-4 h-4" />
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
                  <span>{act.time}</span>
                  <Link href={act.href}>
                    <Button variant="ghost" size="sm" className="text-xs text-brand-600 h-7 px-2">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No activity recorded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
