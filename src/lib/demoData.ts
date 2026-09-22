import {
  UserProfile,
  ParsedResume,
  ResumeAnalysisResult,
  JobMatchResult,
  AtsScoreResult,
  InterviewQuestion,
  InterviewSummary,
  SkillGapItem,
  QuestionBankItem,
  RoadmapStep,
  CourseItem,
  SkillImprovementMetric,
} from "../types";

export const DEMO_USER: UserProfile = {
  id: "user-alex-sharma",
  name: "Alex Sharma",
  email: "alex.sharma@example.com",
  targetRole: "Software Engineer",
  experienceYears: 2.5,
  education: "B.S. Computer Science, Tech University (2022)",
  skills: [
    "Python",
    "Java",
    "SQL",
    "React",
    "Git",
    "REST APIs",
    "PostgreSQL",
    "FastAPI",
    "JavaScript",
    "TypeScript",
  ],
  preferredInterviewType: "Mixed",
};

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
Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Distributed Systems, Computer Networks, Operating Systems.

TECHNICAL SKILLS
• Programming Languages: Python, Java, JavaScript, TypeScript, SQL
• Frameworks & Libraries: FastAPI, Spring Boot, React, Node.js, Next.js
• Databases & Storage: PostgreSQL, MySQL, Redis, MongoDB
• Tools & Platforms: Git, Docker, Linux, REST APIs, Postman, AWS (EC2, S3)

PROJECTS
Real-Time Distributed Task Scheduler | Python, Redis, Docker
• Built an asynchronous task broker in Python utilizing Redis streams and workers with automatic retry policies.
• Deployed containers using Docker Compose and monitored task throughput with Prometheus metrics.

Collaborative Canvas Platform | React, Node.js, WebSockets
• Created a multi-user digital whiteboard supporting real-time cursor sync and vector shape rendering for remote teams.
• Implemented conflict-free replicated data types (CRDT) for concurrent document edits.

CERTIFICATIONS
• AWS Certified Cloud Practitioner (2023)
• Meta Certified Frontend Developer Specialization
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

export const DEMO_JOB_DESCRIPTION = `
Title: Software Engineer (Backend / Distributed Systems)
Company: NexaCloud Platform
Location: Hybrid (San Francisco, CA)
Experience: 2-4 Years

About the Role:
We are looking for a Software Engineer to join our Core Services engineering team. You will build and scale high-performance distributed systems, design resilient REST APIs, and streamline data ingestion pipelines.

Key Responsibilities:
• Design, implement, and maintain reliable microservices in Python and Java.
• Author optimized SQL queries and manage relational database schemas in PostgreSQL.
• Collaborate with cross-functional product and infrastructure teams using Git and CI/CD pipelines.
• Build scalable cloud infrastructure utilizing Docker, Kubernetes, and AWS services.
• Participate in architectural reviews, system design deliberations, and incident resolution.

Requirements & Qualifications:
• 2+ years of professional software engineering experience.
• Strong proficiency in Python or Java, with deep knowledge of REST API principles.
• Proficient with relational databases, SQL optimization, and transactional integrity.
• Experience with version control (Git) and containerization tools like Docker.
• Familiarity with cloud providers (AWS preferred) and container orchestration (Kubernetes).
• Solid understanding of System Design, concurrency, and scalable distributed patterns.
• B.S. or M.S. in Computer Science or equivalent practical experience.
`;

