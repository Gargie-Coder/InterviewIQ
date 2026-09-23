import { Router, Request, Response } from "express";
import { evaluateAtsScore } from "../services/atsScorer.js";

const router = Router();

// POST /api/ats/analyze
router.post("/analyze", (req: Request, res: Response): void => {
  try {
    const body = req.body || {};
    const resumeText: string = body.resumeText || "";
    const jobKeywords: string[] = body.jobKeywords || [];

    const atsResult = evaluateAtsScore(resumeText, jobKeywords);
    res.json(atsResult);
  } catch (error) {
    console.error("ATS analysis API error:", error);
    res.status(500).json({ error: "Failed to evaluate ATS compatibility." });
  }
});

export default router;
