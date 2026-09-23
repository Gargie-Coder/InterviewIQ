export type RoleType =
  | "Software Engineer"
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "Data Analyst"
  | "Data Scientist"
  | "Machine Learning Engineer"
  | "DevOps Engineer";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetRole: RoleType;
  experienceYears: number;
  education: string;
  skills: string[];
  preferredInterviewType: "Technical" | "Behavioral" | "Mixed";
  avatarUrl?: string;
}

export interface ExtractedContact {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ParsedResume {
  rawText: string;
  name: string;
  contact: ExtractedContact;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: string[];
  technologies: string[];
}

export interface ResumeScoreBreakdown {
  skills: number;
  experience: number;
  projects: number;
  formatting: number;
  keywords: number;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  breakdown: ResumeScoreBreakdown;
  strengths: string[];
  improvements: string[];
  parsedData: ParsedResume;
}

export interface JobDescriptionInput {
  title: string;
  company?: string;
  role: RoleType;
  description: string;
}

export interface JobMatchResult {
  jobMatchScore: number;
  strongMatches: string[];
  partialMatches: string[];
  missingSkills: string[];
  experienceMatch: number;
  educationMatch: number;
  skillMatch: number;
  explanation: string;
  recommendations: string[];
}

export interface AtsBreakdown {
  keywords: number;
  formatting: number;
  skills: number;
  experience: number;
  jobRelevance: number;
  sectionCompleteness: number;
}

export interface AtsScoreResult {
  atsScore: number;
  label: string; // "InterviewIQ ATS Compatibility Estimate"
  breakdown: AtsBreakdown;
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface InterviewQuestion {
  id: string;
  role: RoleType;
  type: "technical" | "behavioral" | "scenario";
  question: string;
  targetCompetency: string;
  hints?: string[];
}

export interface AnswerEvaluation {
  relevance: number; // 0-100
  technicalDepth: number; // 0-100
  clarity: number; // 0-100
  communication: number; // 0-100
  confidence: number; // 0-100
  overallScore: number; // 0-100
  feedback: string;
  strengthsObserved: string[];
  improvementTips: string[];
}

export interface QuestionAnswerPair {
  question: InterviewQuestion;
  candidateAnswer: string;
  evaluation?: AnswerEvaluation;
}

export interface InterviewSummary {
  technicalKnowledge: number;
  communication: number;
  problemSolving: number;
  overall: number;
  feedback: string[];
  strengths: string[];
  nextSteps: string[];
}

export interface SkillGapItem {
  skill: string;
  candidateLevel: number; // 0-100
  requiredLevel: number; // 0-100
  category: "Strong" | "Developing" | "Needs Improvement";
  status: "surplus" | "aligned" | "deficit";
}

export interface QuestionBankItem {
  id: string;
  role: RoleType;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  type: "MCQ" | "Conceptual" | "Coding" | "Debugging" | "Scenario-based";
  title: string;
  question: string;
  answerGuidance: string;
  codeSnippet?: string;
}

export interface RoadmapStep {
  id: string;
  stageTitle: string;
  status: "Completed" | "In Progress" | "Recommended";
  skills: string[];
  description: string;
}

export interface CourseItem {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skillsCovered: string[];
  progress: number; // 0 - 100
  enrolled: boolean;
  rating: number;
}

export interface SkillImprovementMetric {
  skill: string;
  beforeLearningScore: number;
  afterLearningScore: number;
  delta: number;
  assessmentCount: number;
}
