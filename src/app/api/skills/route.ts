import { NextRequest, NextResponse } from "next/server";
import { DEMO_SKILL_GAPS } from "../../../lib/demoData";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    targetRole: "Software Engineer",
    skills: DEMO_SKILL_GAPS,
  });
}
