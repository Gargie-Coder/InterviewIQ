import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: "coming_soon",
    message: "This feature module is currently under development in the InterviewIQ research pipeline.",
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    status: "coming_soon",
    message: "This feature module is currently under development in the InterviewIQ research pipeline.",
  });
}
