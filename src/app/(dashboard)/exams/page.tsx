"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Award,
  Clock,
  HelpCircle,
  BarChart,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function RoleExamsPage() {
  const sections = [
    { name: "Programming & Data Structures", questions: 10, weight: "25%", topics: "Python / Java concurrency, algorithms" },
    { name: "SQL & Query Tuning", questions: 8, weight: "20%", topics: "Indexing, execution plans, joins, isolation" },
    { name: "RESTful APIs & Microservices", questions: 7, weight: "20%", topics: "Stateless design, authentication, rate limits" },
    { name: "Databases & Caching", questions: 6, weight: "15%", topics: "PostgreSQL transactions, Redis caching layers" },
    { name: "High-Throughput System Design", questions: 5, weight: "20%", topics: "Scalability, CAP theorem, message queues" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Role Assessment
            </h1>
            <Badge variant="coming-soon" size="sm">
              Assessment Engine — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Standardized multi-section diagnostic examination designed to benchmark readiness for employer technical interviews.
          </p>
        </div>
      </div>

      {/* Main Assessment Specification Card */}
      <Card>
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="warning" size="sm">
                  Medium — Advanced
                </Badge>
                <Badge variant="neutral" size="sm">
                  36 Questions
                </Badge>
              </div>
              <CardTitle className="text-xl">
                Backend Developer Comprehensive Assessment
              </CardTitle>
              <CardDescription>
                Validates algorithmic depth, database indexing, API architecture, and distributed systems reasoning.
              </CardDescription>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-600" />
                60 Mins
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Proctored Mode
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-5">
          {/* Planned Sections Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Assessment Sections & Topic Weighting
            </h3>

            <div className="space-y-2.5">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <strong className="text-slate-900 text-sm">{sec.name}</strong>
                    <p className="text-slate-500">{sec.topics}</p>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <span>{sec.questions} Questions</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-800">
                      {sec.weight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-800 font-semibold block mb-0.5">
                Diagnostic Score Calibration Notice
              </strong>
              Upon completion of this timed diagnostic, your multi-source competency graph updates automatically, recalculating your skill gap distribution and recommending tailored remediation modules.
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-between">
          <span className="text-xs text-slate-400">
            Automated scoring rubric includes test correctness and time-to-solution.
          </span>
          <Button
            variant="primary"
            size="md"
            onClick={() => alert("The Role Assessment module will be activated upon integration of timed test sessions.")}
            className="font-semibold shadow-subtle"
          >
            Start Assessment (Preview)
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
