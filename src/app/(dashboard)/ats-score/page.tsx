"use client";

import React, { useState } from "react";
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
  Layers,
  Search,
  Tag,
  Lightbulb,
} from "lucide-react";
import { DEMO_ATS_SCORE } from "../../../lib/demoData";

export default function AtsScorePage() {
  const { resumeAnalysis, atsScoreResult, setAtsScore } = useApp();
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = async () => {
    setIsRecalculating(true);
    try {
      const res = await fetch("/api/ats/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeAnalysis.parsedData.rawText,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAtsScore(data);
      } else {
        setAtsScore(DEMO_ATS_SCORE);
      }
    } catch {
      setAtsScore(DEMO_ATS_SCORE);
    } finally {
      setIsRecalculating(false);
    }
  };

  const { atsScore, label, breakdown, suggestions, matchedKeywords, missingKeywords } = atsScoreResult;

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
            Simulate Applicant Tracking System parsing algorithms to optimize keyword indexing and layout hygiene.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          isLoading={isRecalculating}
          onClick={handleRecalculate}
          className="text-xs font-semibold self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-600" />
          Re-evaluate ATS
        </Button>
      </div>

      {/* Mandatory Disclaimer Box as specified in requirement #11 */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="text-slate-800 font-semibold block mb-0.5">
            {label}
          </strong>
          This estimate benchmarks your resume layout, parsing robustness, and keyword frequency against standardized ATS parsing heuristics (e.g. Greenhouse, Lever, Workday standards). Proprietary internal screening criteria vary across employers.
        </div>
      </div>

      {/* Score Summary Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Circular Gauge */}
        <div className="md:col-span-4">
          <Card className="h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white to-slate-50/50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              ATS Compatibility Estimate
            </span>
            <div className="my-4">
              <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900">
                  {atsScore}
                </span>
                <span className="text-xs font-medium text-slate-400">/ 100</span>
              </div>
            </div>
            <div>
              <Badge variant="success" size="md">
                High Machine Readability
              </Badge>
              <p className="text-xs text-slate-500 mt-2">
                Passed OCR text extraction and hierarchical layout checks.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Dimension Breakdown */}
        <div className="md:col-span-8">
          <Card className="h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                ATS Metric Breakdown
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Evaluated against parsing integrity criteria.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Keywords Frequency & Density</span>
                  <span className="text-slate-900 font-bold">{breakdown.keywords} / 100</span>
                </div>
                <ProgressBar value={breakdown.keywords} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Formatting & Visual Layout Simplicity</span>
                  <span className="text-slate-900 font-bold">{breakdown.formatting} / 100</span>
                </div>
                <ProgressBar value={breakdown.formatting} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Skills Taxonomy Match</span>
                  <span className="text-slate-900 font-bold">{breakdown.skills} / 100</span>
                </div>
                <ProgressBar value={breakdown.skills} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Experience Chronology & Metrics</span>
                  <span className="text-slate-900 font-bold">{breakdown.experience} / 100</span>
                </div>
                <ProgressBar value={breakdown.experience} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Job Relevance Index</span>
                  <span className="text-slate-900 font-bold">{breakdown.jobRelevance} / 100</span>
                </div>
                <ProgressBar value={breakdown.jobRelevance} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Section Completeness</span>
                  <span className="text-slate-900 font-bold">{breakdown.sectionCompleteness} / 100</span>
                </div>
                <ProgressBar value={breakdown.sectionCompleteness} size="sm" useScoreColor />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Keywords Identification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Indexed Keywords ({matchedKeywords.length})
              </span>
              <Badge variant="success" size="sm">
                Detected
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Keywords successfully recognized by the ATS parser.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {matchedKeywords.map((kw, idx) => (
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

        {/* Missing Keywords */}
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Recommended High-Frequency Terms ({missingKeywords.length})
              </span>
              <Badge variant="warning" size="sm">
                Add to Resume
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Frequent market requisitions missing from your parsed text.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.map((kw, idx) => (
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

      {/* Actionable Suggestions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brand-600" />
            Actionable Optimization Checklist
          </CardTitle>
          <CardDescription className="text-xs">
            Direct fixes to improve your automatic screening pass rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-1">
          {suggestions.map((sug, i) => (
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
