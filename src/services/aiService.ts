import { AnswerEvaluation, InterviewQuestion, RoleType } from "../types";

export interface IAiService {
  evaluateInterviewAnswer(
    question: InterviewQuestion,
    answer: string,
    role: RoleType
  ): Promise<AnswerEvaluation>;
  analyzeResumeText(text: string): Promise<{
    score: number;
    strengths: string[];
    improvements: string[];
  }>;
}

export class AiService implements IAiService {
  private geminiKey?: string;
  private openAiKey?: string;

  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.openAiKey = process.env.OPENAI_API_KEY;
  }

  public isLiveAiAvailable(): boolean {
    return Boolean(this.geminiKey || this.openAiKey);
  }

  public async evaluateInterviewAnswer(
    question: InterviewQuestion,
    answer: string,
    role: RoleType
  ): Promise<AnswerEvaluation> {
    const trimmed = answer.trim();

    // Check for trivial or empty response
    if (trimmed.length < 15) {
      return {
        relevance: 25,
        technicalDepth: 20,
        clarity: 35,
        communication: 30,
        confidence: 25,
        overallScore: 27,
        feedback:
          "The provided response is very brief. In technical interviews, provide concrete examples, architectural context, and rationale.",
        strengthsObserved: ["Attempted response"],
        improvementTips: [
          "Elaborate on specific technologies or frameworks used.",
          "Structure your response with problem context, chosen solution, and outcome.",
        ],
      };
    }

    // If an external key is available, call live provider (Gemini or OpenAI)
    if (this.geminiKey) {
      try {
        return await this.evaluateWithGemini(question, trimmed, role);
      } catch (err) {
        console.warn("Gemini evaluation call failed, falling back to heuristic engine:", err);
      }
    }

    // Robust deterministic heuristic evaluator
    return this.heuristicEvaluate(question, trimmed, role);
  }

  private async evaluateWithGemini(
    question: InterviewQuestion,
    answer: string,
    role: RoleType
  ): Promise<AnswerEvaluation> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiKey}`;
    const prompt = `You are a senior technical interviewer evaluating a candidate for the role of ${role}.
Question: "${question.question}"
Target Competency: "${question.targetCompetency}"
Candidate Answer: "${answer}"

Evaluate the answer and return ONLY valid JSON in this exact structure:
{
  "relevance": <number 0-100>,
  "technicalDepth": <number 0-100>,
  "clarity": <number 0-100>,
  "communication": <number 0-100>,
  "confidence": <number 0-100>,
  "overallScore": <number 0-100>,
  "feedback": "<2-3 sentences concise constructive feedback>",
  "strengthsObserved": ["<bullet 1>", "<bullet 2>"],
  "improvementTips": ["<bullet 1>", "<bullet 2>"]
}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawContent) {
      return JSON.parse(rawContent) as AnswerEvaluation;
    }
    throw new Error("No response content from Gemini");
  }

  private heuristicEvaluate(
    question: InterviewQuestion,
    answer: string,
    role: RoleType
  ): AnswerEvaluation {
    const words = answer.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Detect technical keywords and structural indicators
    const technicalKeywords = [
      "api", "database", "query", "index", "process", "thread", "memory",
      "cpu", "cache", "redis", "lock", "concurrency", "distributed",
      "latency", "throughput", "schema", "scale", "docker", "pipeline",
      "sql", "python", "rest", "cluster", "star", "result", "metric", "async",
      "debug", "monitor", "log", "transaction", "architecture"
    ];

    const lower = answer.toLowerCase();
    const matchedTerms = technicalKeywords.filter((k) => lower.includes(k));

    // Scoring heuristics based on length, depth, and vocabulary
    let technicalDepth = 60;
    if (matchedTerms.length >= 4) technicalDepth += 22;
    else if (matchedTerms.length >= 2) technicalDepth += 12;
    if (wordCount > 60) technicalDepth += 8;

    let clarity = 70;
    if (lower.includes("for example") || lower.includes("specifically") || lower.includes("because")) {
      clarity += 12;
    }
    if (wordCount < 25) clarity -= 15;

    let communication = 68;
    if (lower.includes("first") || lower.includes("second") || lower.includes("additionally") || lower.includes("result")) {
      communication += 14;
    }
    if (wordCount > 40) communication += 8;

    let relevance = 75;
    if (question.type === "technical" && matchedTerms.length >= 2) relevance += 12;
    if (question.type === "behavioral" && (lower.includes("team") || lower.includes("i ") || lower.includes("we "))) relevance += 10;

    let confidence = 72;
    if (lower.includes("maybe") || lower.includes("i think i guess") || lower.includes("not sure")) {
      confidence -= 18;
    } else if (lower.includes("ensured") || lower.includes("analyzed") || lower.includes("designed")) {
      confidence += 10;
    }

    // Cap all dimensions between 40 and 96
    const clamp = (v: number) => Math.max(40, Math.min(95, Math.round(v)));
    const cRelevance = clamp(relevance);
    const cTech = clamp(technicalDepth);
    const cClarity = clamp(clarity);
    const cComm = clamp(communication);
    const cConf = clamp(confidence);

    const overall = Math.round(
      cRelevance * 0.25 + cTech * 0.3 + cClarity * 0.15 + cComm * 0.15 + cConf * 0.15
    );

    const strengths: string[] = [];
    if (matchedTerms.length >= 2) {
      strengths.push(`Good utilization of relevant domain terminology (${matchedTerms.slice(0, 3).join(", ")}).`);
    } else {
      strengths.push("Direct answer to the core interview prompt.");
    }
    if (wordCount >= 40) {
      strengths.push("Provided adequate context and structured explanation.");
    } else {
      strengths.push("Concise communication style.");
    }

    const improvementTips: string[] = [];
    if (matchedTerms.length < 3) {
      improvementTips.push("Reference specific technical trade-offs, metrics, or algorithmic considerations.");
    }
    if (!lower.includes("for example") && !lower.includes("specifically")) {
      improvementTips.push("Ground your explanation in a concrete production or project scenario.");
    }
    if (wordCount < 35) {
      improvementTips.push("Elaborate on the 'why' behind architectural choices rather than just the 'what'.");
    }

    return {
      relevance: cRelevance,
      technicalDepth: cTech,
      clarity: cClarity,
      communication: cComm,
      confidence: cConf,
      overallScore: overall,
      feedback: `Your response shows a clear understanding of the core concept. To make it stand out to hiring managers for ${role}, strengthen the explanation with concrete system trade-offs and quantifiable impact.`,
      strengthsObserved: strengths.slice(0, 2),
      improvementTips: improvementTips.slice(0, 2),
    };
  }

  public async analyzeResumeText(text: string): Promise<{
    score: number;
    strengths: string[];
    improvements: string[];
  }> {
    // Basic heuristics for resume text quality
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    let score = 70;
    if (lines.length > 25) score += 5;
    if (text.toLowerCase().includes("achieved") || text.toLowerCase().includes("optimized")) score += 4;
    return {
      score: Math.min(94, score),
      strengths: [
        "Structured layout with distinct professional history sections.",
        "Demonstrated technical skills applicable to target industry positions.",
      ],
      improvements: [
        "Include more quantifiable metrics (percentages, request volumes, cost reductions).",
        "Align technical keywords with target job posting requirements.",
      ],
    };
  }
}

export const aiService = new AiService();
