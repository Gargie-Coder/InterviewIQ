import { Request } from "express";
import crypto from "crypto";
import { findUserById, DbUser } from "./db.js";

const SESSION_SECRET = process.env.SESSION_SECRET || "interviewiq_super_secret_key_2026";
export const COOKIE_NAME = "interviewiq_session";

export function createSessionToken(userId: string): string {
  const timestamp = Date.now();
  const payload = `${userId}:${timestamp}`;
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [userId, timestampStr, signature] = decoded.split(":");
    if (!userId || !timestampStr || !signature) return null;

    const payload = `${userId}:${timestampStr}`;
    const expectedSig = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");

    if (signature !== expectedSig) return null;

    // Session valid for 30 days
    const timestamp = parseInt(timestampStr, 10);
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > thirtyDaysMs) return null;

    return userId;
  } catch {
    return null;
  }
}

export function getAuthenticatedUser(req: Request): DbUser | null {
  // Check cookie
  let token = req.cookies?.[COOKIE_NAME];

  // Fallback check Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  const userId = verifySessionToken(token);
  if (!userId) return null;

  return findUserById(userId);
}
