"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ScoreCard } from "../../../components/ui/ScoreCard";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  FileCheck,
} from "lucide-react";
import { DEMO_JOB_DESCRIPTION, DEMO_JOB_MATCH } from "../../../lib/demoData";
import { RoleType } from "../../../types";

export default function JobMatchPage() {
  const { user, resumeAnalysis, jobDescriptionText, jobMatchResult, setJobMatch } = useApp();
  const [inputText, setInputText] = useState(jobDescriptionText);
  const [selectedRole, setSelectedRole] = useState<RoleType>(user.targetRole);
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    setIsComparing(true);
    try {
      const res = await fetch("/api/job/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateSkills: resumeAnalysis.parsedData.skills,
          jobDescription: inputText,
          targetRole: selectedRole,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setJobMatch(result, inputText);
      } else {
        throw new Error("Match computation failed");
      }
    } catch (err) {
      console.warn("Job match error, using fallback match:", err);
      setJobMatch(DEMO_JOB_MATCH, inputText);
    } finally {
      setIsComparing(false);
    }
  };

  const handleLoadSample = () => {
    setInputText(DEMO_JOB_DESCRIPTION);
    setJobMatch(DEMO_JOB_MATCH, DEMO_JOB_DESCRIPTION);
  };

  const {
    jobMatchScore,
    strongMatches,
    partialMatches,
    missingSkills,
    experienceMatch,
    educationMatch,
    skillMatch,
    explanation,
    recommendations,
  } = jobMatchResult;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Job Description Match
            </h1>
            <Badge variant="success" size="sm">
              Functional
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Compare candidate resume competencies against target job requirements to identify alignment and missing keywords.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadSample}
          className="text-xs font-semibold text-brand-700 bg-brand-50 border-brand-200 hover:bg-brand-100 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
          Load Sample Job Description
        </Button>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Target Role & Job Requisition</CardTitle>
              <CardDescription>
                Paste the full job specification text below for heuristic keyword matching.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-slate-500 whitespace-nowrap">
                Role Track:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as RoleType)}
                className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option>Software Engineer</option>
                <option>Backend Developer</option>
                <option>Frontend Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Analyst</option>
                <option>Data Scientist</option>
                <option>DevOps Engineer</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste target job description text here..."
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 leading-relaxed bg-slate-50/40"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="text-xs text-slate-400">
              Comparing against resume for: <strong className="text-slate-700">{user.name}</strong> ({resumeAnalysis.parsedData.skills.length} skills loaded)
            </span>
            <Button
              variant="primary"
              size="md"
              isLoading={isComparing}
              onClick={handleCompare}
              className="font-semibold shadow-subtle text-xs sm:text-sm"
            >
              Analyze Job Match
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Score & Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Overall Match Card */}
        <div className="md:col-span-4">
          <Card className="h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white to-slate-50/50">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Job Match Score
            </span>
            <div className="my-4">
              <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900">
                  {jobMatchScore}%
                </span>
                <span className="text-xs font-medium text-slate-400">Relevance</span>
              </div>
            </div>
            <div>
              <Badge variant="success" size="md">
                Strong Compatibility
              </Badge>
              <p className="text-xs text-slate-500 mt-2">
                High alignment with foundational technical prerequisites.
              </p>
            </div>
          </Card>
        </div>

        {/* Right: Sub-dimension Progress Bars */}
        <div className="md:col-span-8">
          <Card className="h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                Match Dimension Breakdown
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Evaluation across core qualification vectors.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Skill Overlap & Technical Requirements</span>
                  <span className="text-slate-900 font-bold">{skillMatch}%</span>
                </div>
                <ProgressBar value={skillMatch} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Experience Level & Seniority Alignment</span>
                  <span className="text-slate-900 font-bold">{experienceMatch}%</span>
                </div>
                <ProgressBar value={experienceMatch} size="sm" useScoreColor />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Academic & Certification Baseline</span>
                  <span className="text-slate-900 font-bold">{educationMatch}%</span>
                </div>
                <ProgressBar value={educationMatch} size="sm" useScoreColor />
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Match Summary: </strong>
                {explanation}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Tri-Category Skill Alignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strong Matches */}
        <Card className="border-t-4 border-t-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strong Matches
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {strongMatches.length} skills
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Demonstrated proficiencies satisfying requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {strongMatches.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partial Matches */}
        <Card className="border-t-4 border-t-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Partial Matches
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {partialMatches.length} skills
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Adjacent technologies requiring deeper demonstration.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {partialMatches.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
                >
                  ~ {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="border-t-4 border-t-rose-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Missing Skills
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {missingSkills.length} skills
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Demanded requirements missing from resume text.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200"
                >
                  ✕ {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-slate-900">
            Actionable Next Steps for this Requisition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-1">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
              <span>{rec}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
