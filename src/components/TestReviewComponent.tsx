"use client";

import { useState } from "react";

import type { TestResults } from "@/lib/test-types";

interface TestReviewComponentProps {
  results: TestResults;
  onRetakeTest: () => void;
  onBackToTests: () => void;
}

export default function TestReviewComponent({
  results,
  onRetakeTest,
  onBackToTests,
}: TestReviewComponentProps) {
  const [currentReviewQuestion, setCurrentReviewQuestion] = useState(0);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);

  const questionsToReview = showOnlyIncorrect
    ? results.questions.filter((q) => !q.isCorrect)
    : results.questions;

  const currentQuestion = questionsToReview[currentReviewQuestion];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Test Results Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Complete!
          </h1>
          <h2 className="text-xl text-gray-600">{results.testTitle}</h2>
        </div>

        {/* Pass/Fail Status */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              results.passed
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {results.passed ? "🎉 PASSED" : "❌ FAILED"}
          </div>
          <p className="mt-2 text-gray-600">
            You need {results.passingScore}% to pass
          </p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div
            className={`text-center p-4 rounded-lg ${getScoreColor(
              results.percentage
            )}`}
          >
            <div className="text-3xl font-bold">{results.percentage}%</div>
            <div className="text-sm opacity-75">Final Score</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 text-blue-600">
            <div className="text-3xl font-bold">{results.correctAnswers}</div>
            <div className="text-sm opacity-75">Correct</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-red-50 text-red-600">
            <div className="text-3xl font-bold">{results.incorrectAnswers}</div>
            <div className="text-sm opacity-75">Incorrect</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-50 text-gray-600">
            <div className="text-3xl font-bold">
              {formatTime(results.timeSpent)}
            </div>
            <div className="text-sm opacity-75">Time Spent</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onRetakeTest}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Retake Test
          </button>
          <button
            onClick={onBackToTests}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            📚 Back to Tests
          </button>
        </div>
      </div>

      {/* Question Review Section */}
      {results.settings.allowReview &&
        results.settings.showResultsMode !== "never" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Question Review
              </h3>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showOnlyIncorrect}
                    onChange={(e) => {
                      setShowOnlyIncorrect(e.target.checked);
                      setCurrentReviewQuestion(0);
                    }}
                    className="text-red-600 focus:ring-red-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Show only incorrect answers ({results.incorrectAnswers})
                  </span>
                </label>
              </div>
            </div>

            {questionsToReview.length > 0 ? (
              <>
                {/* Question Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() =>
                      setCurrentReviewQuestion(
                        Math.max(0, currentReviewQuestion - 1)
                      )
                    }
                    disabled={currentReviewQuestion === 0}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Question {currentReviewQuestion + 1} of{" "}
                    {questionsToReview.length}
                    {showOnlyIncorrect && " (incorrect only)"}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentReviewQuestion(
                        Math.min(
                          questionsToReview.length - 1,
                          currentReviewQuestion + 1
                        )
                      )
                    }
                    disabled={
                      currentReviewQuestion === questionsToReview.length - 1
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>

                {/* Current Question Review */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 flex-1">
                      {currentQuestion.question}
                    </h4>
                    <div
                      className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                        currentQuestion.isCorrect
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currentQuestion.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, index) => {
                      const isUserAnswer =
                        currentQuestion.userAnswers.includes(index);
                      const isCorrectAnswer =
                        currentQuestion.correctAnswers.includes(index);

                      let optionStyle = "border-gray-200 bg-gray-50";
                      let iconElement = null;

                      if (isCorrectAnswer && isUserAnswer) {
                        // User selected correct answer
                        optionStyle =
                          "border-green-500 bg-green-50 text-green-900";
                        iconElement = (
                          <span className="text-green-600 ml-2">✓</span>
                        );
                      } else if (isCorrectAnswer && !isUserAnswer) {
                        // Correct answer user didn't select
                        optionStyle =
                          "border-green-500 bg-green-50 text-green-900";
                        iconElement = (
                          <span className="text-green-600 ml-2">
                            ✓ (Correct)
                          </span>
                        );
                      } else if (!isCorrectAnswer && isUserAnswer) {
                        // User selected wrong answer
                        optionStyle = "border-red-500 bg-red-50 text-red-900";
                        iconElement = (
                          <span className="text-red-600 ml-2">
                            ✗ (Your answer)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={index}
                          className={`p-4 border-2 rounded-lg ${optionStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex-1">{option.label}</span>
                            {iconElement}
                          </div>
                          {option.feedback &&
                            (isUserAnswer || isCorrectAnswer) && (
                              <div className="mt-2 text-sm opacity-75 border-t pt-2">
                                <strong>Feedback:</strong> {option.feedback}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {results.settings.showExplanations &&
                    currentQuestion.explanation && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-semibold text-blue-900 mb-2">
                          📖 Explanation:
                        </h5>
                        <p className="text-blue-800">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    )}
                </div>

                {/* Question Grid Navigation */}
                <div className="mt-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Quick Navigation:
                  </h5>
                  <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-2">
                    {questionsToReview.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReviewQuestion(index)}
                        className={`w-8 h-8 text-xs rounded border transition-colors ${
                          index === currentReviewQuestion
                            ? "bg-blue-600 text-white border-blue-600"
                            : question.isCorrect
                              ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
                              : "bg-red-100 text-red-800 border-red-300 hover:bg-red-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🎉</div>
                <p className="text-gray-600">
                  Great job! You got all questions correct.
                </p>
              </div>
            )}
          </div>
        )}

      {/* Study Recommendations */}
      {results.incorrectAnswers > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-3">
            📚 Study Recommendations
          </h3>
          <div className="space-y-2 text-orange-800">
            <p>
              • You got {results.incorrectAnswers} question(s) wrong. Review
              these topics for better understanding.
            </p>
            <p>• Focus on areas where you selected incorrect answers.</p>
            <p>
              • Read the explanations carefully to understand the correct
              reasoning.
            </p>
            <p>
              • Consider retaking the test once you&apos;ve studied the missed
              topics.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
