import { Router, Request, Response } from "express";
import { matchJobDescription } from "../services/jobMatcher.js";
import { getAuthenticatedUser } from "../services/auth.js";
import { saveJobMatch, getResumeByUserId, getJobMatchByUserId } from "../services/db.js";

const router = Router();

// POST /api/job/match
router.post("/match", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    const body = req.body || {};

    let candidateSkills: string[] = body.candidateSkills || [];
    const jobDescription: string = body.jobDescription || "";
    const targetRole = body.targetRole || (user ? user.targetRole : "Software Engineer");

    // If candidate skills not provided in body, load from user's saved resume
    if (candidateSkills.length === 0 && user) {
      const savedResume = getResumeByUserId(user.id);
      if (savedResume?.parsedData?.skills) {
        candidateSkills = savedResume.parsedData.skills;
      }
    }

    const matchResult = matchJobDescription(candidateSkills, jobDescription, targetRole);

    // Save to database if user is logged in
    if (user && jobDescription.trim()) {
      saveJobMatch({
        userId: user.id,
        targetRole,
        jobDescription,
        jobMatchScore: matchResult.jobMatchScore,
        strongMatches: matchResult.strongMatches,
        partialMatches: matchResult.partialMatches,
        missingSkills: matchResult.missingSkills,
        experienceMatch: matchResult.experienceMatch,
        educationMatch: matchResult.educationMatch,
        skillMatch: matchResult.skillMatch,
        explanation: matchResult.explanation,
        recommendations: matchResult.recommendations,
      });
    }

    res.json(matchResult);
  } catch (error) {
    console.error("Job match API error:", error);
    res.status(500).json({ error: "Failed to compute job match." });
  }
});

// GET /api/job/current
router.get("/current", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ jobMatch: null });
      return;
    }

    const jobMatch = getJobMatchByUserId(user.id);
    res.json({ jobMatch });
  } catch (error) {
    console.error("Get job match error:", error);
    res.status(500).json({ error: "Failed to fetch job match." });
  }
});

export default router;
