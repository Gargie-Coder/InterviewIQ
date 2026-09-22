import { NextRequest, NextResponse } from "next/server";
import { DEMO_INTERVIEW_QUESTIONS } from "../../../../lib/demoData";
import { RoleType } from "../../../../types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const role: RoleType = body.role || "Software Engineer";

    const filtered = DEMO_INTERVIEW_QUESTIONS.filter((q) => q.role === role);
    const questions = filtered.length > 0 ? filtered : DEMO_INTERVIEW_QUESTIONS;

    return NextResponse.json({
      role,
      questionCount: questions.length,
      questions,
    });
  } catch (error: any) {
    console.error("Interview start API error:", error);
    return NextResponse.json(
      { error: "Failed to initialize interview." },
      { status: 500 }
    );
  }
}
