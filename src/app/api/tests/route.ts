import { NextRequest, NextResponse } from "next/server";
import { ExamKitService } from "@/lib/examkit-service";
import { CreateTestSchema } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if user is authenticated
    const authHeader = request.headers.get("authorization");
    let userId: string | undefined;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
      } = await supabase.auth.getUser(token);
      userId = user?.id;
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required to create tests" },
        { status: 401 }
      );
    }

    // Validate request data
    const validatedData = CreateTestSchema.parse(body);

    // Create test
    const result = await ExamKitService.createTest(validatedData, userId);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating test:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainId = searchParams.get("domainId") || undefined;
    const category = searchParams.get("category") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Handle category filtering by mapping to domain names
    let categoryDomainId = domainId;
    if (category && !domainId) {
      // Look up domain by name for category filtering
      const categoryMapping: Record<string, string> = {
        "life-in-uk": "life-in-uk",
        "driving-theory": "driving-theory",
      };
      
      const domainName = categoryMapping[category];
      if (domainName) {
        // Find domain by name to get the ID
        const domainResult = await ExamKitService.getDomainByName(domainName);
        if (domainResult.success && domainResult.data) {
          categoryDomainId = domainResult.data.id;
        }
      }
    }

    const result = await ExamKitService.getPublishedTests(
      categoryDomainId,
      page,
      limit
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching tests:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
