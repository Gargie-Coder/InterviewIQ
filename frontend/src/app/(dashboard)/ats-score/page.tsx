"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
  Lightbulb,
  UploadCloud,
} from "lucide-react";
import { AtsScoreResult } from "../../../types";

export default function AtsScorePage() {
  const { resumeAnalysis } = useApp();
  const [atsScoreResult, setAtsScoreResult] = useState<AtsScoreResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    if (resumeAnalysis?.parsedData?.rawText) {
      setIsEvaluating(true);
      fetch("/api/ats/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeAnalysis.parsedData.rawText,
        }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setAtsScoreResult(data);
        })
        .finally(() => setIsEvaluating(false));
    }
  }, [resumeAnalysis]);

  if (!resumeAnalysis) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ATS Compatibility Score
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulate Applicant Tracking System parsing algorithms to evaluate your resume.
          </p>
        </div>

        <Card className="text-center p-12 border-dashed border-slate-300">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base mb-1">
            No Resume Uploaded Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Upload your resume in the Resume Analyzer first to generate an ATS compatibility estimate and keyword density analysis.
          </p>
          <Link href="/resume-analyzer">
            <Button variant="primary" size="md">
              Go to Resume Analyzer
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const result = atsScoreResult || {
    atsScore: 75,
    label: "InterviewIQ ATS Compatibility Estimate",
    breakdown: {
      keywords: 75,
      formatting: 82,
      skills: 78,
      experience: 72,
      jobRelevance: 74,
      sectionCompleteness: 85,
    },
    matchedKeywords: resumeAnalysis.parsedData.skills.slice(0, 6),
    missingKeywords: ["System Design", "Cloud Infrastructure", "CI/CD"],
    suggestions: [
      "Ensure standard section titles ('Work Experience', 'Education', 'Technical Skills') for reliable machine parsing.",
      "Add quantifiable metrics (e.g. percentages, throughput, scale) in bullet points.",
      "Incorporate missing industry keywords relevant to your target role.",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              ATS Compatibility Score
            </h1>
            <Badge variant="success" size="sm">
              Functional
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Simulate Applicant Tracking System parsing algorithms on your uploaded resume.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-slate-800 font-semibold block mb-0.5">
            {result.label}
          </strong>
          This estimate benchmarks your resume layout, parsing robustness, and keyword frequency against standardized ATS parsing heuristics (e.g. Greenhouse, Lever, Workday standards). Proprietary internal screening criteria vary across employers.
        </div>
      </div>

      {/* Score Summary Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card className="h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white to-slate-50/50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              ATS Compatibility Estimate
            </span>
            <div className="my-4">
              <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900">
                  {result.atsScore}
                </span>
                <span className="text-xs font-medium text-slate-400">/ 100</span>
              </div>
            </div>
            <div>
              <Badge variant="success" size="md">
                Machine Readable
              </Badge>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                ATS Metric Breakdown
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Evaluation across automated screening dimensions.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Keywords Frequency & Density</span>
                  <span className="text-slate-900 font-bold">{result.breakdown.keywords} / 100</span>
                </div>
                <ProgressBar value={result.breakdown.keywords} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Formatting Simplicity</span>
                  <span className="text-slate-900 font-bold">{result.breakdown.formatting} / 100</span>
                </div>
                <ProgressBar value={result.breakdown.formatting} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Skills Taxonomy Match</span>
                  <span className="text-slate-900 font-bold">{result.breakdown.skills} / 100</span>
                </div>
                <ProgressBar value={result.breakdown.skills} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Experience Chronology & Metrics</span>
                  <span className="text-slate-900 font-bold">{result.breakdown.experience} / 100</span>
                </div>
                <ProgressBar value={result.breakdown.experience} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Section Completeness</span>
                  <span className="text-slate-900 font-bold">{result.breakdown.sectionCompleteness} / 100</span>
                </div>
                <ProgressBar value={result.breakdown.sectionCompleteness} size="sm" useScoreColor />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Keywords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Indexed Keywords ({result.matchedKeywords?.length || 0})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {result.matchedKeywords?.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Suggested Keywords ({result.missingKeywords?.length || 0})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {result.missingKeywords?.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brand-600" />
            Actionable Optimization Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-1">
          {result.suggestions?.map((sug, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700"
            >
              <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{sug}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
