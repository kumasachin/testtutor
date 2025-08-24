import type { QuestionResult, TestResults } from "@/lib/test-types";

export const createMockTestResults = (
  overrides: Partial<TestResults> = {}
): TestResults => {
  const defaultResults: TestResults = {
    attemptId: "test-attempt-1",
    testId: "test-1",
    testTitle: "Sample Test",
    totalQuestions: 4,
    correctAnswers: 3,
    incorrectAnswers: 1,
    skippedAnswers: 0,
    score: 3,
    percentage: 75,
    passed: true,
    passingScore: 70,
    timeSpent: 1200, // 20 minutes
    timeLimit: 30,
    completedAt: new Date("2024-01-01T12:00:00Z"),
    questions: [
      {
        questionId: "1",
        question: "What is 2 + 2?",
        userAnswers: [1],
        correctAnswers: [1],
        isCorrect: true,
        explanation: "Simple addition: 2 + 2 = 4",
        options: [
          { label: "3", isCorrect: false },
          { label: "4", isCorrect: true },
          { label: "5", isCorrect: false },
        ],
        points: 1,
        timeSpent: 30,
      },
      {
        questionId: "2",
        question: "What is the capital of France?",
        userAnswers: [0],
        correctAnswers: [1],
        isCorrect: false,
        explanation: "Paris is the capital and largest city of France",
        options: [
          { label: "Berlin", isCorrect: false },
          { label: "Paris", isCorrect: true },
          { label: "Madrid", isCorrect: false },
        ],
        points: 1,
        timeSpent: 45,
      },
      {
        questionId: "3",
        question: "Is the Earth round?",
        userAnswers: [0],
        correctAnswers: [0],
        isCorrect: true,
        explanation: "The Earth is approximately spherical",
        options: [
          { label: "True", isCorrect: true },
          { label: "False", isCorrect: false },
        ],
        points: 1,
        timeSpent: 20,
      },
      {
        questionId: "4",
        question: "What is 5 × 6?",
        userAnswers: [2],
        correctAnswers: [2],
        isCorrect: true,
        explanation: "5 multiplied by 6 equals 30",
        options: [
          { label: "25", isCorrect: false },
          { label: "35", isCorrect: false },
          { label: "30", isCorrect: true },
        ],
        points: 1,
        timeSpent: 25,
      },
    ],
    settings: {
      showResultsMode: "end" as const,
      showExplanations: true,
      showCorrectAnswers: true,
      allowReview: true,
      shuffleQuestions: false,
      shuffleAnswers: false,
      passingScore: 70,
    },
  };

  return { ...defaultResults, ...overrides };
};

export const createMockQuestionResult = (
  overrides: Partial<QuestionResult> = {}
): QuestionResult => {
  const defaultQuestion: QuestionResult = {
    questionId: "q1",
    question: "Sample question?",
    userAnswers: [0],
    correctAnswers: [0],
    isCorrect: true,
    explanation: "Sample explanation",
    options: [
      { label: "Option A", isCorrect: true },
      { label: "Option B", isCorrect: false },
    ],
    points: 1,
    timeSpent: 30,
  };

  return { ...defaultQuestion, ...overrides };
};
