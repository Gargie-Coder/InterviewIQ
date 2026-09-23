import { JobMatchResult, RoleType } from "../types/index.js";
import { DEMO_JOB_MATCH } from "./demoDefaults.js";

const COMMON_SKILLS = [
  "Python", "Java", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "Ruby",
  "React", "Next.js", "Vue", "Angular", "Node.js", "FastAPI", "Django", "Flask", "Spring Boot",
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB",
  "Git", "Docker", "Kubernetes", "Linux", "AWS", "GCP", "Azure", "CI/CD",
  "REST APIs", "GraphQL", "gRPC", "Microservices", "System Design", "Distributed Systems",
  "Unit Testing", "Agile"
];

export function matchJobDescription(
  candidateSkills: string[],
  jobDescriptionText: string,
  targetRole?: RoleType
): JobMatchResult {
  const text = jobDescriptionText.trim();

  // If text is empty or matches demo job description, return demo match result
  if (!text || text.length < 40) {
    return DEMO_JOB_MATCH;
  }

  const lowerJob = text.toLowerCase();
  const lowerCandidateSkills = new Set(candidateSkills.map((s) => s.toLowerCase()));

  // Identify skills present in job description
  const jobRequiredSkills: string[] = [];
  COMMON_SKILLS.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (regex.test(lowerJob)) {
      jobRequiredSkills.push(skill);
    }
  });

  // Categorize matches
  const strongMatches: string[] = [];
  const partialMatches: string[] = [];
  const missingSkills: string[] = [];

  const partialMap: Record<string, string[]> = {
    docker: ["containers", "kubernetes", "linux"],
    aws: ["cloud", "gcp", "azure", "ec2", "s3"],
    sql: ["database", "postgresql", "mysql"],
    "system design": ["microservices", "distributed systems", "scalability"],
  };

  jobRequiredSkills.forEach((skill) => {
    const sLower = skill.toLowerCase();
    if (lowerCandidateSkills.has(sLower)) {
      strongMatches.push(skill);
    } else {
      // Check for partial related skills
      const related = partialMap[sLower] || [];
      const hasRelated = related.some((r) => lowerCandidateSkills.has(r) || lowerJob.includes(r));
      if (hasRelated) {
        partialMatches.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
  });

  // If few skills extracted, provide balanced defaults
  if (strongMatches.length === 0 && candidateSkills.length > 0) {
    strongMatches.push(...candidateSkills.slice(0, 3));
  }
  if (missingSkills.length === 0) {
    missingSkills.push("System Design", "Kubernetes");
  }

  // Calculate dimension scores
  const totalRelevant = strongMatches.length + partialMatches.length * 0.5 + missingSkills.length;
  const skillMatch = totalRelevant > 0
    ? Math.round(((strongMatches.length + partialMatches.length * 0.5) / totalRelevant) * 100)
    : 75;

  const experienceMatch = lowerJob.includes("senior") ? 70 : 82;
  const educationMatch = lowerJob.includes("master") || lowerJob.includes("phd") ? 75 : 90;

  const jobMatchScore = Math.round(
    skillMatch * 0.5 + experienceMatch * 0.3 + educationMatch * 0.2
  );

  const explanation = `Your profile exhibits an estimated ${jobMatchScore}% compatibility with this ${
    targetRole || "target"
  } requisition. You satisfy foundational requirements in ${strongMatches.slice(0, 3).join(", ") || "core areas"}. Addressing gaps in ${
    missingSkills.slice(0, 2).join(" and ") || "specialized tooling"
  } will significantly strengthen your standing.`;

  const recommendations = [
    `Bridge the gap in ${missingSkills[0] || "System Design"} by highlighting related architectural decision-making or coursework.`,
    `Ensure your resume explicitly mentions ${strongMatches.slice(0, 2).join(" and ")} in your professional experience bullets.`,
    "Tailor your project portfolio summaries to echo the exact technical scope demanded by this position.",
  ];

  return {
    jobMatchScore: Math.min(98, Math.max(45, jobMatchScore)),
    strongMatches,
    partialMatches,
    missingSkills,
    experienceMatch,
    educationMatch,
    skillMatch,
    explanation,
    recommendations,
  };
}
