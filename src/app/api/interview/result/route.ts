import { NextRequest, NextResponse } from "next/server";
import { DEMO_INTERVIEW_SUMMARY } from "../../../../lib/demoData";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(DEMO_INTERVIEW_SUMMARY);
  } catch (error: any) {
    console.error("Interview result API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve interview results." },
      { status: 500 }
    );
  }
}
