"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ResumeAnalyzerPage() {
  const { user, resumeAnalysis, setResumeAnalysis } = useApp();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "extracted">("overview");

  // Load existing user resume if available
  useEffect(() => {
    if (!resumeAnalysis) {
      fetch("/api/resume/current")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.resume) {
            setResumeAnalysis(data.resume);
            setFileName(data.resume.fileName || "Uploaded_Resume.pdf");
          }
        })
        .catch(() => {});
    } else if (!fileName) {
      setFileName("Saved_Resume.pdf");
    }
  }, [resumeAnalysis, fileName, setResumeAnalysis]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = async (selectedFile: File) => {
    setErrorMsg(null);
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please upload a PDF format resume.");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Analysis failed");
      }

      const result = await res.json();
      setResumeAnalysis(result);
    } catch (err: any) {
      setErrorMsg("Failed to extract resume text. Please check the PDF format and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Resume Analyzer
            </h1>
            <Badge variant="success" size="sm">
              Functional
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Upload your resume in PDF format. Text is parsed on the server and saved permanently to your profile.
          </p>
        </div>
      </div>

      {/* Upload Zone Card */}
      <Card>
        <CardContent className="p-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive
                ? "border-brand-500 bg-brand-50/40"
                : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-white text-brand-600 border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-subtle">
              <UploadCloud className="w-6 h-6" />
            </div>

            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Drop your PDF resume here, or{" "}
              <label className="text-brand-600 hover:text-brand-700 cursor-pointer underline font-semibold">
                browse files
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Standard PDF files up to 10MB supported. Parsed text is securely stored to your database account.
            </p>

            {fileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-subtle">
                <FileText className="w-4 h-4 text-brand-600" />
                <span className="font-semibold">{fileName}</span>
                <span className="text-emerald-600">• Saved to Account</span>
              </div>
            )}

            {isUploading && (
              <div className="mt-4 max-w-xs mx-auto">
                <p className="text-xs text-brand-600 font-medium mb-1">
                  Parsing text & benchmarking competencies...
                </p>
                <ProgressBar value={75} size="sm" barClassName="animate-pulse bg-brand-600" />
              </div>
            )}

            {errorMsg && (
              <div className="mt-3 text-xs text-rose-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results View */}
      {resumeAnalysis ? (
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-brand-600 text-brand-700 font-semibold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Score & Evaluation Breakdown
            </button>
            <button
              onClick={() => setActiveTab("extracted")}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === "extracted"
                  ? "border-brand-600 text-brand-700 font-semibold"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Extracted Entities & Credentials
            </button>
          </div>

          {activeTab === "overview" ? (
            <>
              {/* Score Breakdown Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <Card className="h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white to-slate-50/50">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Overall Resume Score
                    </span>
                    <div className="my-4">
                      <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold text-slate-900">
                          {resumeAnalysis.overallScore}
                        </span>
                        <span className="text-xs font-medium text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant="success" size="md">
                        {resumeAnalysis.overallScore >= 75 ? "Competitive Profile" : "Developing Profile"}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-2">
                        Benchmark score for {user?.targetRole || "target role"}.
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="md:col-span-8">
                  <Card className="h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base mb-1">
                        Evaluation Dimensions
                      </h3>
                      <p className="text-xs text-slate-500 mb-5">
                        Breakdown across key recruiter evaluation dimensions.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">Skills Coverage</span>
                          <span className="text-slate-900 font-bold">{resumeAnalysis.breakdown.skills} / 100</span>
                        </div>
                        <ProgressBar value={resumeAnalysis.breakdown.skills} size="sm" useScoreColor />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">Experience Impact & Depth</span>
                          <span className="text-slate-900 font-bold">{resumeAnalysis.breakdown.experience} / 100</span>
                        </div>
                        <ProgressBar value={resumeAnalysis.breakdown.experience} size="sm" useScoreColor />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">Projects Complexity</span>
                          <span className="text-slate-900 font-bold">{resumeAnalysis.breakdown.projects} / 100</span>
                        </div>
                        <ProgressBar value={resumeAnalysis.breakdown.projects} size="sm" useScoreColor />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">Formatting & Layout Simplicity</span>
                          <span className="text-slate-900 font-bold">{resumeAnalysis.breakdown.formatting} / 100</span>
                        </div>
                        <ProgressBar value={resumeAnalysis.breakdown.formatting} size="sm" useScoreColor />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">Role-Specific Keywords</span>
                          <span className="text-slate-900 font-bold">{resumeAnalysis.breakdown.keywords} / 100</span>
                        </div>
                        <ProgressBar value={resumeAnalysis.breakdown.keywords} size="sm" useScoreColor />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-emerald-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Key Strengths
                    </CardTitle>
                    <CardDescription>
                      Attributes that stand out to technical screeners.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5 pt-2">
                    {resumeAnalysis.strengths.map((str, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-amber-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      Recommended Improvements
                    </CardTitle>
                    <CardDescription>
                      Actionable changes to increase interview shortlisting.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5 pt-2">
                    {resumeAnalysis.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            /* Extracted Entities View */
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {resumeAnalysis.parsedData.name || user?.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Extracted from uploaded resume PDF
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      {resumeAnalysis.parsedData.contact.email && (
                        <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {resumeAnalysis.parsedData.contact.email}
                        </span>
                      )}
                      {resumeAnalysis.parsedData.contact.phone && (
                        <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          {resumeAnalysis.parsedData.contact.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Extracted Skills ({resumeAnalysis.parsedData.skills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeAnalysis.parsedData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience and Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Briefcase className="w-4 h-4 text-brand-600" />
                      Experience Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-1 text-xs">
                    {resumeAnalysis.parsedData.experience?.map((exp, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-2.5 last:border-0">
                        <strong className="text-slate-900 block text-sm">{exp.role}</strong>
                        <span className="text-brand-700 block font-medium">{exp.company}</span>
                        <ul className="mt-1 space-y-1 text-slate-600">
                          {exp.description.map((b, bi) => (
                            <li key={bi}>• {b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GraduationCap className="w-4 h-4 text-brand-600" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-1 text-xs">
                    {resumeAnalysis.parsedData.education?.map((edu, idx) => (
                      <div key={idx}>
                        <strong className="text-slate-900 block text-sm">{edu.institution}</strong>
                        <span className="text-slate-600 block">{edu.degree} in {edu.field}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="text-center p-8 border-dashed border-slate-300">
          <p className="text-sm font-semibold text-slate-700">No resume analyzed yet.</p>
          <p className="text-xs text-slate-500 mt-1">Upload your PDF resume above to compute scores and view recommendations.</p>
        </Card>
      )}
    </div>
  );
}
