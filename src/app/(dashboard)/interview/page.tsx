"use client";

import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { ScoreCard } from "../../../components/ui/ScoreCard";
import {
  Bot,
  User,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Award,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { RoleType, AnswerEvaluation } from "../../../types";

export default function InterviewPage() {
  const {
    user,
    interviewSession,
    startInterview,
    submitInterviewAnswer,
    nextInterviewQuestion,
    resetInterview,
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<RoleType>(interviewSession.role);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [activeEvaluation, setActiveEvaluation] = useState<AnswerEvaluation | null>(null);

  const {
    isActive,
    isComplete,
    currentQuestionIndex,
    questions,
    history,
    summary,
    isEvaluating,
  } = interviewSession;

  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const handleStart = () => {
    startInterview(selectedRole);
    setActiveEvaluation(null);
    setCandidateAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateAnswer.trim() || isEvaluating) return;

    const evaluation = await submitInterviewAnswer(candidateAnswer);
    setActiveEvaluation(evaluation);
  };

  const handleNext = () => {
    setActiveEvaluation(null);
    setCandidateAnswer("");
    nextInterviewQuestion();
  };

  const handleUseSampleAnswer = () => {
    if (currentQuestion.type === "technical") {
      setCandidateAnswer(
        "A process is an independent execution unit with its own dedicated memory space, whereas a thread is a lightweight execution path within a process that shares memory and resources with other threads. Race conditions happen when multiple threads access shared state concurrently and at least one modifies it without synchronization. We resolve this in Python using locks, threading primitives, or atomic operations."
      );
    } else if (currentQuestion.type === "behavioral") {
      setCandidateAnswer(
        "In my previous project at Apex Labs, our team debated whether to use FastAPI or Django for our new microservice. The lead favored Django for its built-in admin, but I created a benchmark showing FastAPI provided 3x lower latency and automatic OpenAPI generation. We reviewed the numbers collaboratively, agreed on FastAPI, and met our sprint latency target of sub-120ms."
      );
    } else {
      setCandidateAnswer(
        "First, I would inspect our monitoring dashboards (Datadog/Prometheus) to isolate whether the 5x latency spike is driven by CPU exhaustion, database connection pools, or an external third-party API. Next, I would examine distributed tracing logs to find the slowest spans. If it's a database deadlock or query contention, I would enable caching or spin up read replicas."
      );
    }
  };

  // If session is complete, render Final Interview Summary
  if (isComplete && summary) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center py-6 bg-white rounded-xl border border-slate-200 shadow-subtle p-8">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Interview Assessment Complete
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Role: <strong>{selectedRole}</strong> • {history.length} Questions Evaluated
          </p>
        </div>

        {/* 4 Score Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScoreCard
            title="Technical Knowledge"
            score={summary.technicalKnowledge}
            suffix="%"
            subtitle="Architectural & domain depth"
          />
          <ScoreCard
            title="Communication"
            score={summary.communication}
            suffix="%"
            subtitle="Clarity & structure"
          />
          <ScoreCard
            title="Problem Solving"
            score={summary.problemSolving}
            suffix="%"
            subtitle="Structured reasoning"
          />
          <ScoreCard
            title="Overall Score"
            score={summary.overall}
            suffix="%"
            trend="+5% vs cohort"
            subtitle="Weighted performance"
          />
        </div>

        {/* Feedback Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Demonstrated Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-1">
              {summary.strengths.map((str, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-brand-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-1">
              {summary.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Button to Start Again */}
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" size="md" onClick={resetInterview}>
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Restart Interview Session
          </Button>
          <Button variant="primary" size="md" onClick={() => startInterview(selectedRole)}>
            Take Another Track
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    );
  }

  // If not started yet, render Setup Screen
  if (!isActive) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Mock Interviewer
            </h1>
            <Badge variant="success" size="sm">
              Functional
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Simulate realistic technical and behavioral interview rounds with automated rubric grading across 5 competency dimensions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configure Interview Session</CardTitle>
            <CardDescription>
              Select your target engineering specialty to configure role-aligned questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Target Role Track:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Software Engineer",
                  "Backend Developer",
                  "Frontend Developer",
                  "Data Analyst",
                  "Data Scientist",
                ].map((roleName) => (
                  <button
                    key={roleName}
                    type="button"
                    onClick={() => setSelectedRole(roleName as RoleType)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedRole === roleName
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">
                      {roleName}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Technical + Behavioral Focus
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <strong className="block text-slate-800 font-semibold">
                Evaluation Rubric Standards:
              </strong>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600">
                <span>• Relevance (0-100%)</span>
                <span>• Technical Depth (0-100%)</span>
                <span>• Clarity (0-100%)</span>
                <span>• Communication (0-100%)</span>
                <span>• Confidence Indicators</span>
                <span>• Actionable Feedback</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStart}
                className="font-semibold shadow-subtle"
              >
                Begin Interview Session
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active Interview Screen: 2-column layout (Left: Candidate & Progress, Right: AI Conversation)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              AI Mock Interview
            </h1>
            <Badge variant="default" size="sm">
              Session In Progress
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Role: <strong>{selectedRole}</strong> • Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <Button variant="ghost" size="sm" onClick={resetInterview} className="text-xs self-start sm:self-auto">
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          End Session
        </Button>
      </div>

      {/* Main 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Candidate Information & Progress */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-600" />
                Candidate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Name:</span>
                <span className="font-semibold text-slate-900">{user.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Target Role:</span>
                <span className="font-semibold text-slate-900">{selectedRole}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Experience:</span>
                <span className="font-semibold text-slate-900">{user.experienceYears} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Track Type:</span>
                <span className="font-semibold text-slate-900">{user.preferredInterviewType}</span>
              </div>
            </CardContent>
          </Card>

          {/* Interview Progress Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-900">
                Session Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
                </div>
                <ProgressBar
                  value={(currentQuestionIndex / questions.length) * 100}
                  size="sm"
                />
              </div>

              {/* Question list steps */}
              <div className="space-y-2 pt-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isDone = idx < currentQuestionIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                        isCurrent
                          ? "bg-brand-50/70 border-brand-200 text-brand-900 font-semibold"
                          : isDone
                          ? "bg-slate-50 border-slate-200 text-slate-700"
                          : "bg-white border-slate-100 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border bg-white flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{q.targetCompetency}</span>
                      </div>
                      <Badge
                        variant={isCurrent ? "default" : isDone ? "success" : "neutral"}
                        size="sm"
                      >
                        {q.type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: AI Interviewer Conversation & Answer Box */}
        <div className="lg:col-span-8 space-y-4">
          {/* AI Question Prompt Card */}
          <Card className="border-l-4 border-l-brand-600 shadow-subtle">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      AI Interviewer
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Targeting: {currentQuestion.targetCompetency}
                    </span>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">
                  {currentQuestion.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                &ldquo;{currentQuestion.question}&rdquo;
              </p>

              {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 mr-1">Guidance hints:</span>
                  {currentQuestion.hints.join(" • ")}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Candidate Answer & Evaluation Form */}
          {!activeEvaluation ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Your Response
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUseSampleAnswer}
                    className="text-xs text-brand-600 hover:text-brand-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Fill Sample Answer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    rows={6}
                    required
                    value={candidateAnswer}
                    onChange={(e) => setCandidateAnswer(e.target.value)}
                    placeholder="Structure your answer with context, methodology, trade-offs, and measurable outcomes..."
                    className="w-full px-3.5 py-3 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 leading-relaxed bg-white"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {candidateAnswer.split(/\s+/).filter(Boolean).length} words entered
                    </span>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isEvaluating}
                      disabled={!candidateAnswer.trim()}
                      className="font-semibold shadow-subtle"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Submit Answer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Active Answer Evaluation Result */
            <Card className="border-t-4 border-t-emerald-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    AI Evaluation Rubric & Feedback
                  </CardTitle>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500">Answer Score:</span>
                    <Badge variant="success" size="md" className="font-bold">
                      {activeEvaluation.overallScore} / 100
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-1">
                {/* 5-Dimension Rubric Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      Relevance
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {activeEvaluation.relevance}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      Tech Depth
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {activeEvaluation.technicalDepth}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      Clarity
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {activeEvaluation.clarity}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      Communication
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {activeEvaluation.communication}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      Confidence
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {activeEvaluation.confidence}%
                    </span>
                  </div>
                </div>

                {/* Qualitative Feedback */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">Evaluator Notes:</strong>
                  {activeEvaluation.feedback}
                </div>

                {/* Strengths and Tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <strong className="text-emerald-900 block mb-1">Observed Strengths:</strong>
                    <ul className="space-y-1 text-emerald-800">
                      {activeEvaluation.strengthsObserved.map((s, idx) => (
                        <li key={idx}>✓ {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <strong className="text-amber-900 block mb-1">Key Improvement Tips:</strong>
                    <ul className="space-y-1 text-amber-800">
                      {activeEvaluation.improvementTips.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Next Question CTA */}
                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="md" onClick={handleNext} className="font-semibold shadow-subtle">
                    {currentQuestionIndex + 1 >= questions.length ? (
                      <>
                        Finish & View Summary
                        <Award className="w-4 h-4 ml-1.5" />
                      </>
                    ) : (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
