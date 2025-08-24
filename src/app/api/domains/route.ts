import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ExamKitService } from "@/lib/examkit-service";

export async function GET() {
  try {
    const result = await ExamKitService.getDomains();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching domains:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, displayName, description, config } = body;

    if (!name || !displayName) {
      return NextResponse.json(
        { success: false, error: "Name and display name are required" },
        { status: 400 }
      );
    }

    const result = await ExamKitService.createDomain({
      name,
      displayName,
      description,
      config: config || {},
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating domain:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
