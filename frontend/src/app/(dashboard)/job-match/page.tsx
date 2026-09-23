"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { RoleType } from "../../../types";

export default function JobMatchPage() {
  const { user, resumeAnalysis, jobDescriptionText, jobMatchResult, setJobMatch } = useApp();
  const [inputText, setInputText] = useState(jobDescriptionText);
  const [selectedRole, setSelectedRole] = useState<RoleType>(user?.targetRole || "Software Engineer");
  const [isComparing, setIsComparing] = useState(false);

  // Load existing match from DB if available
  useEffect(() => {
    if (!jobMatchResult) {
      fetch("/api/job/current")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.jobMatch) {
            setJobMatch(data.jobMatch, data.jobMatch.jobDescription || "");
            setInputText(data.jobMatch.jobDescription || "");
          }
        })
        .catch(() => {});
    }
  }, [jobMatchResult, setJobMatch]);

  const handleCompare = async () => {
    if (!inputText.trim()) return;
    setIsComparing(true);
    try {
      const skills = resumeAnalysis?.parsedData?.skills || user?.skills || [];
      const res = await fetch("/api/job/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateSkills: skills,
          jobDescription: inputText,
          targetRole: selectedRole,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setJobMatch(result, inputText);
      }
    } catch (err) {
      console.warn("Job match error:", err);
    } finally {
      setIsComparing(false);
    }
  };

  const handleLoadSample = () => {
    const sample = `Title: Software Engineer (Backend)\nCompany: Modern Scale Tech\nResponsibilities:\n• Build scalable backend services in Python and SQL.\n• Design REST APIs and manage relational database schemas in PostgreSQL.\n• Implement CI/CD deployment pipelines using Git and Docker.\n• Architect cloud infrastructure on AWS and container orchestration with Kubernetes.\n• Participate in System Design and microservices architecture reviews.`;
    setInputText(sample);
  };

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
            Paste target job requirements to compare against your uploaded resume skills. Results are saved to your account.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadSample}
          className="text-xs font-semibold self-start sm:self-auto"
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
              <CardTitle>Job Specification</CardTitle>
              <CardDescription>
                Paste the job requirements to calculate your match score.
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
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste target job description text here..."
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 leading-relaxed bg-slate-50/40"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="text-xs text-slate-400">
              Matching against {resumeAnalysis?.parsedData?.skills?.length || user?.skills?.length || 0} skills from your profile
            </span>
            <Button
              variant="primary"
              size="md"
              isLoading={isComparing}
              disabled={!inputText.trim()}
              onClick={handleCompare}
              className="font-semibold shadow-subtle text-xs sm:text-sm"
            >
              Analyze Job Match
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {jobMatchResult ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card className="h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white to-slate-50/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Job Match Score
                </span>
                <div className="my-4">
                  <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {jobMatchResult.jobMatchScore}%
                    </span>
                    <span className="text-xs font-medium text-slate-400">Compatibility</span>
                  </div>
                </div>
                <Badge variant="success" size="md">
                  Saved to Account
                </Badge>
              </Card>
            </div>

            <div className="md:col-span-8">
              <Card className="h-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base mb-1">
                    Dimension Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Compatibility across qualification dimensions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Skill Overlap</span>
                      <span className="text-slate-900 font-bold">{jobMatchResult.skillMatch}%</span>
                    </div>
                    <ProgressBar value={jobMatchResult.skillMatch} size="sm" useScoreColor />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Experience Alignment</span>
                      <span className="text-slate-900 font-bold">{jobMatchResult.experienceMatch}%</span>
                    </div>
                    <ProgressBar value={jobMatchResult.experienceMatch} size="sm" useScoreColor />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">Education Baseline</span>
                      <span className="text-slate-900 font-bold">{jobMatchResult.educationMatch}%</span>
                    </div>
                    <ProgressBar value={jobMatchResult.educationMatch} size="sm" useScoreColor />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Match Summary: </strong>
                    {jobMatchResult.explanation}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Strong / Partial / Missing Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-emerald-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Strong Matches ({jobMatchResult.strongMatches?.length || 0})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {jobMatchResult.strongMatches?.map((s, i) => (
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

            <Card className="border-t-4 border-t-amber-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Partial Matches ({jobMatchResult.partialMatches?.length || 0})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {jobMatchResult.partialMatches?.map((s, i) => (
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

            <Card className="border-t-4 border-t-rose-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Missing Skills ({jobMatchResult.missingSkills?.length || 0})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {jobMatchResult.missingSkills?.map((s, i) => (
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
        </div>
      ) : (
        <Card className="text-center p-8 border-dashed border-slate-300">
          <p className="text-sm font-semibold text-slate-700">No job matched yet.</p>
          <p className="text-xs text-slate-500 mt-1">Paste a job specification above and click "Analyze Job Match" to compute compatibility.</p>
        </Card>
      )}
    </div>
  );
}
