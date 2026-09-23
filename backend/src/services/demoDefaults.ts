import {
  ParsedResume,
  ResumeAnalysisResult,
  JobMatchResult,
  AtsScoreResult,
  InterviewQuestion,
  InterviewSummary,
} from "../types/index.js";

export const DEMO_RESUME_TEXT = `
ALEX SHARMA
San Francisco, CA | alex.sharma@example.com | (555) 349-2910
LinkedIn: linkedin.com/in/alex-sharma-dev | GitHub: github.com/alexsharma

PROFESSIONAL SUMMARY
Motivated Software Engineer with 2.5 years of experience building scalable backend microservices, RESTful APIs, and responsive frontend applications using Python, Java, SQL, and React. Passionate about distributed systems, code quality, and cloud-native solutions.

EXPERIENCE
Apex Labs — Software Engineer
July 2023 – Present | San Francisco, CA
• Architected and maintained 8 high-throughput REST APIs in Python (FastAPI) and PostgreSQL, handling over 2.4 million daily requests with sub-120ms p95 latency.
• Optimized complex SQL queries and index strategies, reducing query execution duration by 34% across relational datasets.
• Implemented automated CI/CD deployment pipelines using Git and GitHub Actions, reducing release cycle time by 25%.
• Integrated Redis caching layers to alleviate database contention during peak traffic spikes.

CloudPoint Technologies — Associate Software Engineer
January 2022 – June 2023 | San Jose, CA
• Developed backend services in Java Spring Boot for internal enterprise inventory and reporting tools.
• Built interactive analytics dashboards using React, TypeScript, and Tailwind CSS used by 450+ internal operators.
• Collaborated in an agile scrum team of 8 engineers, participating in code reviews, sprint planning, and unit testing (JUnit, pytest).

EDUCATION
State University — Bachelor of Science in Computer Science
Graduated May 2022 | GPA: 3.82 / 4.0

TECHNICAL SKILLS
• Programming Languages: Python, Java, JavaScript, TypeScript, SQL
• Frameworks & Libraries: FastAPI, Spring Boot, React, Node.js, Next.js
• Databases & Storage: PostgreSQL, MySQL, Redis, MongoDB
• Tools & Platforms: Git, Docker, Linux, REST APIs, Postman, AWS (EC2, S3)
`;

