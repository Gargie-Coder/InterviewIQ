import { Router, Request, Response } from "express";

const router = Router();

const placeholderHandler = (_req: Request, res: Response): void => {
  res.json({
    status: "coming_soon",
    message: "This feature module is currently under development in the InterviewIQ research pipeline.",
  });
};

router.get("/coming-soon", placeholderHandler);
router.post("/coming-soon", placeholderHandler);

router.get("/courses", placeholderHandler);
router.get("/roadmap", placeholderHandler);
router.get("/skills", placeholderHandler);
router.get("/analytics", placeholderHandler);

export default router;
