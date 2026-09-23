"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  UserProfile,
  ResumeAnalysisResult,
  JobMatchResult,
  AtsScoreResult,
  InterviewQuestion,
  QuestionAnswerPair,
  InterviewSummary,
  RoleType,
  AnswerEvaluation,
} from "../types";
import { DEMO_INTERVIEW_QUESTIONS } from "../lib/demoData";

interface InterviewSessionState {
  role: RoleType;
  isActive: boolean;
  isComplete: boolean;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  history: QuestionAnswerPair[];
  summary?: InterviewSummary;
  isEvaluating: boolean;
}

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  resumeAnalysis: ResumeAnalysisResult | null;
  jobDescriptionText: string;
  jobMatchResult: JobMatchResult | null;
  atsScoreResult: AtsScoreResult | null;
  interviewSession: InterviewSessionState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
    targetRole?: RoleType
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setResumeAnalysis: (result: ResumeAnalysisResult) => void;
  setJobMatch: (result: JobMatchResult, text: string) => void;
  setAtsScore: (result: AtsScoreResult) => void;
  startInterview: (role: RoleType) => void;
  submitInterviewAnswer: (answer: string) => Promise<AnswerEvaluation>;
  nextInterviewQuestion: () => void;
  resetInterview: () => void;
  updateUser: (updates: Partial<UserProfile>) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumeAnalysis, setResumeAnalysisState] = useState<ResumeAnalysisResult | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>("");
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);
  const [atsScoreResult, setAtsScoreResult] = useState<AtsScoreResult | null>(null);

  const [interviewSession, setInterviewSession] = useState<InterviewSessionState>({
    role: "Software Engineer",
    isActive: false,
    isComplete: false,
    currentQuestionIndex: 0,
    questions: DEMO_INTERVIEW_QUESTIONS,
    history: [],
    summary: undefined,
    isEvaluating: false,
  });

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          if (data.resume) {
            setResumeAnalysisState({
              overallScore: data.resume.overallScore,
              breakdown: data.resume.breakdown,
              strengths: data.resume.strengths,
              improvements: data.resume.improvements,
              parsedData: data.resume.parsedData,
            });
          }
          if (data.jobMatch) {
            setJobMatchResult(data.jobMatch);
            if (data.jobMatch.jobDescription) {
              setJobDescriptionText(data.jobMatch.jobDescription);
            }
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Auth check error:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      setUser(data.user);
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: "Network error during login" };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    targetRole?: RoleType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, targetRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Sign up failed" };
      }

      setUser(data.user);
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: "Network error during sign up" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setUser(null);
      setResumeAnalysisState(null);
      setJobMatchResult(null);
      setAtsScoreResult(null);
      router.push("/login");
    }
  };

  const setResumeAnalysis = (result: ResumeAnalysisResult) => {
    setResumeAnalysisState(result);
  };

  const setJobMatch = (result: JobMatchResult, text: string) => {
    setJobDescriptionText(text);
    setJobMatchResult(result);
  };

  const setAtsScore = (result: AtsScoreResult) => {
    setAtsScoreResult(result);
  };

  const startInterview = (role: RoleType) => {
    const questionsForRole = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.role === role);
    const activeQuestions = questionsForRole.length > 0 ? questionsForRole : DEMO_INTERVIEW_QUESTIONS;

    setInterviewSession({
      role,
      isActive: true,
      isComplete: false,
      currentQuestionIndex: 0,
      questions: activeQuestions,
      history: [],
      summary: undefined,
      isEvaluating: false,
    });
  };

  const submitInterviewAnswer = async (answer: string): Promise<AnswerEvaluation> => {
    setInterviewSession((prev) => ({ ...prev, isEvaluating: true }));

    const currentQ = interviewSession.questions[interviewSession.currentQuestionIndex];

    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ,
          answer,
          role: interviewSession.role,
        }),
      });

      let evaluation: AnswerEvaluation;
      if (res.ok) {
        evaluation = await res.json();
      } else {
        throw new Error("Evaluation request failed");
      }

      setInterviewSession((prev) => {
        const newHistory = [
          ...prev.history,
          {
            question: currentQ,
            candidateAnswer: answer,
            evaluation,
          },
        ];

        return {
          ...prev,
          history: newHistory,
          isEvaluating: false,
        };
      });

      return evaluation;
    } catch (err) {
      console.warn("Using fallback evaluation:", err);
      const fallbackEval: AnswerEvaluation = {
        relevance: 78,
        technicalDepth: 74,
        clarity: 80,
        communication: 76,
        confidence: 75,
        overallScore: 77,
        feedback: "Solid answer with clear structural explanation. Provide more quantifiable metrics and trade-offs.",
        strengthsObserved: ["Direct answer to question", "Logical reasoning flow"],
        improvementTips: ["Cite concrete metrics and benchmarks", "Discuss alternative design trade-offs"],
      };

      setInterviewSession((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            question: currentQ,
            candidateAnswer: answer,
            evaluation: fallbackEval,
          },
        ],
        isEvaluating: false,
      }));

      return fallbackEval;
    }
  };

  const nextInterviewQuestion = async () => {
    const nextIndex = interviewSession.currentQuestionIndex + 1;
    if (nextIndex >= interviewSession.questions.length) {
      // Complete interview
      const avgTech = Math.round(
        interviewSession.history.reduce((acc, h) => acc + (h.evaluation?.technicalDepth || 75), 0) /
          (interviewSession.history.length || 1)
      );
      const avgComm = Math.round(
        interviewSession.history.reduce((acc, h) => acc + (h.evaluation?.communication || 75), 0) /
          (interviewSession.history.length || 1)
      );
      const avgOverall = Math.round(
        interviewSession.history.reduce((acc, h) => acc + (h.evaluation?.overallScore || 75), 0) /
          (interviewSession.history.length || 1)
      );

      const summaryObj: InterviewSummary = {
        technicalKnowledge: avgTech,
        communication: avgComm,
        problemSolving: Math.round((avgTech + avgOverall) / 2),
        overall: avgOverall,
        feedback: [
          "Demonstrated structured explanation of core engineering concepts.",
          "Maintained professional delivery and logical problem-solving flow.",
          "Continue refining time-to-solution on complex architectural questions.",
        ],
        strengths: [
          "Good clarity and domain terminology.",
          "Systematic approach to technical interview questions.",
        ],
        nextSteps: [
          "Review distributed system trade-offs.",
          "Practice quantitative behavioral STAR answers.",
        ],
      };

      setInterviewSession((prev) => ({
        ...prev,
        isComplete: true,
        isActive: false,
        summary: summaryObj,
      }));

      // Save to database
      try {
        await fetch("/api/interview/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: interviewSession.role,
            overallScore: avgOverall,
            summary: summaryObj,
            history: interviewSession.history,
          }),
        });
      } catch (err) {
        console.warn("Failed to persist interview:", err);
      }
    } else {
      setInterviewSession((prev) => ({
        ...prev,
        currentQuestionIndex: nextIndex,
      }));
    }
  };

  const resetInterview = () => {
    setInterviewSession({
      role: user?.targetRole || "Software Engineer",
      isActive: false,
      isComplete: false,
      currentQuestionIndex: 0,
      questions: DEMO_INTERVIEW_QUESTIONS,
      history: [],
      summary: undefined,
      isEvaluating: false,
    });
  };

  const updateUser = async (updates: Partial<UserProfile>): Promise<boolean> => {
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        resumeAnalysis,
        jobDescriptionText,
        jobMatchResult,
        atsScoreResult,
        interviewSession,
        login,
        signup,
        logout,
        refreshUser,
        setResumeAnalysis,
        setJobMatch,
        setAtsScore,
        startInterview,
        submitInterviewAnswer,
        nextInterviewQuestion,
        resetInterview,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
