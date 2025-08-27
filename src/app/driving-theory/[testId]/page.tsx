"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface Test {
  id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passPercentage: number;
  questions: Question[];
}

export default function DrivingTheoryTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tests/${testId}`);

        if (!response.ok) {
          throw new Error("Test not found");
        }

        const data = await response.json();

        // If no test from API, use fallback data
        if (!data.test) {
          const fallbackTest: Test = {
            id: testId,
            title: "Driving Theory Practice Test",
            description:
              "Official DVSA practice test covering highway code, road signs, and safe driving",
            timeLimit: 57,
            passPercentage: 86,
            questions: [
              {
                id: "q1",
                question:
                  "What should you do when you see a red traffic light?",
                options: [
                  "Slow down",
                  "Stop completely",
                  "Proceed with caution",
                  "Speed up to clear intersection",
                ],
                correctAnswer: 1,
                explanation:
                  "A red traffic light means you must stop completely and wait until the light turns green.",
              },
              {
                id: "q2",
                question:
                  "What is the national speed limit on a single carriageway?",
                options: ["50 mph", "60 mph", "70 mph", "80 mph"],
                correctAnswer: 1,
                explanation:
                  "The national speed limit on single carriageways is 60 mph for cars.",
              },
              {
                id: "q3",
                question: "When must you use headlights?",
                options: [
                  "Only at night",
                  "In poor visibility",
                  "When it's raining",
                  "All of the above",
                ],
                correctAnswer: 3,
                explanation:
                  "You must use headlights at night, in poor visibility conditions, and when it's raining to ensure you can see and be seen.",
              },
              {
                id: "q4",
                question: "What does a triangular road sign indicate?",
                options: [
                  "Information",
                  "Warning",
                  "Prohibition",
                  "Mandatory instruction",
                ],
                correctAnswer: 1,
                explanation:
                  "Triangular road signs indicate warnings of potential hazards ahead.",
              },
              {
                id: "q5",
                question: "What is the minimum stopping distance at 30 mph?",
                options: ["23 metres", "36 metres", "53 metres", "73 metres"],
                correctAnswer: 0,
                explanation:
                  "At 30 mph, the minimum stopping distance is 23 metres (9m thinking distance + 14m braking distance).",
              },
            ],
          };
          setTest(fallbackTest);
          setSelectedAnswers(new Array(fallbackTest.questions.length).fill(-1));
          if (fallbackTest.timeLimit) {
            setTimeRemaining(fallbackTest.timeLimit * 60); // Convert to seconds
          }
        } else {
          setTest(data.test);
          setSelectedAnswers(new Array(data.test.questions.length).fill(-1));
          if (data.test.timeLimit) {
            setTimeRemaining(data.test.timeLimit * 60);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!test) return;

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    if (!test) return { score: 0, percentage: 0, passed: false };

    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === test.questions[index].correctAnswer
    ).length;

    const percentage = Math.round(
      (correctAnswers / test.questions.length) * 100
    );
    const passed = percentage >= test.passPercentage;

    return { score: correctAnswers, percentage, passed };
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
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
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Test Not Found
            </h2>
            <p className="text-red-700 mb-4">
              {error || "This test could not be loaded."}
            </p>
            <button
              onClick={() => router.push("/driving-theory")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                  results.passed ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {results.passed ? (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">
                {results.passed ? "Congratulations!" : "Keep Practicing"}
              </h1>

              <div className="text-4xl font-bold mb-2">
                {results.score}/{test.questions.length}
              </div>

              <div className="text-xl text-gray-600 mb-6">
                {results.percentage}% - {results.passed ? "PASSED" : "FAILED"}
              </div>

              <p className="text-gray-600 max-w-md mx-auto">
                {results.passed
                  ? `Great job! You scored ${results.percentage}% and passed the test. You're ready for your driving theory test!`
                  : `You scored ${results.percentage}%. You need ${test.passPercentage}% to pass. Keep studying and try again!`}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => router.push("/driving-theory")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Back to Tests
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{test.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {test.questions.length}
              </p>
            </div>

            {timeRemaining !== null && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div
                  className={`text-lg font-semibold ${
                    timeRemaining < 300 ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-4">
            {currentQuestion === test.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
