"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Test {
  id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passPercentage: number;
  domainId: string;
  domain?: {
    id: string;
    name: string;
    displayName: string;
  };
  questions?: Question[];
}

interface Question {
  id: string;
  stem: string;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
  options: Array<{
    id: string;
    label: string;
    isCorrect: boolean;
    feedback?: string;
  }>;
  explanation?: string;
  points: number;
  order: number;
}

interface Test {
  id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passPercentage: number;
  domainId: string;
  domain?: {
    id: string;
    name: string;
    displayName: string;
  };
  questions?: Question[];
}

interface TestSettings {
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  showResultsMode: "immediate" | "end";
  enableExplanations: boolean;
  autoAdvance: boolean;
}

interface SimpleTestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SimpleTestPage({ params }: SimpleTestPageProps) {
  const router = useRouter();
  const [testId, setTestId] = useState<string | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test taking state
  const [testStarted, setTestStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [processedQuestions, setProcessedQuestions] = useState<Question[]>([]);

  // Test settings
  const [testSettings, setTestSettings] = useState<TestSettings>({
    shuffleQuestions: false,
    shuffleAnswers: false,
    showResultsMode: "end",
    enableExplanations: true,
    autoAdvance: false,
  });

  // Related tests
  const [relatedTests, setRelatedTests] = useState<
    Array<{
      id: string;
      title: string;
      description?: string;
      _count: { attempts: number };
    }>
  >([]);

  // Function to fetch related tests from the same domain
  const fetchRelatedTests = async (
    domainName: string,
    currentTestId: string
  ) => {
    try {
      const response = await fetch(
        `/api/tests?domainName=${encodeURIComponent(domainName)}&limit=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch related tests");
      }

      const data = await response.json();
      if (data.success && data.data?.tests) {
        // Filter out current test and limit to 10 most recent
        const filtered = data.data.tests
          .filter((test: Test) => test.id !== currentTestId)
          .slice(0, 10);
        setRelatedTests(filtered);
      }
    } catch (err) {
      console.error("Error fetching related tests:", err);
    }
  };

  useEffect(() => {
    const initializeTestId = async () => {
      const resolvedParams = await params;
      setTestId(resolvedParams.id);
    };

    initializeTestId();
  }, [params]);

  useEffect(() => {
    if (!testId) return;

    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/tests/${testId}?includeQuestions=true`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch test");
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to load test");
        }

        console.log("Test data received:", data.data);
        console.log("Questions:", data.data.questions);
        setTest(data.data);
        // Initialize timer when test is loaded
        if (data.data.timeLimit) {
          setTimeRemaining(data.data.timeLimit * 60); // Convert to seconds
        }

        // Fetch related tests from the same domain
        if (data.data.domain?.name) {
          fetchRelatedTests(data.data.domain.name, data.data.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Timer effect
  useEffect(() => {
    if (!testStarted || timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev && prev <= 1) {
          // Auto-submit when time runs out
          handleSubmitTest();
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeRemaining]);

  // Shuffle array utility function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Process questions based on settings
  const processQuestionsWithSettings = (questions: Question[]): Question[] => {
    let processed = [...questions];

    // Shuffle questions if enabled
    if (testSettings.shuffleQuestions) {
      processed = shuffleArray(processed);
    }

    // Shuffle answers for each question if enabled
    if (testSettings.shuffleAnswers) {
      processed = processed.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }));
    }

    return processed;
  };

  const handleStartTest = () => {
    if (test?.questions) {
      const processed = processQuestionsWithSettings(test.questions);
      setProcessedQuestions(processed);
    }
    setTestStarted(true);
    setShowSettings(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleSettingChange = (
    setting: keyof TestSettings,
    value: boolean | string
  ) => {
    setTestSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitAnswer = (questionId: string) => {
    setSubmittedQuestions((prev) => new Set(prev).add(questionId));

    // Auto-advance if enabled (after showing feedback)
    if (testSettings.autoAdvance) {
      setTimeout(() => {
        handleNextQuestion();
      }, 3000);
    }
  };

  const handleNextQuestion = () => {
    if (
      processedQuestions &&
      currentQuestionIndex < processedQuestions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    // TODO: Implement test submission logic
    alert("Test submitted! (Implementation pending)");
    setTestStarted(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleBackToTests = () => {
    router.push("/lifeInUk");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Test Not Found
            </h2>
            <p className="text-red-700 mb-4">
              {error || "The requested test could not be found."}
            </p>
            <button
              onClick={handleBackToTests}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test taking interface
  if (testStarted && processedQuestions && processedQuestions.length > 0) {
    const currentQuestion = processedQuestions[currentQuestionIndex];
    const isLastQuestion =
      currentQuestionIndex === processedQuestions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with timer and progress */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {test.title}
                </h1>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of{" "}
                  {processedQuestions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {timeRemaining !== null && (
                  <div
                    className={`text-lg font-mono ${
                      timeRemaining < 300 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    Time: {formatTime(timeRemaining)}
                  </div>
                )}
                <button
                  onClick={() => setTestStarted(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Exit Test
                </button>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / processedQuestions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                {currentQuestion.stem}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === option.id;
                const isSubmitted = submittedQuestions.has(currentQuestion.id);
                const showResults =
                  testSettings.showResultsMode === "immediate" &&
                  isSelected &&
                  isSubmitted;
                const isCorrect = option.isCorrect;

                let optionStyle =
                  "w-full text-left p-4 border-2 rounded-lg transition-all ";

                if (showResults) {
                  if (isCorrect) {
                    optionStyle += "border-green-500 bg-green-50";
                  } else {
                    optionStyle += "border-red-500 bg-red-50";
                  }
                } else if (isSelected) {
                  optionStyle += "border-blue-500 bg-blue-50";
                } else {
                  optionStyle +=
                    "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleAnswerSelect(currentQuestion.id, option.id)
                    }
                    disabled={isSubmitted}
                    className={
                      optionStyle +
                      (isSubmitted ? " cursor-not-allowed opacity-75" : "")
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                            showResults
                              ? isCorrect
                                ? "border-green-500 bg-green-500 text-white"
                                : "border-red-500 bg-red-500 text-white"
                              : isSelected
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-gray-300 text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900">{option.label}</span>
                      </div>
                      {showResults && (
                        <div className="flex items-center">
                          {isCorrect ? (
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm6.707-8.293a1 1 0 00-1.414-1.414L10 13.586l-5.293-5.293a1 1 0 00-1.414 1.414L8.586 15l7.121-7.121z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Answer Button (only show if answer is selected but not submitted yet) */}
            {answers[currentQuestion.id] &&
              !submittedQuestions.has(currentQuestion.id) &&
              testSettings.showResultsMode === "immediate" && (
                <div className="mb-6 text-center">
                  <button
                    onClick={() => handleSubmitAnswer(currentQuestion.id)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

            {/* Show explanation immediately if enabled and answer is submitted */}
            {testSettings.showResultsMode === "immediate" &&
              submittedQuestions.has(currentQuestion.id) &&
              testSettings.enableExplanations &&
              currentQuestion.explanation && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Explanation:
                  </h4>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </div>
              )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={isFirstQuestion}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isFirstQuestion
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-3">
                {isLastQuestion ? (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>

            {/* Related Tests Section */}
            {relatedTests.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  More Tests from {test?.domain?.displayName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedTests.slice(0, 6).map((relatedTest) => (
                    <div
                      key={relatedTest.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        router.push(`/test/${relatedTest.id}`);
                      }}
                    >
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {relatedTest.title}
                      </h4>
                      {relatedTest.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {relatedTest.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedTest._count.attempts} attempts</span>
                        <span className="text-blue-600 hover:text-blue-800">
                          Take Test →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {relatedTests.length > 6 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        if (test?.domain?.name) {
                          router.push(`/${test.domain.name}`);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View All {test?.domain?.displayName} Tests →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Test settings interface
  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              onClick={() => setShowSettings(false)}
              className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Test Overview
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Settings
            </h1>
            <p className="text-gray-600 mb-8">
              Customize your test experience with these options:
            </p>

            <div className="space-y-6">
              {/* Question Order */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  Question Order
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Shuffle Questions
                    </h4>
                    <p className="text-sm text-gray-600">
                      Randomize the order of questions for each test attempt
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testSettings.shuffleQuestions}
                      onChange={(e) =>
                        handleSettingChange(
                          "shuffleQuestions",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Answer Options */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Answer Options
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Shuffle Answer Choices
                    </h4>
                    <p className="text-sm text-gray-600">
                      Randomize the position of A, B, C, D options for each
                      question
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testSettings.shuffleAnswers}
                      onChange={(e) =>
                        handleSettingChange("shuffleAnswers", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Results Display */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Results Display
                </h3>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    When to show correct answers
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showResultsMode"
                        value="immediate"
                        checked={testSettings.showResultsMode === "immediate"}
                        onChange={(e) =>
                          handleSettingChange("showResultsMode", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        <strong>Immediately</strong> - Show correct answer after
                        submitting each question
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showResultsMode"
                        value="end"
                        checked={testSettings.showResultsMode === "end"}
                        onChange={(e) =>
                          handleSettingChange("showResultsMode", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        <strong>At the end</strong> - Show all results only
                        after test completion
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Additional Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Show Explanations
                      </h4>
                      <p className="text-sm text-gray-600">
                        Display explanations for questions when available
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testSettings.enableExplanations}
                        onChange={(e) =>
                          handleSettingChange(
                            "enableExplanations",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Auto-advance Questions
                      </h4>
                      <p className="text-sm text-gray-600">
                        Automatically move to next question after selection (3
                        second delay)
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testSettings.autoAdvance}
                        onChange={(e) =>
                          handleSettingChange("autoAdvance", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleStartTest}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
              >
                Start Test with These Settings
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test overview/start page
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleBackToTests}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Tests
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {test.title}
          </h1>

          {test.description && (
            <p className="text-gray-600 mb-6">{test.description}</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {test.questions?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {test.passPercentage}%
              </div>
              <div className="text-sm text-gray-600">Pass Rate</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {test.timeLimit || 45}
              </div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {test.questions?.reduce((sum, q) => sum + q.points, 0) || 24}
              </div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">
              Test Instructions
            </h3>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>
                • This test contains {test.questions?.length || 0} questions
              </li>
              <li>
                • You have {test.timeLimit || 45} minutes to complete the test
              </li>
              <li>• You need {test.passPercentage}% to pass</li>
              <li>• Select the best answer for each question</li>
              <li>
                • You can navigate between questions using the Next/Previous
                buttons
              </li>
              <li>• Click &quot;Submit Test&quot; when you&apos;re finished</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleStartTest}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Start Test
            </button>
            <button
              onClick={handleShowSettings}
              className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium text-lg"
            >
              ⚙️ Configure Test
            </button>
            <button
              onClick={handleBackToTests}
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
