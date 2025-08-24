import { prisma } from "./prisma";
import type {
  CreateTestInput,
  Evaluation,
  ApiResponse,
  DbTest,
  DbUser,
} from "./types";
import { TestConfigSchema, QuestionSchema } from "./types";
import type { Prisma } from "@prisma/client";

type TestWithQuestions = {
  id: string;
  questions: Array<{
    id: string;
    points: number;
    options: Array<{
      id: string;
      isCorrect: boolean;
    }>;
  }>;
};

type AttemptWithTest = {
  id: string;
  startedAt: Date;
  answers: Record<string, string[]>;
  test: TestWithQuestions;
  userId?: string | null;
};

export class ExamKitService {
  // User operations
  static async createUser(data: {
    email: string;
    name?: string;
    role?: "ADMIN" | "USER";
  }): Promise<ApiResponse<DbUser>> {
    try {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role || "USER",
        },
      });

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create user",
      };
    }
  }

  static async getUserById(id: string): Promise<ApiResponse<DbUser>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return { success: false, error: "User not found" };
      }

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch user",
      };
    }
  }

  // Domain operations
  static async createDomain(data: {
    name: string;
    displayName: string;
    description?: string;
    config: Record<string, unknown>;
  }) {
    try {
      const domain = await prisma.domain.create({
        data: {
          name: data.name,
          displayName: data.displayName,
          description: data.description,
          config: data.config as Prisma.JsonObject,
        },
      });

      return { success: true, data: domain };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create domain",
      };
    }
  }

  static async getDomains() {
    try {
      const domains = await prisma.domain.findMany({
        where: { isActive: true },
        orderBy: { displayName: "asc" },
      });

      return { success: true, data: domains };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch domains",
      };
    }
  }

  // Test Management
  static async createTest(
    data: CreateTestInput,
    creatorId: string
  ): Promise<ApiResponse<DbTest>> {
    try {
      // Validate input
      const validatedConfig = TestConfigSchema.parse(data.config);

      // Validate questions
      for (const question of data.questions) {
        QuestionSchema.parse(question);
      }

      const test = await prisma.test.create({
        data: {
          title: data.title,
          description: data.description,
          domainId: data.domainId,
          creatorId,
          config: validatedConfig,
          submissionNote: data.submissionNote,
          status: "PENDING_REVIEW", // All tests start as pending
          passPercentage: validatedConfig.passPercentage,
          timeLimit: validatedConfig.timeLimit,
          shuffleQuestions: validatedConfig.shuffleQuestions,
          shuffleAnswers: validatedConfig.shuffleAnswers,
          isPublic: validatedConfig.accessSettings?.isPublic || false,
          questions: {
            create: data.questions.map((question, index) => ({
              stem: question.stem,
              type: question.type,
              explanation: question.explanation,
              points: question.points,
              difficulty: question.difficulty,
              order: index,
              tags: question.tags,
              options: {
                create: question.options.map((option, optIndex) => ({
                  label: option.label,
                  isCorrect: option.isCorrect,
                  feedback: option.feedback,
                  order: optIndex,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
          creator: true,
          domain: true,
        },
      });

      return { success: true, data: test as unknown as DbTest };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create test",
      };
    }
  }

  static async getTestById(id: string, includeQuestions = false) {
    try {
      const test = await prisma.test.findUnique({
        where: { id },
        include: {
          creator: true,
          domain: true,
          reviewer: true,
          questions: includeQuestions
            ? {
                include: {
                  options: true,
                },
                orderBy: { order: "asc" },
              }
            : false,
        },
      });

      if (!test) {
        return { success: false, error: "Test not found" };
      }

      return { success: true, data: test };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch test",
      };
    }
  }

  static async getTestsForReview(domainId?: string) {
    try {
      const tests = await prisma.test.findMany({
        where: {
          status: "PENDING_REVIEW",
          ...(domainId && { domainId }),
        },
        include: {
          creator: true,
          domain: true,
          questions: {
            include: {
              options: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });

      return { success: true, data: tests };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch pending tests",
      };
    }
  }

  static async approveTest(
    testId: string,
    reviewerId: string,
    reviewNote?: string
  ) {
    try {
      const test = await prisma.test.update({
        where: { id: testId },
        data: {
          status: "PUBLISHED",
          reviewerId,
          reviewNote,
          reviewedAt: new Date(),
          publishedAt: new Date(),
        },
        include: {
          creator: true,
          domain: true,
        },
      });

      // TODO: Send notification to creator

      return { success: true, data: test };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to approve test",
      };
    }
  }

  static async rejectTest(
    testId: string,
    reviewerId: string,
    reviewNote: string
  ) {
    try {
      const test = await prisma.test.update({
        where: { id: testId },
        data: {
          status: "REJECTED",
          reviewerId,
          reviewNote,
          reviewedAt: new Date(),
        },
        include: {
          creator: true,
          domain: true,
        },
      });

      // TODO: Send notification to creator

      return { success: true, data: test };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to reject test",
      };
    }
  }

  static async getPublishedTests(domainId?: string, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      const tests = await prisma.test.findMany({
        where: {
          status: "PUBLISHED",
          isPublic: true,
          ...(domainId && { domainId }),
        },
        include: {
          creator: {
            select: { id: true, name: true },
          },
          domain: true,
          _count: {
            select: { attempts: true },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      });

      const total = await prisma.test.count({
        where: {
          status: "PUBLISHED",
          isPublic: true,
          ...(domainId && { domainId }),
        },
      });

      return {
        success: true,
        data: {
          tests,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch published tests",
      };
    }
  }

  // Test Attempt Management
  static async startTestAttempt(
    testId: string,
    userId?: string,
    sessionId?: string
  ) {
    try {
      const attempt = await prisma.testAttempt.create({
        data: {
          testId,
          userId,
          sessionId,
          status: "IN_PROGRESS",
          answers: {},
        },
      });

      return { success: true, data: attempt };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to start test attempt",
      };
    }
  }

  static async updateTestAttempt(
    attemptId: string,
    answers: Record<string, string[]>
  ) {
    try {
      const attempt = await prisma.testAttempt.update({
        where: { id: attemptId },
        data: { answers },
      });

      return { success: true, data: attempt };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update test attempt",
      };
    }
  }

  static async completeTestAttempt(
    attemptId: string
  ): Promise<ApiResponse<Evaluation>> {
    try {
      const attempt = await prisma.testAttempt.findUnique({
        where: { id: attemptId },
        include: {
          test: {
            include: {
              questions: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      });

      if (!attempt) {
        return { success: false, error: "Test attempt not found" };
      }

      // Calculate score
      const evaluation = this.calculateScore({
        id: attempt.id,
        startedAt: attempt.startedAt,
        userId: attempt.userId,
        answers: attempt.answers as Record<string, string[]>,
        test: attempt.test,
      });

      // Update attempt with results
      await prisma.testAttempt.update({
        where: { id: attemptId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          score: evaluation.score,
          percentage: evaluation.percentage,
          timeSpent: Math.floor(
            (Date.now() - attempt.startedAt.getTime()) / 1000
          ),
        },
      });

      return { success: true, data: evaluation };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to complete test attempt",
      };
    }
  }

  private static calculateScore(attempt: AttemptWithTest): Evaluation {
    const { test, answers } = attempt;
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    const questionResults = test.questions.map((question) => {
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.id);

      const isCorrect =
        userAnswers.length === correctOptions.length &&
        userAnswers.every((id: string) => correctOptions.includes(id));

      if (isCorrect) {
        correctAnswers++;
        earnedPoints += question.points;
      }

      totalPoints += question.points;

      return {
        questionId: question.id,
        isCorrect,
        userAnswers,
        correctAnswers: correctOptions,
        points: question.points,
        earnedPoints: isCorrect ? question.points : 0,
      };
    });

    const passPercentage = 70; // Default pass percentage
    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = percentage >= passPercentage;

    return {
      attemptId: attempt.id,
      testId: test.id,
      userId: attempt.userId || undefined,
      totalQuestions: test.questions.length,
      correctAnswers,
      score: earnedPoints,
      percentage,
      passed,
      timeSpent: Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000),
      questionResults,
    };
  }
}
