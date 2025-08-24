import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface AnalyticsData {
  totalTests: number;
  totalQuestions: number;
  totalAttempts: number;
  totalUsers: number;
  totalDomains: number;
  recentActivity: {
    newTests: number;
    newQuestions: number;
    newAttempts: number;
  };
  testsByStatus: {
    draft: number;
    pendingReview: number;
    published: number;
    rejected: number;
    archived: number;
  };
  questionsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  topPerformingTests: Array<{
    id: string;
    title: string;
    attempts: number;
    averageScore: number;
    domain: string;
  }>;
  domainStats: Array<{
    id: string;
    name: string;
    displayName: string;
    testsCount: number;
    questionsCount: number;
    attemptsCount: number;
    averageScore: number;
  }>;
}

export class AnalyticsService {
  private static instance: AnalyticsService;

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async getDashboardAnalytics(): Promise<AnalyticsData> {
    const [
      totalTests,
      totalQuestions,
      totalAttempts,
      totalUsers,
      totalDomains,
      recentTests,
      recentQuestions,
      recentAttempts,
      testsByStatus,
      questionsByDifficulty,
      topTests,
      domainData,
    ] = await Promise.all([
      this.getTotalCounts(),
      this.getQuestionCount(),
      this.getAttemptCount(),
      this.getUserCount(),
      this.getDomainCount(),
      this.getRecentTestCount(),
      this.getRecentQuestionCount(),
      this.getRecentAttemptCount(),
      this.getTestsByStatus(),
      this.getQuestionsByDifficulty(),
      this.getTopPerformingTests(),
      this.getDomainStats(),
    ]);

    return {
      totalTests,
      totalQuestions,
      totalAttempts,
      totalUsers,
      totalDomains,
      recentActivity: {
        newTests: recentTests,
        newQuestions: recentQuestions,
        newAttempts: recentAttempts,
      },
      testsByStatus,
      questionsByDifficulty,
      topPerformingTests: topTests,
      domainStats: domainData,
    };
  }

  private async getTotalCounts(): Promise<number> {
    return await prisma.test.count();
  }

  private async getQuestionCount(): Promise<number> {
    return await prisma.question.count();
  }

  private async getAttemptCount(): Promise<number> {
    return await prisma.testAttempt.count();
  }

  private async getUserCount(): Promise<number> {
    return await prisma.user.count();
  }

  private async getDomainCount(): Promise<number> {
    return await prisma.domain.count();
  }