export const DEMO_JOB_MATCH: JobMatchResult = {
  jobMatchScore: 82,
  strongMatches: ["Python", "SQL", "REST APIs", "Git", "PostgreSQL", "Java"],
  partialMatches: ["Docker", "AWS"],
  missingSkills: ["Kubernetes", "System Design"],
  experienceMatch: 78,
  educationMatch: 90,
  skillMatch: 84,
  explanation:
    "Your background is a strong fit for the NexaCloud Core Services role. You possess the foundational programming languages (Python, Java) and database expertise (SQL, PostgreSQL) required for the daily responsibilities. Your project history confirms practical API design and CI/CD execution. To achieve a 95%+ match, strengthen your documented exposure to production Kubernetes orchestration and large-scale System Design.",
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

export const DEMO_SKILL_GAPS: SkillGapItem[] = [
  {
    skill: "Python",
    candidateLevel: 84,
    requiredLevel: 80,
    category: "Strong",
    status: "surplus",
  },
  {
    skill: "SQL",
    candidateLevel: 72,
    requiredLevel: 75,
    category: "Developing",
    status: "aligned",
  },
  {
    skill: "FastAPI",
    candidateLevel: 55,
    requiredLevel: 65,
    category: "Developing",
    status: "deficit",
  },
  {
    skill: "System Design",
    candidateLevel: 48,
    requiredLevel: 75,
    category: "Needs Improvement",
    status: "deficit",
  },
  {
    skill: "Docker",
    candidateLevel: 41,
    requiredLevel: 70,
    category: "Needs Improvement",
    status: "deficit",
  },
  {
    skill: "AWS",
    candidateLevel: 38,
    requiredLevel: 65,
    category: "Needs Improvement",
    status: "deficit",
  },
];

export const DEMO_ROADMAP: RoadmapStep[] = [
  {
    id: "step-1",
    stageTitle: "1. Core Foundation",
    status: "Completed",
    skills: ["Data Structures", "Algorithms", "Git & Version Control"],
    description: "Algorithmic thinking, complexity analysis, and modern code management practices.",
  },
  {
    id: "step-2",
    stageTitle: "2. Python & Modern Backend",
    status: "Completed",
    skills: ["Python Idioms", "OOP Patterns", "Asyncio"],
    description: "Advanced Python features, generators, decorators, and asynchronous concurrency.",
  },
  {
    id: "step-3",
    stageTitle: "3. Relational Data & SQL",
    status: "Completed",
    skills: ["SQL Queries", "Schema Design", "PostgreSQL"],
    description: "Relational modeling, normalization, indexing, and transactional isolation levels.",
  },
  {
    id: "step-4",
    stageTitle: "4. REST APIs & Services",
    status: "In Progress",
    skills: ["REST Architecture", "FastAPI", "API Security & JWT"],
    description: "Stateless API construction, schema validation, rate limiting, and token authorization.",
  },
  {
    id: "step-5",
    stageTitle: "5. Containerization & CI/CD",
    status: "In Progress",
    skills: ["Docker", "Docker Compose", "GitHub Actions"],
    description: "Multi-stage Docker builds, container networking, and automated testing pipelines.",
  },
  {
    id: "step-6",
    stageTitle: "6. Cloud Infrastructure",
    status: "Recommended",
    skills: ["AWS EC2", "S3", "RDS", "Serverless Basics"],
    description: "Deploying resilient services on managed cloud infrastructure with proper IAM policies.",
  },
  {
    id: "step-7",
    stageTitle: "7. Scalable System Design",
    status: "Recommended",
    skills: ["Caching (Redis)", "Load Balancing", "Message Queues", "CAP Theorem"],
    description: "Designing distributed applications capable of serving millions of concurrent users.",
  },
  {
    id: "step-8",
    stageTitle: "8. Mock Interview Prep",
    status: "Recommended",
    skills: ["Behavioral STAR", "Whiteboard Architecture", "Live Debugging"],
    description: "Rigorous interview rehearsals with structured AI feedback and time constraints.",
  },
];

export const DEMO_COURSES: CourseItem[] = [
  {
    id: "course-1",
    title: "Advanced SQL & Query Optimization",
    provider: "DataTech Academy",
    duration: "6 weeks (4 hrs/wk)",
    level: "Intermediate",
    skillsCovered: ["SQL", "Query Optimization", "Database Design", "PostgreSQL"],
    progress: 65,
    enrolled: true,
    rating: 4.8,
  },
  {
    id: "course-2",
    title: "System Design for High-Throughput Services",
    provider: "SystemCraft Institute",
    duration: "8 weeks (5 hrs/wk)",
    level: "Advanced",
    skillsCovered: ["System Design", "Microservices", "Caching", "Load Balancing"],
    progress: 20,
    enrolled: true,
    rating: 4.9,
  },
  {
    id: "course-3",
    title: "Production Docker & Container Fundamentals",
    provider: "CloudOps Labs",
    duration: "4 weeks (3 hrs/wk)",
    level: "Beginner",
    skillsCovered: ["Docker", "Containers", "DevOps", "Linux"],
    progress: 40,
    enrolled: false,
    rating: 4.7,
  },
  {
    id: "course-4",
    title: "Practical AWS Cloud Architecture",
    provider: "Cloud Architects Guild",
    duration: "7 weeks (4 hrs/wk)",
    level: "Intermediate",
    skillsCovered: ["AWS", "Cloud Computing", "VPC", "EC2", "S3"],
    progress: 10,
    enrolled: false,
    rating: 4.8,
  },
];

export const DEMO_SKILL_IMPROVEMENTS: SkillImprovementMetric[] = [
  {
    skill: "SQL Query Optimization",
    beforeLearningScore: 58,
    afterLearningScore: 76,
    delta: 18,
    assessmentCount: 2,
  },
  {
    skill: "Python Asynchronous Patterns",
    beforeLearningScore: 64,
    afterLearningScore: 84,
    delta: 20,
    assessmentCount: 3,
  },
  {
    skill: "REST API Security",
    beforeLearningScore: 52,
    afterLearningScore: 70,
    delta: 18,
    assessmentCount: 2,
  },
  {
    skill: "System Design Basics",
    beforeLearningScore: 35,
    afterLearningScore: 52,
    delta: 17,
    assessmentCount: 1,
  },
];

export const DEMO_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: "qb-1",
    role: "Software Engineer",
    difficulty: "Medium",
    topic: "Python",
    type: "Conceptual",
    title: "Python GIL & Concurrency Limitations",
    question:
      "What is the Global Interpreter Lock (GIL) in CPython, and what approaches can you use to achieve true parallelism for CPU-bound tasks?",
    answerGuidance:
      "Discuss how the GIL prevents multiple native threads from executing Python bytecodes simultaneously. Explain multiprocessing, C-extensions, and process pools as remedies for CPU-bound tasks versus asyncio for I/O.",
  },
  {
    id: "qb-2",
    role: "Software Engineer",
    difficulty: "Medium",
    topic: "SQL",
    type: "Conceptual",
    title: "Clustered vs Non-Clustered Indexes",
    question:
      "Differentiate between clustered and non-clustered indexes in relational databases. How does each affect table write and lookup performance?",
    answerGuidance:
      "A clustered index determines the physical order of data rows in a table (only one per table). Non-clustered indexes are secondary structures containing pointers back to the clustered key or row ID. Trade-offs involve read speed vs INSERT/UPDATE overhead.",
  },
  {
    id: "qb-3",
    role: "Software Engineer",
    difficulty: "Hard",
    topic: "System Design",
    type: "Scenario-based",
    title: "Design a Distributed Rate Limiter",
    question:
      "Design an API rate limiter service capable of handling 50,000 requests per second across a cluster of API gateways. Which rate limiting algorithms would you consider?",
    answerGuidance:
      "Evaluate Token Bucket, Leaky Bucket, and Sliding Window Counter algorithms. Discuss centralized Redis storage with Lua scripts to prevent race conditions vs local memory caching with gossip sync.",
  },
  {
    id: "qb-4",
    role: "Software Engineer",
    difficulty: "Medium",
    topic: "Data Structures",
    type: "Coding",
    title: "Implement LRU Cache",
    question:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations.",
    answerGuidance:
      "Combine a hash map with a doubly linked list. The hash map maps keys to list nodes for O(1) access; the doubly linked list maintains access order allowing O(1) removal and insertion at head/tail.",
  },
  {
    id: "qb-5",
    role: "Software Engineer",
    difficulty: "Easy",
    topic: "React",
    type: "Conceptual",
    title: "React Virtual DOM and Reconciliation",
    question:
      "How does the React Virtual DOM work, and how does the reconciliation algorithm minimize expensive DOM mutations?",
    answerGuidance:
      "React keeps a lightweight in-memory representation of the real DOM. When state changes, a new tree is created and diffed against the previous tree using heuristic O(n) algorithms and component keys.",
  },
  {
    id: "qb-6",
    role: "Software Engineer",
    difficulty: "Medium",
    topic: "Operating Systems",
    type: "Conceptual",
    title: "Deadlock Conditions & Prevention",
    question:
      "State the four necessary conditions for a deadlock to occur in a computing system (Coffman conditions) and describe how to eliminate at least one.",
    answerGuidance:
      "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Describe lock ordering to break circular wait or requiring all resources to be requested at once to break hold and wait.",
  },
];
