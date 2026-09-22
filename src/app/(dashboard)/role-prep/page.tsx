"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  Compass,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Award,
  Milestone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { RoleType } from "../../../types";

interface RoleTrackData {
  title: RoleType;
  requiredSkills: string[];
  commonTopics: string[];
  recommendedQuestions: string[];
  recommendedAssessments: string[];
  learningPathSummary: string;
}

const ROLE_DATA: Record<RoleType, RoleTrackData> = {
  "Software Engineer": {
    title: "Software Engineer",
    requiredSkills: ["Python or Java", "Data Structures & Algorithms", "SQL & Relational DBs", "Git", "REST APIs", "System Design"],
    commonTopics: ["Time & Space Complexity", "Concurrency & Threading", "Database Indexing", "OOP Principles", "Microservices"],
    recommendedQuestions: [
      "Explain the difference between a process and thread.",
      "Design an LRU Cache with O(1) operations.",
      "How would you optimize a slow database query with millions of records?",
    ],
    recommendedAssessments: ["General Software Engineering Diagnostics (60 min)", "Data Structures Core Benchmark (45 min)"],
    learningPathSummary: "Foundations → Object-Oriented Patterns → Algorithms → Database Internals → High-Throughput APIs → System Design.",
  },
  "Backend Developer": {
    title: "Backend Developer",
    requiredSkills: ["Python / Go / Java", "FastAPI / Spring / Express", "PostgreSQL & Redis", "Docker", "REST & gRPC", "System Design"],
    commonTopics: ["ACID vs BASE", "Cache Invalidation & Thundering Herd", "API Rate Limiting", "Message Brokers (Kafka)", "Database Sharding"],
    recommendedQuestions: [
      "Design an API rate limiter service handling 50k req/sec.",
      "How does Redis ensure single-threaded concurrency safety?",
      "Explain connection pooling in high-concurrency databases.",
    ],
    recommendedAssessments: ["Backend Microservices Assessment (50 min)", "Relational Schema Design & Tuning (40 min)"],
    learningPathSummary: "Relational Modeling → REST Architecture → Caching & Async Workers → Containerization → Distributed Systems.",
  },
  "Frontend Developer": {
    title: "Frontend Developer",
    requiredSkills: ["JavaScript & TypeScript", "React / Next.js", "CSS3 / Tailwind", "HTML5 & Accessibility", "State Management", "Performance Optimization"],
    commonTopics: ["Virtual DOM Reconciliation", "Browser Rendering Pipeline & Repaint", "Core Web Vitals", "SSR vs CSR vs ISR", "WebSockets"],
    recommendedQuestions: [
      "Explain React useEffect dependency subtleties and stale closures.",
      "How do you optimize Largest Contentful Paint (LCP) for complex dashboards?",
      "Implement a custom debounce hook in TypeScript.",
    ],
    recommendedAssessments: ["React & Modern JavaScript Benchmark (45 min)", "Frontend Architecture & Web Vitals (40 min)"],
    learningPathSummary: "Modern ECMAScript → Component Design → State Architecture → Web Performance & Vitals → Next.js SSR.",
  },
  "Full Stack Developer": {
    title: "Full Stack Developer",
    requiredSkills: ["React / TypeScript", "Node.js / Python", "SQL & NoSQL", "Docker", "REST & GraphQL", "CI/CD Deployment"],
    commonTopics: ["End-to-End Type Safety", "Authentication (JWT vs Session Cookies)", "ORM vs Raw SQL", "Microfrontends", "Cloud Deployments"],
    recommendedQuestions: [
      "How do you secure JWT storage against XSS and CSRF attacks?",
      "Design an end-to-end real-time chat application with file uploads.",
      "Explain the trade-offs of GraphQL vs REST for mobile clients.",
    ],
    recommendedAssessments: ["Full Stack Integration Diagnostic (60 min)", "API & Client State Cohesion (45 min)"],
    learningPathSummary: "Frontend Core → Server Runtimes → Relational & Document Data → Cloud DevOps → Security Architecture.",
  },
  "Data Analyst": {
    title: "Data Analyst",
    requiredSkills: ["Advanced SQL", "Python (Pandas, NumPy)", "Tableau / PowerBI", "Statistical Modeling", "Excel", "Data Cleaning"],
    commonTopics: ["Window Functions & CTEs", "A/B Testing & P-Values", "Cohort Analysis", "Data Normalization", "Executive Storytelling"],
    recommendedQuestions: [
      "Write an SQL query using window functions to calculate 7-day rolling revenue.",
      "How do you detect and handle sample ratio mismatch (SRM) in an A/B test?",
      "Explain the difference between inner join, left join, and full outer join edge cases.",
    ],
    recommendedAssessments: ["Advanced SQL for Analytics (45 min)", "Exploratory Data Analysis Diagnostic (40 min)"],
    learningPathSummary: "Relational Queries → Python Data Wrangling → Business Intelligence Dashboards → Statistical Inference.",
  },
  "Data Scientist": {
    title: "Data Scientist",
    requiredSkills: ["Python (Scikit-Learn, PyTorch)", "Advanced Statistics", "SQL", "Feature Engineering", "Hypothesis Testing", "Machine Learning"],
    commonTopics: ["Bias-Variance Tradeoff", "Cross-Validation Strategies", "Precision vs Recall", "Gradient Descent Optimization", "ML in Production"],
    recommendedQuestions: [
      "How do you address extreme class imbalance in fraud detection datasets?",
      "Explain mathematical intuition behind XGBoost tree splitting.",
      "How do you detect covariate shift in deployed machine learning models?",
    ],
    recommendedAssessments: ["Applied Machine Learning Benchmark (60 min)", "Statistical Modeling & Math (50 min)"],
    learningPathSummary: "Linear Algebra & Probability → Classical ML → Deep Learning Foundations → Model Evaluation & Deployment.",
  },
  "Machine Learning Engineer": {
    title: "Machine Learning Engineer",
    requiredSkills: ["Python & C++", "PyTorch / TensorFlow", "MLOps (MLflow, Kubeflow)", "Docker & Kubernetes", "Model Quantization", "Cloud GPUs"],
    commonTopics: ["Distributed Training (DDP, FSDP)", "Latency vs Throughput in LLM Inference", "Feature Stores", "ONNX Export", "Vector Databases"],
    recommendedQuestions: [
      "How do you optimize LLM inference latency using KV-caching and quantization?",
      "Explain the architecture of a real-time recommendation system inference pipeline.",
      "How do you scale model training across multiple GPU nodes?",
    ],
    recommendedAssessments: ["ML Systems & Production Engineering (60 min)", "Deep Learning Optimization (50 min)"],
    learningPathSummary: "Deep Learning Foundations → Distributed Systems → Model Quantization & Serving → Kubernetes MLOps.",
  },
  "DevOps Engineer": {
    title: "DevOps Engineer",
    requiredSkills: ["Linux / Bash", "Docker & Kubernetes", "Terraform / IaC", "CI/CD (GitHub Actions)", "AWS / GCP", "Prometheus & Grafana"],
    commonTopics: ["Zero-Downtime Deployments (Blue/Green, Canary)", "Kubernetes Ingress & Service Meshes", "Infrastructure Drift Detection", "Secret Management", "Incident Response"],
    recommendedQuestions: [
      "How do you configure mutual TLS (mTLS) across microservices using a service mesh?",
      "Explain the reconcile loop in Kubernetes Custom Resource Definitions (CRDs).",
      "How would you troubleshoot a CrashLoopBackOff error in a pod?",
    ],
    recommendedAssessments: ["Kubernetes & Container Orchestration (50 min)", "Terraform & Cloud Infrastructure (45 min)"],
    learningPathSummary: "Linux Internals → Networking & Security → Container Orchestration → Infrastructure as Code → Observability.",
  },
};

