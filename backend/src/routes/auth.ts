import { Router, Request, Response } from "express";
import { findUserByEmail, createUser, findUserById, hashPassword, getResumeByUserId, getJobMatchByUserId, getInterviewsByUserId } from "../services/db.js";
import { createSessionToken, getAuthenticatedUser, COOKIE_NAME } from "../services/auth.js";
import { RoleType } from "../types/index.js";

const router = Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// POST /api/auth/signup
router.post("/signup", (req: Request, res: Response): void => {
  try {
    const { name, email, password, targetRole } = req.body || {};

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required." });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters long." });
      return;
    }

    const existing = findUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists. Please log in." });
      return;
    }

    const user = createUser({
      name,
      email,
      password,
      targetRole: (targetRole as RoleType) || "Software Engineer",
      experienceYears: 1,
      skills: [],
    });

    const token = createSessionToken(user.id);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      targetRole: user.targetRole,
      experienceYears: user.experienceYears,
      education: user.education,
      skills: user.skills,
      preferredInterviewType: user.preferredInterviewType,
    };

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ error: "Failed to create account. Please try again." });
  }
});

// POST /api/auth/login
router.post("/login", (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const checkHash = hashPassword(password, user.salt);
    if (checkHash !== user.passwordHash) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const token = createSessionToken(user.id);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      targetRole: user.targetRole,
      experienceYears: user.experienceYears,
      education: user.education,
      skills: user.skills,
      preferredInterviewType: user.preferredInterviewType,
    };

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req: Request, res: Response): void => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ success: true });
});

// GET /api/auth/me
router.get("/me", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ user: null });
      return;
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      targetRole: user.targetRole,
      experienceYears: user.experienceYears,
      education: user.education,
      skills: user.skills,
      preferredInterviewType: user.preferredInterviewType,
    };

    const resume = getResumeByUserId(user.id);
    const jobMatch = getJobMatchByUserId(user.id);
    const interviews = getInterviewsByUserId(user.id);

    res.json({
      user: safeUser,
      resume: resume
        ? {
            fileName: resume.fileName,
            overallScore: resume.overallScore,
            breakdown: resume.breakdown,
            strengths: resume.strengths,
            improvements: resume.improvements,
            parsedData: resume.parsedData,
          }
        : null,
      jobMatch: jobMatch
        ? {
            jobMatchScore: jobMatch.jobMatchScore,
            strongMatches: jobMatch.strongMatches,
            partialMatches: jobMatch.partialMatches,
            missingSkills: jobMatch.missingSkills,
            experienceMatch: jobMatch.experienceMatch,
            educationMatch: jobMatch.educationMatch,
            skillMatch: jobMatch.skillMatch,
            explanation: jobMatch.explanation,
            recommendations: jobMatch.recommendations,
            jobDescription: jobMatch.jobDescription,
          }
        : null,
      interviewCount: interviews.length,
      latestInterview: interviews.length > 0 ? interviews[0] : null,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    res.status(500).json({ user: null });
  }
});

export default router;
