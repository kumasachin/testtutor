import { NextResponse } from "next/server";

import { AnalyticsService } from "@/lib/analytics";

export async function GET() {
  try {
    const analyticsService = AnalyticsService.getInstance();
    const analytics = await analyticsService.getDashboardAnalytics();

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics data",
      },
      { status: 500 }
    );
  }
}
