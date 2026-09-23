import { Router, Request, Response } from "express";
import { getAuthenticatedUser } from "../services/auth.js";
import { updateUser } from "../services/db.js";

const router = Router();

// POST /api/profile/update
router.post("/update", (req: Request, res: Response): void => {
  try {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const body = req.body || {};
    const updated = updateUser(user.id, {
      name: body.name || user.name,
      targetRole: body.targetRole || user.targetRole,
      experienceYears: typeof body.experienceYears === "number" ? body.experienceYears : user.experienceYears,
      education: body.education !== undefined ? body.education : user.education,
      skills: Array.isArray(body.skills) ? body.skills : user.skills,
      preferredInterviewType: body.preferredInterviewType || user.preferredInterviewType,
    });

    if (!updated) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json({
      success: true,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        targetRole: updated.targetRole,
        experienceYears: updated.experienceYears,
        education: updated.education,
        skills: updated.skills,
        preferredInterviewType: updated.preferredInterviewType,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

export default router;
