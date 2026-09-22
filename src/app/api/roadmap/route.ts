import { NextRequest, NextResponse } from "next/server";
import { DEMO_ROADMAP } from "../../../lib/demoData";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    role: "Backend / Software Engineer",
    stages: DEMO_ROADMAP,
  });
}
