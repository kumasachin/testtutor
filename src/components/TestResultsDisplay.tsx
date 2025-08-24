"use client";

import { useState } from "react";

import type { TestResults, QuestionResult } from "@/lib/test-types";

interface TestResultsDisplayProps {
  results: TestResults;
  onRetake?: () => void;
  onBackToHome?: () => void;
}

export default function TestResultsDisplay({
  results,
  onRetake,
  onBackToHome,
}: TestResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "review">("overview");
  const [reviewMode, setReviewMode] = useState<"all" | "wrong" | "correct">(
    "all"
  );

  const filteredQuestions = results.questions.filter((question) => {
    if (reviewMode === "wrong") return !question.isCorrect;
    if (reviewMode === "correct") return question.isCorrect;
    return true;
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-50 border-green-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Results Header */}
      <div
        className={`bg-white rounded-lg shadow-sm border-2 p-8 mb-6 ${getScoreBgColor(
          results.percentage
        )}`}
      >
        <div className="text-center">
          <div className="mb-4">
            {results.passed ? (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {results.passed ? "Congratulations!" : "Test Complete"}
          </h1>

          <p className="text-gray-600 mb-4">
            {results.passed
              ? `You passed the ${results.testTitle}!`
              : `You scored ${results.percentage}% on the ${results.testTitle}`}
          </p>

          <div
            className={`text-5xl font-bold mb-2 ${getScoreColor(
              results.percentage
            )}`}
          >
            {results.percentage}%
          </div>

          <div className="text-sm text-gray-500">
            {results.correctAnswers} of {results.totalQuestions} questions
            correct
            {results.timeLimit && (
              <span> • Completed in {formatTime(results.timeSpent)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "review"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Review Questions ({results.questions.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {results.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {results.incorrectAnswers}
                  </div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.skippedAnswers}
                  </div>
                  <div className="text-sm text-gray-600">Skipped</div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span
                      className={`font-semibold ${getScoreColor(
                        results.percentage
                      )}`}
                    >
                      {results.score}/
                      {results.questions.reduce((sum, q) => sum + q.points, 0)}{" "}
                      points ({results.percentage}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Requirement:</span>
                    <span className="text-gray-900">
                      {results.passingScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Result:</span>
                    <span
                      className={`font-semibold ${
                        results.passed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {results.passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Taken:</span>
                    <span className="text-gray-900">
                      {formatTime(results.timeSpent)}
                    </span>
                  </div>
                  {results.timeLimit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="text-gray-900">
                        {formatTime(results.timeLimit * 60)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Recommendations
                </h3>
                {results.passed ? (
                  <div className="space-y-2 text-blue-800">
                    <p>
                      🎉 Great job! You&apos;ve successfully passed the test.
                    </p>
                    <p>
                      💡 Consider taking more advanced tests to further improve
                      your knowledge.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-blue-800">
                    <p>
                      📚 Review the questions you got wrong to improve your
                      understanding.
                    </p>
                    <p>
                      🔄 Take the test again when you&apos;re ready - practice
                      makes perfect!
                    </p>
                    <p>
                      ⏱️ Consider taking more time to read each question
                      carefully.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-6">
              {/* Filter Options */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setReviewMode("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    reviewMode === "all"
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Questions ({results.questions.length})
                </button>
                <button
                  onClick={() => setReviewMode("wrong")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    reviewMode === "wrong"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Incorrect ({results.incorrectAnswers})
                </button>
                <button
                  onClick={() => setReviewMode("correct")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    reviewMode === "correct"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Correct ({results.correctAnswers})
                </button>
              </div>

              {/* Questions Review */}
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => (
                  <QuestionReviewCard
                    key={question.questionId}
                    question={question}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {onRetake && (
          <button
            onClick={onRetake}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Take Test Again
          </button>
        )}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Back to Tests
          </button>
        )}
        <button
          onClick={() => window.print()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Print Results
        </button>
      </div>
    </div>
  );
}

function QuestionReviewCard({
  question,
  index,
}: {
  question: QuestionResult;
  index: number;
}) {
  return (
    <div
      className={`border-2 rounded-lg p-6 ${
        question.isCorrect
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">
          Question {index}
        </h4>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            question.isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {question.isCorrect ? "Correct" : "Incorrect"}
        </div>
      </div>

      <p className="text-gray-900 mb-4">{question.question}</p>

      <div className="space-y-2 mb-4">
        {question.options.map((option, optionIndex) => {
          const isUserAnswer = question.userAnswers.includes(optionIndex);
          const isCorrectOption = option.isCorrect;

          let optionStyle = "border-gray-300 bg-white";
          if (isCorrectOption) {
            optionStyle = "border-green-500 bg-green-50";
          } else if (isUserAnswer && !isCorrectOption) {
            optionStyle = "border-red-500 bg-red-50";
          }

          return (
            <div
              key={optionIndex}
              className={`p-3 border-2 rounded-lg ${optionStyle}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option.label}</span>
                <div className="flex items-center gap-2">
                  {isUserAnswer && (
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      Your answer
                    </span>
                  )}
                  {isCorrectOption && (
                    <span className="text-green-600">✓ Correct</span>
                  )}
                  {isUserAnswer && !isCorrectOption && (
                    <span className="text-red-600">✗ Wrong</span>
                  )}
                </div>
              </div>
              {option.feedback && (isUserAnswer || isCorrectOption) && (
                <div className="mt-2 text-sm text-gray-600">
                  {option.feedback}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {question.explanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-semibold text-blue-900 mb-2">Explanation:</h5>
          <p className="text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
