import { z } from "zod";

// Test Settings Schema
export const TestSettingsSchema = z.object({
  showResultsMode: z.enum(["immediate", "end", "never"]).default("end"),
  showExplanations: z.boolean().default(true),
  showCorrectAnswers: z.boolean().default(true),
  allowReview: z.boolean().default(true),
  shuffleQuestions: z.boolean().default(true),
  shuffleAnswers: z.boolean().default(true),
  timeLimit: z.number().optional(),
  passingScore: z.number().min(0).max(100).default(75),
});

export type TestSettings = z.infer<typeof TestSettingsSchema>;

// Test Attempt Schema
export const TestAttemptSchema = z.object({
  testId: z.string(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  settings: TestSettingsSchema,
  answers: z.record(z.string(), z.array(z.number())), // questionId -> selected option indices
  startedAt: z.date(),
  completedAt: z.date().optional(),
  score: z.number().optional(),
  percentage: z.number().optional(),
  timeSpent: z.number().optional(), // in seconds
});

export type TestAttempt = z.infer<typeof TestAttemptSchema>;

// Question Result Schema
export const QuestionResultSchema = z.object({
  questionId: z.string(),
  question: z.string(),
  userAnswers: z.array(z.number()),
  correctAnswers: z.array(z.number()),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
  options: z.array(
    z.object({
      label: z.string(),
      isCorrect: z.boolean(),
      feedback: z.string().optional(),
    })
  ),
  points: z.number(),
  timeSpent: z.number().optional(),
});

export type QuestionResult = z.infer<typeof QuestionResultSchema>;

// Test Results Schema
export const TestResultsSchema = z.object({
  attemptId: z.string(),
  testId: z.string(),
  testTitle: z.string(),
  totalQuestions: z.number(),
  correctAnswers: z.number(),
  incorrectAnswers: z.number(),
  skippedAnswers: z.number(),
  score: z.number(),
  percentage: z.number(),
  passed: z.boolean(),
  passingScore: z.number(),
  timeSpent: z.number(),
  timeLimit: z.number().optional(),
  completedAt: z.date(),
  questions: z.array(QuestionResultSchema),
  settings: TestSettingsSchema,
});

export type TestResults = z.infer<typeof TestResultsSchema>;
