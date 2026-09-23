import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  ParsedResume,
  ResumeAnalysisResult,
  JobMatchResult,
  InterviewSummary,
  QuestionAnswerPair,
  RoleType,
} from "../types/index.js";

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  targetRole: RoleType;
  experienceYears: number;
  education: string;
  skills: string[];
  preferredInterviewType: "Technical" | "Behavioral" | "Mixed";
  createdAt: string;
}

export interface DbResume {
  id: string;
  userId: string;
  fileName: string;
  rawText: string;
  parsedData: ParsedResume;
  overallScore: number;
  breakdown: {
    skills: number;
    experience: number;
    projects: number;
    formatting: number;
    keywords: number;
  };
  strengths: string[];
  improvements: string[];
  updatedAt: string;
}

export interface DbJobMatch {
  id: string;
  userId: string;
  targetRole: RoleType;
  jobDescription: string;
  jobMatchScore: number;
  strongMatches: string[];
  partialMatches: string[];
  missingSkills: string[];
  experienceMatch: number;
  educationMatch: number;
  skillMatch: number;
  explanation: string;
  recommendations: string[];
  updatedAt: string;
}

export interface DbInterview {
  id: string;
  userId: string;
  role: RoleType;
  overallScore: number;
  summary: InterviewSummary;
  history: QuestionAnswerPair[];
  completedAt: string;
}

interface DatabaseSchema {
  users: DbUser[];
  resumes: DbResume[];
  jobMatches: DbJobMatch[];
  interviews: DbInterview[];
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      users: [],
      resumes: [],
      jobMatches: [],
      interviews: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database file, resetting:", err);
    const fallback: DatabaseSchema = {
      users: [],
      resumes: [],
      jobMatches: [],
      interviews: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

function writeDb(data: DatabaseSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

// User CRUD
export function findUserByEmail(email: string): DbUser | null {
  const db = ensureDbFile();
  const lower = email.trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === lower) || null;
}

export function findUserById(id: string): DbUser | null {
  const db = ensureDbFile();
  return db.users.find((u) => u.id === id) || null;
}

export function createUser(userData: {
  name: string;
  email: string;
  password: string;
  targetRole?: RoleType;
  experienceYears?: number;
  education?: string;
  skills?: string[];
}): DbUser {
  const db = ensureDbFile();
  const salt = generateSalt();
  const passwordHash = hashPassword(userData.password, salt);

  const newUser: DbUser = {
    id: `usr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    passwordHash,
    salt,
    targetRole: userData.targetRole || "Software Engineer",
    experienceYears: userData.experienceYears || 1,
    education: userData.education || "",
    skills: userData.skills || [],
    preferredInterviewType: "Mixed",
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

export function updateUser(id: string, updates: Partial<DbUser>): DbUser | null {
  const db = ensureDbFile();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  db.users[index] = {
    ...db.users[index],
    ...updates,
  };
  writeDb(db);
  return db.users[index];
}

// Resume CRUD
export function saveResume(resumeData: Omit<DbResume, "id" | "updatedAt">): DbResume {
  const db = ensureDbFile();
  const existingIdx = db.resumes.findIndex((r) => r.userId === resumeData.userId);

  const record: DbResume = {
    id: existingIdx >= 0 ? db.resumes[existingIdx].id : `res_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    ...resumeData,
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    db.resumes[existingIdx] = record;
  } else {
    db.resumes.push(record);
  }

  // Update user's extracted skills if available
  if (record.parsedData?.skills && record.parsedData.skills.length > 0) {
    const userIdx = db.users.findIndex((u) => u.id === resumeData.userId);
    if (userIdx >= 0) {
      db.users[userIdx].skills = record.parsedData.skills;
    }
  }

  writeDb(db);
  return record;
}

export function getResumeByUserId(userId: string): DbResume | null {
  const db = ensureDbFile();
  return db.resumes.find((r) => r.userId === userId) || null;
}

// Job Match CRUD
export function saveJobMatch(jobData: Omit<DbJobMatch, "id" | "updatedAt">): DbJobMatch {
  const db = ensureDbFile();
  const existingIdx = db.jobMatches.findIndex((j) => j.userId === jobData.userId);

  const record: DbJobMatch = {
    id: existingIdx >= 0 ? db.jobMatches[existingIdx].id : `jm_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    ...jobData,
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    db.jobMatches[existingIdx] = record;
  } else {
    db.jobMatches.push(record);
  }

  writeDb(db);
  return record;
}

export function getJobMatchByUserId(userId: string): DbJobMatch | null {
  const db = ensureDbFile();
  return db.jobMatches.find((j) => j.userId === userId) || null;
}

// Interview CRUD
export function saveInterview(interviewData: Omit<DbInterview, "id" | "completedAt">): DbInterview {
  const db = ensureDbFile();

  const record: DbInterview = {
    id: `int_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    ...interviewData,
    completedAt: new Date().toISOString(),
  };

  db.interviews.push(record);
  writeDb(db);
  return record;
}

export function getInterviewsByUserId(userId: string): DbInterview[] {
  const db = ensureDbFile();
  return db.interviews
    .filter((i) => i.userId === userId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}