export default function RolePrepPage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("Software Engineer");
  const track = ROLE_DATA[selectedRole];

  const roles: RoleType[] = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Role-Specific Preparation
            </h1>
            <Badge variant="coming-soon" size="sm">
              Personalized Track Generation — Coming Soon
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Standardized technical curriculum and question blueprints tailored for specialized engineering roles.
          </p>
        </div>
      </div>

      {/* Role Selection Horizontal Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 scrollbar-none">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRole === r
                ? "bg-brand-600 text-white shadow-subtle"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Role Curriculum Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Required Skills & Topics */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Required Industry Competencies
              </CardTitle>
              <CardDescription className="text-xs">
                Expected proficiencies for competitive candidacy in {track.title} positions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {track.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-600" />
                Common Interview Topics
              </CardTitle>
              <CardDescription className="text-xs">
                Core conceptual domains evaluated during live technical screens.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {track.commonTopics.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Recommended Questions, Assessments, & Learning Path */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                Recommended Practice Questions
              </CardTitle>
              <CardDescription className="text-xs">
                Essential questions frequently asked in tier-1 evaluations.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-2.5">
              {track.recommendedQuestions.map((q, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 font-medium">
                  &ldquo;{q}&rdquo;
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-600" />
                Recommended Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {track.recommendedAssessments.map((asmt, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800">{asmt}</span>
                  <Badge variant="coming-soon" size="sm">Coming Soon</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Milestone className="w-4 h-4 text-brand-600" />
                Curriculum Progression Path
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                {track.learningPathSummary}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
