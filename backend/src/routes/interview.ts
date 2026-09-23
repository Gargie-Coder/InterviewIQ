import { Router, Request, Response } from "express";
import { aiService } from "../services/aiService.js";
import { getAuthenticatedUser } from "../services/auth.js";
import { saveInterview, getInterviewsByUserId } from "../services/db.js";
import { DEMO_INTERVIEW_QUESTIONS, DEMO_INTERVIEW_SUMMARY } from "../services/demoDefaults.js";
import { InterviewQuestion, RoleType } from "../types/index.js";

const router = Router();

// POST /api/interview/start
router.post("/start", (req: Request, res: Response): void => {
  try {
    const body = req.body || {};
    const role: RoleType = body.role || "Software Engineer";

    const filtered = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.role === role);
    const questions = filtered.length > 0 ? filtered : DEMO_INTERVIEW_QUESTIONS;

    res.json({
      role,
      questionCount: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Interview start API error:", error);
    res.status(500).json({ error: "Failed to initialize interview." });
  }
});

// POST /api/interview/answer
router.post("/answer", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body || {};
    const question: InterviewQuestion = body.question;
    const answer: string = body.answer || "";
    const role: RoleType = body.role || "Software Engineer";

    if (!question || !question.question) {
      res.status(400).json({ error: "Interview question object is required." });
      return;
    }

    const evaluation = await aiService.evaluateInterviewAnswer(question, answer, role);
    res.json(evaluation);
  } catch (error) {
    console.error("Interview answer API error:", error);
    res.status(500).json({ error: "Failed to evaluate answer." });
  }
});

// POST /api/interview/save
router.post("/save", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    const body = req.body || {};
    const { role, overallScore, summary, history } = body;

    if (!summary || !history) {
      res.status(400).json({ error: "Summary and history are required." });
      return;
    }

    if (user) {
      const saved = saveInterview({
        userId: user.id,
        role: role || user.targetRole,
        overallScore: overallScore || summary.overall || 75,
        summary,
        history,
      });

      res.json({ success: true, interview: saved });
      return;
    }

    res.json({ success: true, message: "Interview completed (unauthenticated session)." });
  } catch (error) {
    console.error("Save interview error:", error);
    res.status(500).json({ error: "Failed to save interview." });
  }
});

// GET /api/interview/history
router.get("/history", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ interviews: [] });
      return;
    }

    const interviews = getInterviewsByUserId(user.id);
    res.json({ interviews });
  } catch (error) {
    console.error("Get interviews error:", error);
    res.status(500).json({ error: "Failed to fetch interviews." });
  }
});

// POST /api/interview/result
router.post("/result", (_req: Request, res: Response): void => {
  res.json({ summary: DEMO_INTERVIEW_SUMMARY });
});

export default router;
