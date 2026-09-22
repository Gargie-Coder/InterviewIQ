import { NextRequest, NextResponse } from "next/server";
import { aiService } from "../../../../services/aiService";
import { InterviewQuestion, RoleType } from "../../../../types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question: InterviewQuestion = body.question;
    const answer: string = body.answer || "";
    const role: RoleType = body.role || "Software Engineer";

    if (!question || !question.question) {
      return NextResponse.json(
        { error: "Interview question object is required." },
        { status: 400 }
      );
    }

    const evaluation = await aiService.evaluateInterviewAnswer(question, answer, role);
    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error("Interview answer API error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer." },
      { status: 500 }
    );
  }
}
