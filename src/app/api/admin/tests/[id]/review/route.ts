import { NextRequest, NextResponse } from "next/server";
import { ExamKitService } from "@/lib/examkit-service";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, reviewNote } = body;

    // Check admin authorization
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid authentication" },
        { status: 401 }
      );
    }

    // Get user role from database
    const userResult = await ExamKitService.getUserById(user.id);
    if (
      !userResult.success ||
      !userResult.data ||
      userResult.data.role !== "ADMIN"
    ) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    let result;
    if (action === "approve") {
      result = await ExamKitService.approveTest(id, user.id, reviewNote);
    } else if (action === "reject") {
      if (!reviewNote) {
        return NextResponse.json(
          { success: false, error: "Review note is required for rejection" },
          { status: 400 }
        );
      }
      result = await ExamKitService.rejectTest(id, user.id, reviewNote);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "approve" or "reject"' },
        { status: 400 }
      );
    }

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error reviewing test:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
