import { NextRequest, NextResponse } from "next/server";
import { ExamKitService } from "@/lib/examkit-service";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Get user from session (optional for guest attempts)
    const authHeader = request.headers.get("authorization");
    let userId: string | undefined;
    let sessionId: string | undefined;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
      } = await supabase.auth.getUser(token);
      userId = user?.id;
    } else {
      // Generate session ID for guest attempts
      sessionId = `guest_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }

    const result = await ExamKitService.startTestAttempt(id, userId, sessionId);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error starting test attempt:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
