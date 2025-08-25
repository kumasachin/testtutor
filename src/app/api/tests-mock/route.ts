import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainName = searchParams.get("domainName") || undefined;
    const category = searchParams.get("category") || undefined;

    // Mock Life in UK tests data
    if (domainName === "Life in UK" || category === "life-in-uk") {
      const mockLifeInUKTests = {
        success: true,
        data: {
          tests: [
            {
              id: "life-uk-test-1",
              title: "Life in UK Practice Test 1",
              description:
                "Official practice test for UK citizenship - covering British history, traditions, and government",
              _count: {
                questions: 24,
                attempts: 150,
              },
            },
            {
              id: "life-uk-test-2",
              title: "Life in UK Practice Test 2",
              description:
                "Additional practice questions covering British culture and society",
              _count: {
                questions: 24,
                attempts: 98,
              },
            },
            {
              id: "life-uk-test-3",
              title: "Life in UK History Test",
              description:
                "Focused test on British history from ancient times to modern day",
              _count: {
                questions: 24,
                attempts: 76,
              },
            },
            {
              id: "life-uk-test-4",
              title: "Life in UK Government and Politics",
              description:
                "Test covering the UK government system, politics, and democratic principles",
              _count: {
                questions: 24,
                attempts: 89,
              },
            },
            {
              id: "life-uk-test-5",
              title: "Life in UK Culture and Traditions",
              description:
                "Test about British culture, traditions, sports, and national celebrations",
              _count: {
                questions: 24,
                attempts: 112,
              },
            },
            {
              id: "life-uk-test-6",
              title: "Life in UK Geography Test",
              description:
                "Test covering the geography of the UK, regions, and important locations",
              _count: {
                questions: 24,
                attempts: 67,
              },
            },
          ],
        },
      };
      return NextResponse.json(mockLifeInUKTests);
    }

    // Return empty for other domains
    return NextResponse.json({
      success: true,
      data: {
        tests: [],
      },
    });
  } catch (error) {
    console.error("Error in tests-mock API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
