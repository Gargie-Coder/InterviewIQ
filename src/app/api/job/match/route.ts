import { NextRequest, NextResponse } from "next/server";
import { matchJobDescription } from "../../../../services/jobMatcher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const candidateSkills = body.candidateSkills || [];
    const jobDescription = body.jobDescription || "";
    const targetRole = body.targetRole || "Software Engineer";

    const matchResult = matchJobDescription(candidateSkills, jobDescription, targetRole);
    return NextResponse.json(matchResult);
  } catch (error: any) {
    console.error("Job match API error:", error);
    return NextResponse.json(
      { error: "Failed to compute job match." },
      { status: 500 }
    );
  }
}
