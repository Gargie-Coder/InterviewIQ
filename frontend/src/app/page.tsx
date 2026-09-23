"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { ScoreCard } from "../components/ui/ScoreCard";
import { SkillBar } from "../components/ui/SkillBar";
import {
  FileText,
  Briefcase,
  FileCheck2,
  Bot,
  Code2,
  Network,
  Compass,
  HelpCircle,
  Award,
  Milestone,
  GraduationCap,
  LineChart,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useApp();

  const features = [
    {
      id: "resume-analyzer",
      name: "Resume Analyzer",
      description: "Extract candidate competencies, parse structural sections, and compute multi-metric quality scores.",
      icon: FileText,
      status: "Available",
      href: "/resume-analyzer",
    },
    {
      id: "job-match",
      name: "Job Description Match",
      description: "Map resume qualifications against live job requirements to identify strong overlaps and missing requirements.",
      icon: Briefcase,
      status: "Available",
      href: "/job-match",
    },
    {
      id: "ats-score",
      name: "ATS Score",
      description: "InterviewIQ ATS Compatibility Estimate evaluating keyword density, formatting readability, and section standards.",
      icon: FileCheck2,
      status: "Available",
      href: "/ats-score",
    },
    {
      id: "ai-interview",
      name: "AI Interviewer",
      description: "Engage in structured multi-turn technical and behavioral mock interviews with quantitative rubric grading.",
      icon: Bot,
      status: "Available",
      href: "/interview",
    },
    {
      id: "coding-interview",
      name: "Coding Interview",
      description: "Browser-based algorithmic problem solving environment with automated test suites and complexity benchmarks.",
      icon: Code2,
      status: "Coming Soon",
      href: "/coding",
    },
    {
      id: "skill-gaps",
      name: "Skill Gap Analysis",
      description: "Visual taxonomy comparing candidate proficiency levels against market expectations for target engineering roles.",
      icon: Network,
      status: "Coming Soon",
      href: "/skill-gaps",
    },
    {
      id: "role-prep",
      name: "Role-Specific Preparation",
      description: "Curated domain tracks covering Software Engineer, Backend, Frontend, Full Stack, Data, and DevOps career paths.",
      icon: Compass,
      status: "Coming Soon",
      href: "/role-prep",
    },
    {
      id: "question-bank",
      name: "Topic-Based Questions",
      description: "Searchable technical repository categorized by language, difficulty, and question archetype.",
      icon: HelpCircle,
      status: "Coming Soon",
      href: "/questions",
    },
    {
      id: "role-exams",
      name: "Role-Specific Exams",
      description: "Timed diagnostic assessments validating depth across databases, distributed systems, and API design.",
      icon: Award,
      status: "Coming Soon",
      href: "/exams",
    },
    {
      id: "roadmap",
      name: "Personalized Learning Roadmap",
      description: "Guided milestone progression outlining prioritized technical proficiencies from foundation to system design.",
      icon: Milestone,
      status: "Coming Soon",
      href: "/roadmap",
    },
    {
      id: "courses",
      name: "Course Recommendations",
      description: "Tailored pedagogical resources mapped specifically to remediate identified candidate skill deficits.",
      icon: GraduationCap,
      status: "Coming Soon",
      href: "/courses",
    },
    {
      id: "analytics",
      name: "Progress Analytics",
      description: "Longitudinal tracking of mock interview ratings, calibration deltas, and concept mastery curves.",
      icon: LineChart,
      status: "Coming Soon",
      href: "/analytics",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-subtle">
              IQ
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-none">
                InterviewIQ
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Career Intelligence Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Platform Features
            </a>
            <a href="#preview" className="hover:text-slate-900 transition-colors">
              Product Preview
            </a>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="font-semibold shadow-subtle">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Career Intelligence Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          InterviewIQ
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 font-medium mt-3 tracking-tight">
          Prepare smarter. Interview better.
        </p>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An intelligent career preparation platform that analyzes your resume, matches your skills to real job requirements, and helps you prepare for interviews.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="px-6 py-3 font-semibold shadow-subtle">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="px-6 py-3 font-medium">
              Explore Features
            </Button>
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Persistent Account Storage
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Real Resume PDF Parsing
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Interactive Mock Interviews
          </span>
        </div>
      </section>

      {/* Dashboard Preview Section (Built with real UI components) */}
      <section id="preview" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-dropdown">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="ml-2 text-xs font-semibold text-slate-500">
                InterviewIQ Dashboard Preview — Candidate Overview
              </span>
            </div>
            <Badge variant="success" size="sm">
              Live Interactive Prototype
            </Badge>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ScoreCard
              title="Resume Score"
              score={78}
              trend="+4% this week"
              subtitle="Skills: 82 • Experience: 76"
            />
            <ScoreCard
              title="Job Match"
              score={82}
              suffix="%"
              trend="Strong Fit"
              subtitle="Target: NexaCloud Software Engineer"
            />
            <ScoreCard
              title="Interview Readiness"
              score={71}
              suffix="%"
              subtitle="Based on 4 mock sessions"
            />
            <ScoreCard
              title="Skill Coverage"
              score={73}
              suffix="%"
              subtitle="6 of 8 required skills met"
            />
          </div>

          {/* Sub Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-5 rounded-xl border border-slate-100">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Target Role Skill Overview
                </h4>
                <span className="text-xs text-slate-500">Software Engineer</span>
              </div>
              <div className="space-y-2.5">
                <SkillBar skill="Python" percentage={84} category="Strong" />
                <SkillBar skill="Java" percentage={76} category="Strong" />
                <SkillBar skill="SQL" percentage={69} category="Developing" />
                <SkillBar skill="System Design" percentage={48} category="Needs Improvement" />
                <SkillBar skill="Communication" percentage={72} category="Developing" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Recommended Next Actions
                </h4>
                <Badge variant="neutral" size="sm">
                  High Priority
                </Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-800">1. Practice System Design</strong>
                    <span className="text-slate-500">Focus on distributed rate limiting & caching.</span>
                  </div>
                  <Link href="/interview">
                    <Button variant="outline" size="sm" className="text-xs">
                      Practice
                    </Button>
                  </Link>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-800">2. Complete SQL Assessment</strong>
                    <span className="text-slate-500">Review indexing strategy & B-Trees.</span>
                  </div>
                  <Link href="/questions">
                    <Button variant="outline" size="sm" className="text-xs">
                      Review
                    </Button>
                  </Link>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="block text-slate-800">3. Take Technical Mock Interview</strong>
                    <span className="text-slate-500">Interactive session with quantitative grading.</span>
                  </div>
                  <Link href="/interview">
                    <Button variant="primary" size="sm" className="text-xs">
                      Start
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (12 Feature Cards) */}
      <section id="features" className="py-16 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Complete Preparation Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Every stage of your career transition covered.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear distinction between working functional tools and forthcoming research modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              const isWorking = f.status === "Available";
              return (
                <Link key={f.id} href={f.href} className="group block">
                  <Card className="p-6 h-full flex flex-col justify-between hover:border-slate-300 hover:shadow-dropdown transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                            isWorking
                              ? "bg-brand-50 text-brand-600 border-brand-100 group-hover:bg-brand-600 group-hover:text-white"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          } transition-colors`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge
                          variant={isWorking ? "success" : "coming-soon"}
                          size="sm"
                        >
                          {f.status}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-slate-900 text-base mb-2 group-hover:text-brand-600 transition-colors">
                        {f.name}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {f.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                      <span className={isWorking ? "text-brand-600" : "text-slate-400"}>
                        {isWorking ? "Launch Tool" : "View Preview"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
              IQ
            </div>
            <span className="font-semibold text-sm text-slate-900">
              InterviewIQ
            </span>
            <span className="text-slate-400 text-xs ml-2">
              — "Prepare smarter. Interview better."
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Designed for university evaluation, mentors, and prospective stakeholders.
          </p>
        </div>
      </footer>
    </div>
  );
}
