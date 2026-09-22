import { NextRequest, NextResponse } from "next/server";
import { DEMO_SKILL_IMPROVEMENTS } from "../../../lib/demoData";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    metrics: {
      averageInterviewScore: 77,
      totalInterviewsCompleted: 4,
      resumesEvaluated: 3,
      skillImprovements: DEMO_SKILL_IMPROVEMENTS,
    },
  });
}
