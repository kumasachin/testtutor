"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  QuestionResult,
  TestResults,
  TestSettings,
} from "@/lib/test-types";

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
  questions: Question[];
}

interface TestTakingInterfaceProps {
  test: Test;
  onComplete: (results: TestResults) => void;
  initialSettings?: Partial<TestSettings>;
}

export default function TestTakingInterface({
  test,
  onComplete,
  initialSettings = {},
}: TestTakingInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [startTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    test.timeLimit ? test.timeLimit * 60 : null
  );
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const [settings] = useState<TestSettings>({
    showResultsMode: "end",
    showExplanations: true,
    showCorrectAnswers: true,
    allowReview: true,
    shuffleQuestions: false,
    shuffleAnswers: false,
    timeLimit: test.timeLimit,
    passingScore: test.passPercentage,
    ...initialSettings,
  });

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const userAnswer = answers[currentQuestion?.id] || [];

  const handleSubmitTest = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const endTime = new Date();
      const timeSpent = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      );

      // Calculate results for all questions
      const allResults: QuestionResult[] = test.questions.map((question) => {
        const userAnswers = answers[question.id] || [];
        return calculateQuestionResult(question, userAnswers);
      });

      const correctCount = allResults.filter(
        (result) => result.isCorrect
      ).length;
      const totalScore = allResults.reduce(
        (sum, result) => sum + result.points,
        0
      );
      const maxScore = test.questions.reduce((sum, q) => sum + q.points, 0);
      const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      const results: TestResults = {
        attemptId: `attempt-${Date.now()}`,
        testId: test.id,
        testTitle: test.title,
        totalQuestions: test.questions.length,
        correctAnswers: correctCount,
        incorrectAnswers: test.questions.length - correctCount,
        skippedAnswers: test.questions.length - Object.keys(answers).length,
        score: totalScore,
        percentage: Math.round(percentage * 100) / 100,
        passed: percentage >= settings.passingScore,
        passingScore: settings.passingScore,
        timeSpent,
        timeLimit: test.timeLimit,
        completedAt: endTime,
        questions: allResults,
        settings,
      };

      // Save attempt to database (API call)
      await fetch("/api/test-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          answers,
          timeSpent,
          score: totalScore,
          percentage,
        }),
      });

      onComplete(results);
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [test, answers, startTime, settings, onComplete, isSubmitting]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev && prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, handleSubmitTest]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const questionId = currentQuestion.id;

    if (
      currentQuestion.type === "SINGLE_CHOICE" ||
      currentQuestion.type === "TRUE_FALSE"
    ) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: [optionIndex],
      }));

      // Show immediate feedback for single choice questions
      if (settings.showResultsMode === "immediate") {
        showQuestionResult();
      }
    } else if (currentQuestion.type === "MULTIPLE_CHOICE") {
      setAnswers((prev) => {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(optionIndex)
          ? currentAnswers.filter((idx) => idx !== optionIndex)
          : [...currentAnswers, optionIndex];

        return {
          ...prev,
          [questionId]: newAnswers,
        };
      });
    }
  };

  const calculateQuestionResult = (
    question: Question,
    userAnswers: number[]
  ): QuestionResult => {
    const correctIndices = question.options
      .map((option, index) => (option.isCorrect ? index : -1))
      .filter((index) => index !== -1);

    const isCorrect =
      userAnswers.length === correctIndices.length &&
      userAnswers.every((answer) => correctIndices.includes(answer)) &&
      correctIndices.every((correct) => userAnswers.includes(correct));

    return {
      questionId: question.id,
      question: question.stem,
      userAnswers,
      correctAnswers: correctIndices,
      isCorrect,
      explanation: question.explanation,
      options: question.options.map((option) => ({
        label: option.label,
        isCorrect: option.isCorrect,
        feedback: option.feedback,
      })),
      points: isCorrect ? question.points : 0,
    };
  };

  const showQuestionResult = () => {
    if (settings.showResultsMode !== "immediate") return;
    setShowResult(true);
  };

  const hideQuestionResult = () => {
    setShowResult(false);
  };

  const handleNext = () => {
    if (settings.showResultsMode === "immediate" && userAnswer.length > 0) {
      showQuestionResult();
      return;
    }

    if (isLastQuestion) {
      handleSubmitTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      hideQuestionResult();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (!currentQuestion) {
    return <div className="text-center py-8">Loading question...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {Object.keys(answers).length === 0
                ? "🌟 You&apos;ve got this! Take your time and read each question carefully. Every expert was once a beginner!"
                : Object.keys(answers).length === test.questions.length
                  ? "🎉 Fantastic! All questions answered! You&apos;re doing amazing - ready to submit when you are."
                  : Object.keys(answers).length === 1
                    ? "✨ Great start! You&apos;re building momentum - keep it up!"
                    : Object.keys(answers).length >= test.questions.length * 0.8
                      ? `🔥 You&apos;re on fire! Just ${test.questions.length - Object.keys(answers).length} more question${test.questions.length - Object.keys(answers).length === 1 ? "" : "s"} to go!`
                      : `💪 Excellent progress! ${test.questions.length - Object.keys(answers).length} more to go - you&apos;re doing great!`}
            </p>
          </div>
          {timeRemaining !== null && (
            <div
              className={`text-lg font-mono px-4 py-2 rounded-lg flex items-center gap-2 ${
                timeRemaining <= 300
                  ? "bg-red-100 text-red-600 animate-pulse"
                  : timeRemaining <= 600
                    ? "bg-amber-100 text-amber-600"
                    : "bg-blue-100 text-blue-600"
              }`}
            >
              <span>
                {timeRemaining <= 300
                  ? "⚠️"
                  : timeRemaining <= 600
                    ? "⏰"
                    : "⏱️"}
              </span>
              <span>{formatTime(timeRemaining)}</span>
              {timeRemaining <= 300 && (
                <span className="text-xs font-bold">
                  Time&apos;s running out!
                </span>
              )}
              {timeRemaining <= 60 && (
                <span className="text-xs">🏃‍♂️ Final sprint!</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ {Object.keys(answers).length} answered
            </span>
            {Object.keys(answers).length < test.questions.length && (
              <span className="text-gray-500">
                • {test.questions.length - Object.keys(answers).length}{" "}
                {test.questions.length - Object.keys(answers).length === 1
                  ? "question"
                  : "questions"}{" "}
                remaining
              </span>
            )}
            {Object.keys(answers).length > 0 &&
              Object.keys(answers).length < test.questions.length && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-bounce">
                  🌟 Keep going!
                </span>
              )}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>
              {Math.round(
                (Object.keys(answers).length / test.questions.length) * 100
              )}
              % complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                Object.keys(answers).length === test.questions.length
                  ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg"
                  : Object.keys(answers).length >= test.questions.length * 0.75
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                    : Object.keys(answers).length >= test.questions.length * 0.5
                      ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-blue-400 to-blue-600"
              }`}
              role="progressbar"
              aria-valuenow={Math.round(
                (Object.keys(answers).length / test.questions.length) * 100
              )}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{
                width: `${
                  (Object.keys(answers).length / test.questions.length) * 100
                }%`,
              }}
            >
              {Object.keys(answers).length === test.questions.length && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"></div>
              )}
              {Object.keys(answers).length >= test.questions.length * 0.75 &&
                Object.keys(answers).length < test.questions.length && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-30 animate-pulse"></div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex-1">
              {currentQuestion.stem}
            </h2>
            <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentQuestion.points}{" "}
              {currentQuestion.points === 1 ? "point" : "points"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              {currentQuestion.type === "MULTIPLE_CHOICE"
                ? "🔍 Select all correct answers - multiple choices may be right!"
                : currentQuestion.type === "TRUE_FALSE"
                  ? "🤔 Is this statement true or false? Think carefully!"
                  : "🎯 Choose the best answer from the options below"}
            </p>
            {userAnswer.length === 0 && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="animate-pulse">💭</span>
                Answer required to continue
              </span>
            )}
            {userAnswer.length > 0 && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                ✨ Great choice! Ready to move on?
              </span>
            )}
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = userAnswer.includes(index);
            const showCorrect = showResult && settings.showCorrectAnswers;
            const isCorrectOption = option.isCorrect;

            let optionStyle = "border-gray-300 bg-white hover:bg-gray-50";

            if (isSelected) {
              optionStyle = "border-blue-500 bg-blue-50";
            }

            if (showCorrect) {
              if (isCorrectOption) {
                optionStyle = "border-green-500 bg-green-50";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-red-500 bg-red-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${optionStyle} ${
                  showResult ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      isSelected ? "border-current" : "border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                  </div>
                  <span className="flex-1">{option.label}</span>
                  {showCorrect && isCorrectOption && (
                    <span className="text-green-600 ml-2">✓</span>
                  )}
                  {showCorrect && isSelected && !isCorrectOption && (
                    <span className="text-red-600 ml-2">✗</span>
                  )}
                </div>
                {showResult &&
                  option.feedback &&
                  (isSelected || isCorrectOption) && (
                    <div className="mt-2 text-sm text-gray-600 ml-8">
                      {option.feedback}
                    </div>
                  )}
              </button>
            );
          })}
        </div>

        {/* General Feedback for Immediate Mode */}
        {showResult && settings.showResultsMode === "immediate" && (
          <div className="mt-6 p-4 rounded-lg text-center">
            {(() => {
              const result = calculateQuestionResult(
                currentQuestion,
                userAnswer
              );
              return (
                <div
                  className={`space-y-2 ${result.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div
                    className={`text-2xl ${result.isCorrect ? "text-green-600" : "text-red-600"}`}
                  >
                    {result.isCorrect ? "🎉" : "😔"}
                  </div>
                  <div
                    className={`text-lg font-semibold ${result.isCorrect ? "text-green-600" : "text-red-600"}`}
                  >
                    {result.isCorrect
                      ? "🎉 Excellent! That's absolutely correct!"
                      : "🤗 Not quite right, but hey - learning is a journey!"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.isCorrect
                      ? `Amazing! You earned ${currentQuestion.points} ${currentQuestion.points === 1 ? "point" : "points"}! 🌟`
                      : "Don&apos;t worry - every mistake is a step closer to mastery! 💪"}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Explanation */}
        {showResult &&
          settings.showExplanations &&
          currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                💡 Here&apos;s the science behind it!
              </h4>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          ← Previous
        </button>

        <div className="flex gap-3 items-center">
          {/* Progress encouragement */}
          {!showResult && Object.keys(answers).length > 0 && (
            <div className="text-sm text-gray-500 hidden sm:block">
              🚀{" "}
              {Math.round(
                (Object.keys(answers).length / test.questions.length) * 100
              )}
              % complete!
              {Object.keys(answers).length === test.questions.length - 1 &&
                " 🏃‍♂️ One more question - you&apos;re almost there!"}
              {Object.keys(answers).length >= test.questions.length * 0.8 &&
                Object.keys(answers).length < test.questions.length - 1 &&
                " 🔥 You&apos;re crushing it!"}
              {Object.keys(answers).length >= test.questions.length * 0.5 &&
                Object.keys(answers).length < test.questions.length * 0.8 &&
                " 💪 Halfway there - keep the momentum going!"}
            </div>
          )}

          {showResult ? (
            <button
              onClick={() => {
                hideQuestionResult();
                if (isLastQuestion) {
                  handleSubmitTest();
                } else {
                  setCurrentQuestionIndex((prev) => prev + 1);
                }
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {isLastQuestion ? "🏁 Finish Test" : "Continue →"}
            </button>
          ) : (
            <>
              <button
                onClick={handleNext}
                disabled={userAnswer.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLastQuestion ? "🏁 Finish Test" : "Next →"}
              </button>

              {isLastQuestion && userAnswer.length > 0 && (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? "⏳ Submitting..." : "✅ Submit Test"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Ready to Submit Your Amazing Work?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Take a moment to feel proud - you&apos;ve put in great effort!
                🌟
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Questions answered:</span>
                  <span className="font-medium">
                    {Object.keys(answers).length} of {test.questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span className="font-medium">
                    {Math.round(
                      (Object.keys(answers).length / test.questions.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                {Object.keys(answers).length < test.questions.length && (
                  <div className="text-amber-600 text-xs mt-2 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>
                      You have unanswered questions. That&apos;s okay though -
                      you can still submit if you&apos;re ready!
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              Once submitted, you won&apos;t be able to make any changes. Take a
              deep breath - you&apos;ve prepared well! 🌟
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
              >
                📝 Take Another Look
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  handleSubmitTest();
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                🚀 Submit with Confidence!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
