import { Router, Request, Response } from "express";
import { getAuthenticatedUser } from "../services/auth.js";
import {
  getResumeByUserId,
  getJobMatchByUserId,
  getInterviewsByUserId,
} from "../services/db.js";

const router = Router();

function formatRelativeTime(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "Recently";
  }
}

// GET /api/dashboard/stats
router.get("/stats", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const resume = getResumeByUserId(user.id);
    const jobMatch = getJobMatchByUserId(user.id);
    const interviews = getInterviewsByUserId(user.id);

    const resumeScore = resume?.overallScore || null;
    const matchScore = jobMatch?.jobMatchScore || null;

    let interviewReadiness: number | null = null;
    if (interviews.length > 0) {
      const avg = Math.round(
        interviews.reduce((acc, i) => acc + (i.overallScore || 75), 0) / interviews.length
      );
      interviewReadiness = avg;
    }

    const activity: Array<{
      action: string;
      detail: string;
      time: string;
      type: "resume" | "job" | "interview" | "signup";
      href: string;
    }> = [];

    if (interviews.length > 0) {
      const latest = interviews[0];
      activity.push({
        action: "Mock interview completed",
        detail: `${latest.role} session scored ${latest.overallScore}% overall`,
        time: formatRelativeTime(latest.completedAt),
        type: "interview",
        href: "/interview",
      });
    }

    if (jobMatch) {
      activity.push({
        action: "Job match completed",
        detail: `Evaluated target role requirements (${jobMatch.jobMatchScore}% fit)`,
        time: formatRelativeTime(jobMatch.updatedAt),
        type: "job",
        href: "/job-match",
      });
    }

    if (resume) {
      activity.push({
        action: "Resume analyzed",
        detail: `Parsed ${resume.fileName} — Overall score ${resume.overallScore}/100`,
        time: formatRelativeTime(resume.updatedAt),
        type: "resume",
        href: "/resume-analyzer",
      });
    }

    activity.push({
      action: "Account registered",
      detail: `Profile created for ${user.targetRole}`,
      time: formatRelativeTime(user.createdAt),
      type: "signup",
      href: "/profile",
    });

    const userSkills = resume?.parsedData?.skills || user.skills || [];
    const skillList = userSkills.length > 0
      ? userSkills.slice(0, 5).map((s, idx) => ({
          skill: s,
          percentage: Math.max(50, Math.min(95, 85 - idx * 6)),
          category: (idx < 2 ? "Strong" : idx < 4 ? "Developing" : "Needs Improvement") as "Strong" | "Developing" | "Needs Improvement",
        }))
      : [
          { skill: "Core Programming", percentage: 65, category: "Developing" as const },
          { skill: "Data Structures", percentage: 55, category: "Developing" as const },
          { skill: "System Design", percentage: 40, category: "Needs Improvement" as const },
        ];

    res.json({
      userName: user.name,
      targetRole: user.targetRole,
      resumeScore,
      matchScore,
      interviewReadiness,
      interviewsCount: interviews.length,
      hasResume: Boolean(resume),
      hasJobMatch: Boolean(jobMatch),
      skills: skillList,
      recentActivity: activity,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to load dashboard stats." });
  }
});

export default router;
