import { z } from "zod";

// Domain configuration schema
export const DomainConfigSchema = z.object({
  defaultTimeLimit: z.number().positive(),
  defaultPassPercentage: z.number().min(1).max(100),
  allowedQuestionTypes: z.array(
    z.enum([
      "SINGLE_CHOICE",
      "MULTIPLE_CHOICE",
      "TRUE_FALSE",
      "FILL_IN_BLANK",
      "ESSAY",
    ])
  ),
  maxQuestionsPerTest: z.number().positive(),
  enableAutoApproval: z.boolean(),
  requireReview: z.boolean(),
  customFields: z.record(z.string(), z.unknown()).optional(),
});

export type DomainConfig = z.infer<typeof DomainConfigSchema>;

// Test settings
export const TestConfigSchema = z.object({
  timeLimit: z.number().positive().optional(),
  passPercentage: z.number().min(1).max(100),
  shuffleQuestions: z.boolean(),
  shuffleAnswers: z.boolean(),
  showResults: z.boolean(),
  allowRetakes: z.boolean(),
  maxAttempts: z.number().positive().optional(),
  accessSettings: z
    .object({
      isPublic: z.boolean(),
      requireAuth: z.boolean(),
      allowedUsers: z.array(z.string()).optional(),
      accessCode: z.string().optional(),
    })
    .optional(),
});

export type TestConfig = z.infer<typeof TestConfigSchema>;

// Question and option schemas
export const OptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  isCorrect: z.boolean(),
  feedback: z.string().optional(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  stem: z.string().min(1),
  type: z.enum([
    "SINGLE_CHOICE",
    "MULTIPLE_CHOICE",
    "TRUE_FALSE",
    "FILL_IN_BLANK",
    "ESSAY",
  ]),
  options: z.array(OptionSchema),
  explanation: z.string().optional(),
  points: z.number().positive(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).default([]),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Option = z.infer<typeof OptionSchema>;

// Test creation/update schemas
export const CreateTestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  domainId: z.string(),
  config: TestConfigSchema,
  questions: z.array(QuestionSchema).min(1),
  submissionNote: z.string().optional(),
});

export const UpdateTestSchema = CreateTestSchema.partial().extend({
  id: z.string(),
});

export type CreateTestInput = z.infer<typeof CreateTestSchema>;
export type UpdateTestInput = z.infer<typeof UpdateTestSchema>;

// Test attempt schemas
export const TestAttemptSchema = z.object({
  id: z.string(),
  testId: z.string(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "ABANDONED", "TIMED_OUT"]),
  answers: z.record(z.string(), z.array(z.string())), // questionId -> selected option IDs
  startedAt: z.date(),
  completedAt: z.date().optional(),
  timeSpent: z.number().optional(),
});

export type TestAttempt = z.infer<typeof TestAttemptSchema>;

// Evaluation schemas
export const EvaluationSchema = z.object({
  attemptId: z.string(),
  testId: z.string(),
  userId: z.string().optional(),
  totalQuestions: z.number(),
  correctAnswers: z.number(),
  score: z.number(),
  percentage: z.number(),
  passed: z.boolean(),
  timeSpent: z.number(),
  questionResults: z.array(
    z.object({
      questionId: z.string(),
      isCorrect: z.boolean(),
      userAnswers: z.array(z.string()),
      correctAnswers: z.array(z.string()),
      points: z.number(),
      earnedPoints: z.number(),
    })
  ),
});

export type Evaluation = z.infer<typeof EvaluationSchema>;

// User and domain types
export const UserRoleSchema = z.enum(["SUPER_ADMIN", "ADMIN", "USER", "GUEST"]);
export const DomainRoleSchema = z.enum([
  "ADMIN",
  "MODERATOR",
  "CREATOR",
  "VIEWER",
]);
export const TestStatusSchema = z.enum([
  "DRAFT",
  "PENDING_REVIEW",
  "PUBLISHED",
  "REJECTED",
  "ARCHIVED",
]);

export type UserRole = z.infer<typeof UserRoleSchema>;
export type DomainRole = z.infer<typeof DomainRoleSchema>;
export type TestStatus = z.infer<typeof TestStatusSchema>;

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Utility types for database entities
export interface DbUser {
  id: string;
  email: string;
  name?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "USER" | "GUEST";
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbDomain {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  icon?: string;
  config: DomainConfig;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbTest {
  id: string;
  title: string;
  description?: string | null;
  domainId: string;
  creatorId: string;
  status: TestStatus;
  config: TestConfig;
  passPercentage: number;
  timeLimit?: number | null;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  isPublic: boolean;
  submissionNote?: string | null;
  reviewNote?: string | null;
  reviewerId?: string | null;
  reviewedAt?: Date | null;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Export all schemas for validation
export const schemas = {
  DomainConfig: DomainConfigSchema,
  TestConfig: TestConfigSchema,
  Question: QuestionSchema,
  Option: OptionSchema,
  CreateTest: CreateTestSchema,
  UpdateTest: UpdateTestSchema,
  TestAttempt: TestAttemptSchema,
  Evaluation: EvaluationSchema,
  UserRole: UserRoleSchema,
  DomainRole: DomainRoleSchema,
  TestStatus: TestStatusSchema,
  ApiResponse: ApiResponseSchema,
};
