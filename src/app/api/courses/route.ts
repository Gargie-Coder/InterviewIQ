import { NextRequest, NextResponse } from "next/server";
import { DEMO_COURSES } from "../../../lib/demoData";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    courses: DEMO_COURSES,
  });
}
