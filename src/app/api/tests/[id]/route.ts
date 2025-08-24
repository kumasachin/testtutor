import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ExamKitService } from "@/lib/examkit-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const includeQuestions = searchParams.get("includeQuestions") === "true";

    const result = await ExamKitService.getTestById(id, includeQuestions);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching test:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
