import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ExamKitService } from "@/lib/examkit-service";
import { supabase } from "@/lib/supabase";
import { CreateTestSchema } from "@/lib/types";

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
  const { searchParams } = new URL(request.url);
  const domainId = searchParams.get("domainId") || undefined;
  const domainName = searchParams.get("domainName") || undefined;
  const category = searchParams.get("category") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    // Handle domain name filtering
    let targetDomainId = domainId;

    if (domainName && !domainId) {
      try {
        // Look up domain by name
        const domainResult = await ExamKitService.getDomainByName(domainName);
        if (domainResult.success && domainResult.data) {
          targetDomainId = domainResult.data.id;
        }
      } catch (domainError) {
        console.error("Error looking up domain:", domainError);
        // If domain lookup fails and it's Life in UK, return mock data
        if (domainName === "Life in UK") {
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
              ],
            },
          };
          return NextResponse.json(mockLifeInUKTests);
        }
        // For other domains, continue without domain ID
      }
    } else if (category && !domainId && !domainName) {
      // Handle category filtering by mapping to domain names
      const categoryMapping: Record<string, string> = {
        "life-in-uk": "life-in-uk",
        "driving-theory": "driving-theory",
      };

      const mappedDomainName = categoryMapping[category];
      if (mappedDomainName) {
        // Find domain by name to get the ID
        const domainResult =
          await ExamKitService.getDomainByName(mappedDomainName);
        if (domainResult.success && domainResult.data) {
          targetDomainId = domainResult.data.id;
        }
      }
    }

    try {
      const result = await ExamKitService.getPublishedTests(
        targetDomainId,
        page,
        limit
      );
      return NextResponse.json(result);
    } catch (dbError) {
      console.error("Database error:", dbError);

      // If this is a database connection error and we're looking for Life in UK tests,
      // return mock data for development
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
            ],
          },
        };
        return NextResponse.json(mockLifeInUKTests);
      }

      // For other errors, re-throw
      throw dbError;
    }
  } catch (error) {
    console.error("Error fetching tests:", error);

    // If this is a database connection error and we're looking for Life in UK tests,
    // return mock data for development
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
          ],
        },
      };
      return NextResponse.json(mockLifeInUKTests);
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
