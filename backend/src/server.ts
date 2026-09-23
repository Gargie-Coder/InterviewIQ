import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import resumeRouter from "./routes/resume.js";
import jobRouter from "./routes/job.js";
import atsRouter from "./routes/ats.js";
import interviewRouter from "./routes/interview.js";
import dashboardRouter from "./routes/dashboard.js";
import profileRouter from "./routes/profile.js";
import placeholderRouter from "./routes/placeholder.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middleware configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server proxy)
      if (!origin) return callback(null, true);
      // Allow frontend origin and localhost variants
      if (
        origin === FRONTEND_URL ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "interviewiq-backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount modular API routers
app.use("/api/auth", authRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/job", jobRouter);
app.use("/api/ats", atsRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/profile", profileRouter);
app.use("/api", placeholderRouter);

// 404 handler for unmatched routes
app.use("/api/*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found on InterviewIQ API server." });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled server exception:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`[InterviewIQ Backend] Server active and listening on http://localhost:${PORT}`);
});