export const DEMO_PARSED_RESUME: ParsedResume = {
  rawText: DEMO_RESUME_TEXT,
  name: "Alex Sharma",
  contact: {
    email: "alex.sharma@example.com",
    phone: "(555) 349-2910",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alex-sharma-dev",
    github: "github.com/alexsharma",
  },
  education: [
    {
      institution: "State University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startYear: "2018",
      endYear: "2022",
      gpa: "3.82 / 4.0",
    },
  ],
  experience: [
    {
      company: "Apex Labs",
      role: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "July 2023",
      endDate: "Present",
      description: [
        "Architected and maintained 8 high-throughput REST APIs in Python (FastAPI) and PostgreSQL, handling over 2.4 million daily requests.",
        "Optimized complex SQL queries and index strategies, reducing query execution duration by 34%.",
        "Implemented automated CI/CD deployment pipelines using Git and GitHub Actions.",
      ],
    },
    {
      company: "CloudPoint Technologies",
      role: "Associate Software Engineer",
      location: "San Jose, CA",
      startDate: "Jan 2022",
      endDate: "June 2023",
      description: [
        "Developed backend services in Java Spring Boot for internal enterprise inventory and reporting tools.",
        "Built interactive analytics dashboards using React, TypeScript, and Tailwind CSS.",
      ],
    },
  ],
  skills: [
    "Python",
    "Java",
    "SQL",
    "React",
    "Git",
    "REST APIs",
    "PostgreSQL",
    "FastAPI",
    "TypeScript",
    "Redis",
    "Docker",
    "AWS",
  ],
  projects: [
    {
      name: "Real-Time Distributed Task Scheduler",
      description:
        "Asynchronous task broker in Python utilizing Redis streams with retry semantics and Docker containerization.",
      technologies: ["Python", "Redis", "Docker"],
    },
    {
      name: "Collaborative Canvas Platform",
      description:
        "Multi-user digital whiteboard supporting real-time WebSockets synchronization and CRDT data structures.",
      technologies: ["React", "Node.js", "WebSockets"],
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner (2023)",
    "Meta Certified Frontend Developer",
  ],
  technologies: [
    "Python",
    "Java",
    "SQL",
    "React",
    "FastAPI",
    "Spring Boot",
    "PostgreSQL",
    "Docker",
    "Git",
    "Redis",
  ],
};

export const DEMO_RESUME_ANALYSIS: ResumeAnalysisResult = {
  overallScore: 78,
  breakdown: {
    skills: 82,
    experience: 76,
    projects: 81,
    formatting: 74,
    keywords: 79,
  },
  strengths: [
    "Strong demonstrated foundation in core backend technologies (Python, Java, SQL, REST APIs).",
    "Solid project portfolio with measurable technical depth (Distributed Scheduler, WebSocket Canvas).",
    "Clear quantifiable metrics in recent employment history (2.4M requests, 34% query latency reduction).",
    "Accredited B.S. in Computer Science with strong GPA and relevant coursework listed.",
  ],
  improvements: [
    "Add measurable business outcomes and revenue or user impact across early career bullet points.",
    "Highlight production container orchestration experience (e.g. Kubernetes, ECS) to bridge senior requirements.",
    "Incorporate role-specific keywords like 'System Design', 'Microservices architecture', and 'Observability'.",
    "Expand on automated testing coverage and cloud security best practices implemented in past projects.",
  ],
  parsedData: DEMO_PARSED_RESUME,
};

export const DEMO_JOB_MATCH: JobMatchResult = {
  jobMatchScore: 82,
  strongMatches: ["Python", "SQL", "REST APIs", "Git", "PostgreSQL", "Java"],
  partialMatches: ["Docker", "AWS"],
  missingSkills: ["Kubernetes", "System Design"],
  experienceMatch: 78,
  educationMatch: 90,
  skillMatch: 84,
  explanation:
    "Your background is a strong fit for the target role. You possess the foundational programming languages and database expertise required for the daily responsibilities. Your project history confirms practical API design and CI/CD execution.",
  recommendations: [
    "Highlight your Docker Compose experience and complete a Kubernetes cluster deployment scenario.",
    "Add a System Design case study in your project portfolio detailing trade-offs (CAP theorem, caching, partitioning).",
    "Emphasize your AWS Certified Cloud Practitioner credential directly under the header summary.",
  ],
};

export const DEMO_ATS_SCORE: AtsScoreResult = {
  atsScore: 78,
  label: "InterviewIQ ATS Compatibility Estimate",
  breakdown: {
    keywords: 79,
    formatting: 84,
    skills: 82,
    experience: 76,
    jobRelevance: 80,
    sectionCompleteness: 88,
  },
  matchedKeywords: [
    "Python",
    "Java",
    "SQL",
    "REST APIs",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS",
    "Microservices",
    "FastAPI",
    "Unit Testing",
  ],
  missingKeywords: [
    "Kubernetes",
    "System Design",
    "Distributed Systems",
    "Container Orchestration",
    "Observability",
  ],
  suggestions: [
    "Add 3 relevant keywords from the job description: 'Kubernetes', 'System Design', and 'Distributed Systems'.",
    "Use measurable outcomes in your experience section (e.g., mention throughput gains or team velocity).",
    "Ensure section headers conform to standard ATS parsers (e.g., 'Work Experience' and 'Education').",
    "Avoid multi-column tables or non-standard glyphs to maximize text extraction accuracy.",
  ],
};

export const DEMO_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "q-1",
    role: "Software Engineer",
    type: "technical",
    question:
      "Can you explain the difference between a process and a thread, and how race conditions occur in multi-threaded programs?",
    targetCompetency: "Operating Systems & Concurrency",
    hints: [
      "Address memory space sharing",
      "Explain context switching overhead",
      "Mention mutual exclusion or locking primitives",
    ],
  },
  {
    id: "q-2",
    role: "Software Engineer",
    type: "technical",
    question:
      "Tell me how you would design and optimize a relational database schema for an application with heavy read traffic. What indexing strategies would you consider?",
    targetCompetency: "Database Design & Performance",
    hints: [
      "Discuss B-Tree indexes vs composite indexes",
      "Consider read replicas and caching layers",
      "Explain query execution plans",
    ],
  },
  {
    id: "q-3",
    role: "Software Engineer",
    type: "behavioral",
    question:
      "Describe a situation where you had a disagreement with a team member or technical lead over an architectural decision. How did you resolve it?",
    targetCompetency: "Communication & Conflict Resolution",
    hints: [
      "Use the STAR method",
      "Focus on objective data and benchmark tests",
      "Highlight the collaborative outcome",
    ],
  },
  {
    id: "q-4",
    role: "Software Engineer",
    type: "scenario",
    question:
      "Suppose an API endpoint in your service experiences an unexpected 5x latency spike in production. Walk me step-by-step through your debugging and troubleshooting process.",
    targetCompetency: "Production Troubleshooting & Systems Thinking",
    hints: [
      "Check monitoring dashboards and alerts",
      "Isolate database connection pools, memory, or CPU",
      "Examine distributed tracing logs",
    ],
  },
];

export const DEMO_INTERVIEW_SUMMARY: InterviewSummary = {
  technicalKnowledge: 78,
  communication: 72,
  problemSolving: 84,
  overall: 77,
  feedback: [
    "Solid technical depth when explaining relational database optimization and indexing structures.",
    "Clear, structured troubleshooting framework presented for production triage scenarios.",
    "Consider providing more succinct, quantitative STAR examples for behavioral responses.",
    "Opportunity to deepen explanations of concurrency primitives (semaphores, mutex locks).",
  ],
  strengths: [
    "Confident grasp of REST architectural principles and query performance.",
    "Disciplined, systematic approach to production incident diagnosis.",
    "Strong collaboration mindset and open to technical compromise.",
  ],
  nextSteps: [
    "Practice 2 System Design mock scenarios focusing on distributed rate limiting.",
    "Review concurrency pitfalls in Python (GIL) and Java (synchronized blocks vs Atomic references).",
    "Refine 60-second behavioral elevator answers focusing on measurable results.",
  ],
};

