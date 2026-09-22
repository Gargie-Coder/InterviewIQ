# InterviewIQ — AI-Powered Career Preparation Platform

> **"Prepare smarter. Interview better."**

InterviewIQ is a modern, full-stack career preparation and interview platform built with an exceptionally clean, trustworthy, light-first professional SaaS aesthetic. It is engineered to help candidates analyze their resume, benchmark themselves against real job requirements, identify skill gaps, practice multi-turn mock interviews with quantitative grading, follow structured learning roadmaps, and track improvement over time.

---

## 🚀 Quick Start (5-Minute Evaluation Walkthrough)

### 1. Installation

```bash
# Clone or navigate to the repository directory
cd IQ

# Install dependencies
npm install

# (Optional) Copy environment variables template
cp .env.example .env.local

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🎯 Guided Evaluator Walkthrough (5–10 Minutes)

1. **Landing Page (`/`)**:
   - Notice the light-first, distraction-free aesthetic (no dark futuristic tropes, neon glows, or robot images).
   - Review the **12-Feature Architecture Grid**, which clearly distinguishes working features (**Available**) from upcoming research modules (**Coming Soon**).
   - Click **Get Started** or **Demo Candidate** in the header.

2. **Command Center Dashboard (`/dashboard`)**:
   - Evaluator is greeted with candidate **Alex Sharma** (Software Engineer).
   - View top-level metrics: **Resume Score (78/100)**, **Job Match (82%)**, **Interview Readiness (71%)**, and **Skill Coverage (73%)**.
   - Review the **Skill Overview** horizontal bars and **Recommended Next Steps**.
   - Click **Start Interview** or use the sidebar navigation.

3. **Resume Analyzer (`/resume-analyzer`) — [FUNCTIONAL]**:
   - Drag and drop any PDF resume, or click **Load Demo Resume**.
   - View the overall score (**78/100**) and the 5-dimension breakdown (**Skills: 82, Experience: 76, Projects: 81, Formatting: 74, Keywords: 79**).
   - Read itemized **Key Strengths** and **Recommended Improvements**.
   - Switch to the **Extracted Entities & Credentials** tab to inspect parsed contact details, education, experience bullets, and skill tags.

4. **Job Description Match (`/job-match`) — [FUNCTIONAL]**:
   - Click **Load Sample Job Description** (or paste your own job posting).
   - Click **Analyze Job Match**.
   - Inspect the **Job Match Score (82%)**, dimension scores (Skill: 84%, Experience: 78%, Education: 90%), and the tri-category breakdown:
     - **Strong Matches**: Python, SQL, REST APIs, Git, PostgreSQL, Java
     - **Partial Matches**: Docker, AWS
     - **Missing Skills**: Kubernetes, System Design

5. **ATS Compatibility Estimate (`/ats-score`) — [FUNCTIONAL]**:
   - View the **InterviewIQ ATS Compatibility Estimate (78/100)**.
   - Review the 6-dimension breakdown (Keywords, Formatting, Skills, Experience, Job Relevance, Section Completeness).
   - Examine the indexed vs. missing keywords and actionable optimization checklist.

6. **AI Mock Interviewer (`/interview`) — [FUNCTIONAL]**:
   - Select a role (e.g. **Software Engineer**, Backend, Frontend, Data Analyst, Data Scientist).
   - Click **Begin Interview Session**.
   - Notice the split layout: Candidate information & progress on the left, AI Interviewer on the right.
   - Type an answer or click **Fill Sample Answer** and submit.
   - The AI evaluates your answer against a 5-dimension rubric: **Relevance, Technical Depth, Clarity, Communication, Confidence**, returning an **Answer Score**, observed strengths, and tips.
   - Advance through questions to view the **Final Interview Assessment Summary** scorecard!

7. **Preview Upcoming Research Modules [COMING SOON]**:
   - **Coding Sandbox (`/coding`)**: Split-pane problem viewer + code editor layout with test runner UI and complexity monitors.
   - **Skill Gaps (`/skill-gaps`)**: Visual competency bars comparing candidate levels against role benchmarks, categorized into Strong, Developing, and Needs Improvement.
   - **Role Preparation (`/role-prep`)**: Tracks across 8 roles with required skills, common topics, and curriculum paths.
   - **Topic Question Bank (`/questions`)**: Filterable by topic, difficulty, and question type with expandable answer guidance.
   - **Role Assessment Exams (`/exams`)**: Multi-section timed exam specification for Backend Developers.
   - **Learning Roadmap (`/roadmap`)**: Step-by-step visual progression from Foundation to Interview Prep.
   - **Course Recommendations (`/courses`)**: Curated courses addressing identified candidate deficits.
   - **Skill Improvement Test (`/skill-test`)**: Before vs. After learning delta analytics (+18.5% mean gain).
   - **Progress Analytics (`/analytics`)**: Historical interview scores, topic mastery, and radar benchmarks.

---

## 🛡️ Feature Implementation Status Matrix

| Module | Status | Description |
| :--- | :---: | :--- |
| **Resume Analyzer** | ✅ **Functional** | PDF parsing, entity extraction, 5-score breakdown, strengths & improvements |
| **Job Description Match** | ✅ **Functional** | Overlap matching, strong/partial/missing skills, dimensional scores |
| **ATS Score Estimator** | ✅ **Functional** | Heuristic compatibility scoring, keyword indexing, actionable suggestions |
| **AI Mock Interviewer** | ✅ **Functional** | Multi-turn interview, 5-dimension rubric evaluations, final summary scorecard |
| **Demo Mode** | ✅ **Functional** | 1-click candidate pre-population (Alex Sharma) with persistent reset |
| **Coding Sandbox** | ⏳ *Coming Soon* | High-fidelity UI with editor, problem specs, test runner, and sandbox notice |
| **Skill Gap Engine** | ⏳ *Coming Soon* | Multi-category visual comparison bars with threshold indicators |
| **Role-Specific Preparation** | ⏳ *Coming Soon* | Comprehensive tracks for 8 engineering roles |
| **Question Bank** | ⏳ *Coming Soon* | Searchable repository with difficulty and topic filters |
| **Role Exams** | ⏳ *Coming Soon* | Timed multi-section diagnostic exam blueprint |
| **Learning Roadmap** | ⏳ *Coming Soon* | Step-by-step milestone progression pipeline |
| **Course Recommendations** | ⏳ *Coming Soon* | Curated course cards with progress meters |
| **Skill Improvement Test** | ⏳ *Coming Soon* | Before vs. After comparative delta analytics |
| **Progress Analytics** | ⏳ *Coming Soon* | Historical score trends, mastery curves, and topic telemetry |
| **Candidate Profile** | ✅ **Functional** | Editable personal profile, target role selection, and preferences |
| **Settings** | ✅ **Functional** | Account, theme, notifications, and privacy preferences |

---

## 🔑 Environment Variables & AI Configuration

InterviewIQ runs out-of-the-box in **Demo / Offline Mode** using a deterministic heuristic evaluation engine.

To connect live generative AI for interview answer grading:
1. Create a `.env.local` file in the root directory.
2. Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Or alternatively: `OPENAI_API_KEY=your_openai_key_here`)*
3. Restart the server (`npm run dev`). The application will automatically route evaluation requests to live AI models while falling back gracefully if offline.

---

## 🔬 Future Research Architecture

Located in `src/services/research/competencyPipeline.ts`, this architecture outlines the longitudinal calibration pipeline:

$$\text{Resume} + \text{Job Description} \longrightarrow \text{Skill Extraction} \longrightarrow \text{Competency Graph} \longrightarrow \text{Adaptive Interview} \longrightarrow \text{Coding Sandbox} \longrightarrow \text{Multi-Source Evidence Integration} \longrightarrow \text{Skill Gap Calibration} \longrightarrow \text{Personalized Learning Loop} \longrightarrow \text{Re-Assessment Delta}$$

---

## 🏛️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Light-first SaaS palette)
- **Icons**: Lucide React
- **Text & PDF Parsing**: `pdf-parse`
- **Component Architecture**: Modular, accessible, and responsive components