  private async getRecentTestCount(): Promise<number> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return await prisma.test.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });
  }

  private async getRecentQuestionCount(): Promise<number> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return await prisma.question.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });
  }

  private async getRecentAttemptCount(): Promise<number> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return await prisma.testAttempt.count({
      where: {
        startedAt: {
          gte: oneWeekAgo,
        },
      },
    });
  }

  private async getTestsByStatus() {
    const statusCounts = await prisma.test.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    return {
      draft: statusCounts.find((s) => s.status === "DRAFT")?._count.status || 0,
      pendingReview:
        statusCounts.find((s) => s.status === "PENDING_REVIEW")?._count
          .status || 0,
      published:
        statusCounts.find((s) => s.status === "PUBLISHED")?._count.status || 0,
      rejected:
        statusCounts.find((s) => s.status === "REJECTED")?._count.status || 0,
      archived:
        statusCounts.find((s) => s.status === "ARCHIVED")?._count.status || 0,
    };
  }

  private async getQuestionsByDifficulty() {
    const difficultyCounts = await prisma.question.groupBy({
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });

    return {
      easy:
        difficultyCounts.find((d) => d.difficulty === "EASY")?._count
          .difficulty || 0,
      medium:
        difficultyCounts.find((d) => d.difficulty === "MEDIUM")?._count
          .difficulty || 0,
      hard:
        difficultyCounts.find((d) => d.difficulty === "HARD")?._count
          .difficulty || 0,
    };
  }

  private async getTopPerformingTests() {
    const tests = await prisma.test.findMany({
      where: {
        status: "PUBLISHED",
        attempts: {
          some: {
            status: "COMPLETED",
          },
        },
      },
      include: {
        domain: true,
        attempts: {
          where: {
            status: "COMPLETED",
          },
          select: {
            percentage: true,
          },
        },
        _count: {
          select: {
            attempts: true,
          },
        },
      },
      take: 10,
    });

    return tests
      .map((test) => {
        const completedAttempts = test.attempts.filter(
          (a) => a.percentage !== null
        );
        const averageScore =
          completedAttempts.length > 0
            ? completedAttempts.reduce(
                (sum, attempt) => sum + (attempt.percentage || 0),
                0
              ) / completedAttempts.length
            : 0;

        return {
          id: test.id,
          title: test.title,
          attempts: test._count.attempts,
          averageScore: Math.round(averageScore * 100) / 100,
          domain: test.domain.displayName,
        };
      })
      .sort((a, b) => b.attempts - a.attempts);
  }

  private async getDomainStats() {
    const domains = await prisma.domain.findMany({
      include: {
        tests: {
          include: {
            _count: {
              select: {
                questions: true,
                attempts: true,
              },
            },
            attempts: {
              where: {
                status: "COMPLETED",
                percentage: {
                  not: null,
                },
              },
              select: {
                percentage: true,
              },
            },
          },
        },
      },
    });

    return domains.map((domain) => {
      const testsCount = domain.tests.length;
      const questionsCount = domain.tests.reduce(
        (sum, test) => sum + test._count.questions,
        0
      );
      const attemptsCount = domain.tests.reduce(
        (sum, test) => sum + test._count.attempts,
        0
      );

      const allAttempts = domain.tests.flatMap((test) => test.attempts);
      const averageScore =
        allAttempts.length > 0
          ? allAttempts.reduce(
              (sum, attempt) => sum + (attempt.percentage || 0),
              0
            ) / allAttempts.length
          : 0;

      return {
        id: domain.id,
        name: domain.name,
        displayName: domain.displayName,
        testsCount,
        questionsCount,
        attemptsCount,
        averageScore: Math.round(averageScore * 100) / 100,
      };
    });
  }

  async getUserAnalytics(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        testAttempts: {
          include: {
            test: {
              include: {
                domain: true,
              },
            },
          },
          orderBy: {
            startedAt: "desc",
          },
        },
        createdTests: {
          include: {
            domain: true,
            _count: {
              select: {
                questions: true,
                attempts: true,
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    const completedAttempts = user.testAttempts.filter(
      (attempt) => attempt.status === "COMPLETED"
    );
    const averageScore =
      completedAttempts.length > 0
        ? completedAttempts.reduce(
            (sum, attempt) => sum + (attempt.percentage || 0),
            0
          ) / completedAttempts.length
        : 0;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      totalAttempts: user.testAttempts.length,
      completedAttempts: completedAttempts.length,
      averageScore: Math.round(averageScore * 100) / 100,
      testsCreated: user.createdTests.length,
      recentAttempts: user.testAttempts.slice(0, 5),
      createdTests: user.createdTests,
    };
  }

  async getTestAnalytics(testId: string) {
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        domain: true,
        creator: true,
        questions: {
          include: {
            options: true,
          },
        },
        attempts: {
          include: {
            user: true,
          },
          orderBy: {
            startedAt: "desc",
          },
        },
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    });

    if (!test) return null;

    const completedAttempts = test.attempts.filter(
      (attempt) => attempt.status === "COMPLETED"
    );
    const averageScore =
      completedAttempts.length > 0
        ? completedAttempts.reduce(
            (sum, attempt) => sum + (attempt.percentage || 0),
            0
          ) / completedAttempts.length
        : 0;

    const passRate =
      completedAttempts.length > 0
        ? (completedAttempts.filter(
            (attempt) => (attempt.percentage || 0) >= test.passPercentage
          ).length /
            completedAttempts.length) *
          100
        : 0;

    return {
      ...test,
      analytics: {
        totalAttempts: test.attempts.length,
        completedAttempts: completedAttempts.length,
        averageScore: Math.round(averageScore * 100) / 100,
        passRate: Math.round(passRate * 100) / 100,
        averageTimeSpent:
          completedAttempts.length > 0
            ? Math.round(
                completedAttempts.reduce(
                  (sum, attempt) => sum + (attempt.timeSpent || 0),
                  0
                ) / completedAttempts.length
              )
            : 0,
      },
    };
  }
}
