"use client";

import { useState, useEffect, useCallback } from "react";

import type {
  TestSettings,
  QuestionResult,
  TestResults,
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
          <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
          {timeRemaining !== null && (
            <div
              className={`text-lg font-mono px-4 py-2 rounded-lg ${
                timeRemaining <= 300
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              ⏱️ {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span>{Object.keys(answers).length} answered</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / test.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion.stem}
          </h2>
          <p className="text-sm text-gray-500">
            {currentQuestion.type === "MULTIPLE_CHOICE"
              ? "Select all correct answers"
              : "Select one answer"}
          </p>
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

        {/* Explanation */}
        {showResult &&
          settings.showExplanations &&
          currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex gap-3">
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isLastQuestion ? "Finish Test" : "Continue →"}
            </button>
          ) : (
            <>
              <button
                onClick={handleNext}
                disabled={userAnswer.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastQuestion ? "Finish Test" : "Next →"}
              </button>

              {isLastQuestion && (
                <button
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Test"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
