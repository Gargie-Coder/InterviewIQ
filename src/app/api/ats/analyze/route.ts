import { NextRequest, NextResponse } from "next/server";
import { evaluateAtsScore } from "../../../../services/atsScorer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resumeText = body.resumeText || "";
    const jobKeywords = body.jobKeywords || [];

    const atsResult = evaluateAtsScore(resumeText, jobKeywords);
    return NextResponse.json(atsResult);
  } catch (error: any) {
    console.error("ATS analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate ATS compatibility." },
      { status: 500 }
    );
  }
}
