"use client";

import { useState } from "react";

import type { TestSettings } from "@/lib/test-types";

interface TestSettingsComponentProps {
  initialSettings?: Partial<TestSettings>;
  onSettingsChange: (settings: TestSettings) => void;
  onStartTest: () => void;
  testInfo: {
    title: string;
    description?: string;
    questionCount: number;
    timeLimit?: number;
    passingScore: number;
  };
}

export default function TestSettingsComponent({
  initialSettings = {},
  onSettingsChange,
  onStartTest,
  testInfo,
}: TestSettingsComponentProps) {
  const [settings, setSettings] = useState<TestSettings>({
    showResultsMode: "end",
    showExplanations: true,
    showCorrectAnswers: true,
    allowReview: true,
    shuffleQuestions: false,
    shuffleAnswers: false,
    timeLimit: testInfo.timeLimit,
    passingScore: testInfo.passingScore,
    ...initialSettings,
  });

  const updateSetting = <K extends keyof TestSettings>(
    key: K,
    value: TestSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const formatTime = (minutes?: number) => {
    if (!minutes) return "No limit";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Test Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {testInfo.title}
        </h1>
        {testInfo.description && (
          <p className="text-gray-600 mb-4">{testInfo.description}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {testInfo.questionCount}
            </div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatTime(testInfo.timeLimit)}
            </div>
            <div className="text-sm text-gray-600">Time Limit</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {testInfo.passingScore}%
            </div>
            <div className="text-sm text-gray-600">Pass Score</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              Multiple Choice
            </div>
            <div className="text-sm text-gray-600">Question Type</div>
          </div>
        </div>
      </div>

      {/* Test Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Test Settings
        </h2>

        <div className="space-y-6">
          {/* Results Display Mode */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <label className="block text-lg font-semibold text-blue-900 mb-4">
              ⚡ Answer Feedback Settings
            </label>
            <p className="text-blue-700 text-sm mb-4">
              Choose when you want to see if your answers are correct or wrong
            </p>
            <div className="space-y-3">
              <label className="flex items-start p-4 bg-white rounded-lg border-2 border-transparent hover:border-blue-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="showResultsMode"
                  value="immediate"
                  checked={settings.showResultsMode === "immediate"}
                  onChange={(e) =>
                    updateSetting(
                      "showResultsMode",
                      e.target.value as "immediate" | "end" | "never"
                    )
                  }
                  className="text-blue-600 focus:ring-blue-500 mt-1"
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    🔍 Instant Feedback (After each question)
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    See the correct answer immediately after answering each
                    question. Perfect for learning and understanding mistakes
                    right away.
                  </div>
                </div>
              </label>

              <label className="flex items-start p-4 bg-white rounded-lg border-2 border-transparent hover:border-blue-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="showResultsMode"
                  value="end"
                  checked={settings.showResultsMode === "end"}
                  onChange={(e) =>
                    updateSetting(
                      "showResultsMode",
                      e.target.value as "immediate" | "end" | "never"
                    )
                  }
                  className="text-blue-600 focus:ring-blue-500 mt-1"
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    📊 Review at End (Recommended for exams)
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Complete all questions first, then review your answers with
                    detailed explanations. Simulates real exam conditions.
                  </div>
                </div>
              </label>

              <label className="flex items-start p-4 bg-white rounded-lg border-2 border-transparent hover:border-blue-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="showResultsMode"
                  value="never"
                  checked={settings.showResultsMode === "never"}
                  onChange={(e) =>
                    updateSetting(
                      "showResultsMode",
                      e.target.value as "immediate" | "end" | "never"
                    )
                  }
                  className="text-blue-600 focus:ring-blue-500 mt-1"
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    🎯 Score Only (Challenge mode)
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Only see your final score and pass/fail status. Most
                    challenging option for testing your knowledge.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Feedback Options */}
          {settings.showResultsMode !== "never" && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Feedback Options
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.showExplanations}
                    onChange={(e) =>
                      updateSetting("showExplanations", e.target.checked)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    Show explanations for answers
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.showCorrectAnswers}
                    onChange={(e) =>
                      updateSetting("showCorrectAnswers", e.target.checked)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    Highlight correct answers
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.allowReview}
                    onChange={(e) =>
                      updateSetting("allowReview", e.target.checked)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    Allow reviewing questions at the end
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Question Randomization */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Question Randomization
            </h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.shuffleQuestions}
                  onChange={(e) =>
                    updateSetting("shuffleQuestions", e.target.checked)
                  }
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  Shuffle question order
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.shuffleAnswers}
                  onChange={(e) =>
                    updateSetting("shuffleAnswers", e.target.checked)
                  }
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  Shuffle answer options
                </span>
              </label>
            </div>
          </div>

          {/* Time Settings */}
          {testInfo.timeLimit && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Time Settings
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.timeLimit === testInfo.timeLimit}
                    onChange={(e) =>
                      updateSetting(
                        "timeLimit",
                        e.target.checked ? testInfo.timeLimit : undefined
                      )
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    Enable time limit ({formatTime(testInfo.timeLimit)})
                  </span>
                </label>
                {settings.timeLimit && (
                  <div className="ml-6 text-sm text-gray-600">
                    ⚠️ The test will automatically submit when time runs out
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Instructions
        </h3>
        <ul className="text-blue-800 space-y-2">
          <li>• Read each question carefully before selecting your answer</li>
          <li>
            • You can change your answer before moving to the next question
          </li>
          <li>
            • Use the &quot;Previous&quot; button to review earlier questions
          </li>
          {settings.showResultsMode === "immediate" && (
            <li>
              • You&apos;ll see the correct answer immediately after each
              question
            </li>
          )}
          {settings.timeLimit && (
            <li>
              • Keep an eye on the timer - the test will auto-submit when time
              runs out
            </li>
          )}
          <li>• Make sure you have a stable internet connection</li>
        </ul>
      </div>

      {/* Start Test Button */}
      <div className="text-center">
        <button
          onClick={onStartTest}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        >
          Start Test
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Click to begin the test with your selected settings
        </p>
      </div>
    </div>
  );
}
