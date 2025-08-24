import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId: string;

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { userId: string };
      userId = decoded.userId;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Get user's test attempts with performance data
    const attempts = await prisma.testAttempt.findMany({
      where: {
        userId: userId,
        status: "COMPLETED",
      },
      include: {
        test: {
          include: {
            domain: true,
          },
        },
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    // Calculate statistics
    const totalTests = attempts.length;
    const totalScore = attempts.reduce(
      (sum, attempt) => sum + (attempt.percentage || 0),
      0
    );
    const averageScore =
      totalTests > 0 ? Math.round(totalScore / totalTests) : 0;
    const totalTimeSpent = attempts.reduce(
      (sum, attempt) => sum + (attempt.timeSpent || 0),
      0
    );

    // Calculate improvement rate (comparing first half vs second half of attempts)
    let improvementRate = 0;
    if (totalTests >= 4) {
      const halfPoint = Math.floor(totalTests / 2);
      const firstHalf = attempts.slice(-halfPoint);
      const secondHalf = attempts.slice(0, halfPoint);

      const firstHalfAvg =
        firstHalf.reduce((sum, a) => sum + (a.percentage || 0), 0) /
        firstHalf.length;
      const secondHalfAvg =
        secondHalf.reduce((sum, a) => sum + (a.percentage || 0), 0) /
        secondHalf.length;

      improvementRate = Math.round(secondHalfAvg - firstHalfAvg);
    }

    // Get recent activity (last 10 attempts)
    const recentActivity = attempts.slice(0, 10).map((attempt) => ({
      id: attempt.id,
      testTitle: attempt.test.title,
      domain: attempt.test.domain.displayName,
      score: attempt.percentage,
      completedAt: attempt.completedAt,
      timeSpent: attempt.timeSpent,
    }));

    // Get performance by domain
    const domainPerformance = attempts.reduce(
      (
        acc: Record<
          string,
          {
            name: string;
            attempts: number;
            totalScore: number;
            averageScore: number;
            bestScore: number;
            improvement: number;
          }
        >,
        attempt
      ) => {
        const domainName = attempt.test.domain.displayName;
        if (!acc[domainName]) {
          acc[domainName] = {
            name: domainName,
            attempts: 0,
            totalScore: 0,
            averageScore: 0,
            bestScore: 0,
            improvement: 0,
          };
        }

        acc[domainName].attempts++;
        acc[domainName].totalScore += attempt.percentage || 0;
        acc[domainName].bestScore = Math.max(
          acc[domainName].bestScore,
          attempt.percentage || 0
        );

        return acc;
      },
      {}
    );

    // Calculate averages for each domain
    Object.values(domainPerformance).forEach((domain) => {
      domain.averageScore = Math.round(domain.totalScore / domain.attempts);
    });

    // Get monthly progress (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyData = await prisma.testAttempt.findMany({
      where: {
        userId: userId,
        status: "COMPLETED",
        completedAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        percentage: true,
        completedAt: true,
      },
      orderBy: {
        completedAt: "asc",
      },
    });

    // Group by month
    const monthlyProgress = monthlyData.reduce(
      (
        acc: Record<
          string,
          {
            month: string;
            attempts: number;
            totalScore: number;
            averageScore: number;
          }
        >,
        attempt
      ) => {
        if (!attempt.completedAt) return acc;

        const month = attempt.completedAt.toISOString().slice(0, 7); // YYYY-MM
        if (!acc[month]) {
          acc[month] = {
            month,
            attempts: 0,
            totalScore: 0,
            averageScore: 0,
          };
        }

        acc[month].attempts++;
        acc[month].totalScore += attempt.percentage || 0;
        acc[month].averageScore = Math.round(
          acc[month].totalScore / acc[month].attempts
        );

        return acc;
      },
      {}
    );

    const stats = {
      totalTests,
      averageScore,
      timeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      improvementRate,
      recentActivity,
      domainPerformance: Object.values(domainPerformance),
      monthlyProgress: Object.values(monthlyProgress),
      streaks: {
        current: await calculateCurrentStreak(userId),
        longest: await calculateLongestStreak(userId),
      },
    };

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("User stats API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user statistics",
      },
      { status: 500 }
    );
  }
}

async function calculateCurrentStreak(userId: string): Promise<number> {
  const attempts = await prisma.testAttempt.findMany({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: "desc",
    },
  });

  if (attempts.length === 0) return 0;

  let streak = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const attempt of attempts) {
    if (!attempt.completedAt) break;

    const attemptDate = new Date(attempt.completedAt);
    attemptDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - attemptDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
    } else if (diffDays === streak + 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

async function calculateLongestStreak(userId: string): Promise<number> {
  const attempts = await prisma.testAttempt.findMany({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
    select: {
      completedAt: true,
    },
    orderBy: {
      completedAt: "asc",
    },
  });

  if (attempts.length === 0) return 0;

  let longestStreak = 1;
  let currentStreak = 1;
  let lastDate: Date | null = null;

  for (const attempt of attempts) {
    if (!attempt.completedAt) continue;

    const attemptDate = new Date(attempt.completedAt);
    attemptDate.setHours(0, 0, 0, 0);

    if (lastDate) {
      const diffDays = Math.floor(
        (attemptDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }

    lastDate = attemptDate;
  }

  return longestStreak;
}
