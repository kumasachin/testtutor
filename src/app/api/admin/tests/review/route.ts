import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ExamKitService } from "@/lib/examkit-service";
import { supabase } from "@/lib/supabase";

// Admin routes for test review and approval
export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);
    const domainId = searchParams.get("domainId") || undefined;

    const result = await ExamKitService.getTestsForReview(domainId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching tests for review:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
