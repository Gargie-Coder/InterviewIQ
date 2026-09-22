"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
import {
  DEMO_USER,
  DEMO_RESUME_ANALYSIS,
  DEMO_JOB_DESCRIPTION,
  DEMO_JOB_MATCH,
  DEMO_ATS_SCORE,
  DEMO_INTERVIEW_QUESTIONS,
  DEMO_INTERVIEW_SUMMARY,
} from "../lib/demoData";

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
  user: UserProfile;
  isDemoMode: boolean;
  resumeAnalysis: ResumeAnalysisResult;
  jobDescriptionText: string;
  jobMatchResult: JobMatchResult;
  atsScoreResult: AtsScoreResult;
  interviewSession: InterviewSessionState;
  loadDemoData: () => void;
  setResumeAnalysis: (result: ResumeAnalysisResult) => void;
  setJobMatch: (result: JobMatchResult, text: string) => void;
  setAtsScore: (result: AtsScoreResult) => void;
  startInterview: (role: RoleType) => void;
  submitInterviewAnswer: (answer: string) => Promise<AnswerEvaluation>;
  nextInterviewQuestion: () => void;
  resetInterview: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEMO_USER);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [resumeAnalysis, setResumeAnalysisState] = useState<ResumeAnalysisResult>(DEMO_RESUME_ANALYSIS);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>(DEMO_JOB_DESCRIPTION);
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult>(DEMO_JOB_MATCH);
  const [atsScoreResult, setAtsScoreResult] = useState<AtsScoreResult>(DEMO_ATS_SCORE);

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

  const loadDemoData = () => {
    setUser(DEMO_USER);
    setIsDemoMode(true);
    setResumeAnalysisState(DEMO_RESUME_ANALYSIS);
    setJobDescriptionText(DEMO_JOB_DESCRIPTION);
    setJobMatchResult(DEMO_JOB_MATCH);
    setAtsScoreResult(DEMO_ATS_SCORE);
    setInterviewSession({
      role: "Software Engineer",
      isActive: false,
      isComplete: false,
      currentQuestionIndex: 0,
      questions: DEMO_INTERVIEW_QUESTIONS,
      history: [],
      summary: undefined,
      isEvaluating: false,
    });
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
      // Fallback evaluation
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

  const nextInterviewQuestion = () => {
    setInterviewSession((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      if (nextIndex >= prev.questions.length) {
        // Complete interview
        const avgTech = Math.round(
          prev.history.reduce((acc, h) => acc + (h.evaluation?.technicalDepth || 75), 0) /
            (prev.history.length || 1)
        );
        const avgComm = Math.round(
          prev.history.reduce((acc, h) => acc + (h.evaluation?.communication || 75), 0) /
            (prev.history.length || 1)
        );
        const avgOverall = Math.round(
          prev.history.reduce((acc, h) => acc + (h.evaluation?.overallScore || 75), 0) /
            (prev.history.length || 1)
        );

        return {
          ...prev,
          isComplete: true,
          isActive: false,
          summary: {
            technicalKnowledge: avgTech,
            communication: avgComm,
            problemSolving: Math.round((avgTech + avgOverall) / 2),
            overall: avgOverall,
            feedback: [
              "Consistently articulated technical points with structured communication.",
              "Maintained good confidence and addressed trade-offs when prompted.",
              "Can sharpen time-to-answer on algorithmic complexity questions.",
            ],
            strengths: [
              "High clarity and professional delivery.",
              "Strong fundamental grasp of data and systems architecture.",
            ],
            nextSteps: [
              "Practice 2 System Design mock sessions.",
              "Re-evaluate concurrency pitfalls in production scenarios.",
            ],
          },
        };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  const resetInterview = () => {
    setInterviewSession({
      role: user.targetRole,
      isActive: false,
      isComplete: false,
      currentQuestionIndex: 0,
      questions: DEMO_INTERVIEW_QUESTIONS,
      history: [],
      summary: undefined,
      isEvaluating: false,
    });
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isDemoMode,
        resumeAnalysis,
        jobDescriptionText,
        jobMatchResult,
        atsScoreResult,
        interviewSession,
        loadDemoData,
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
