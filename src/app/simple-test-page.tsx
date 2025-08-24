"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

        setTest(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

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
              <div className="text-2xl font-bold text-orange-600">24</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Test Preview</h3>
            <p className="text-gray-600 text-sm">
              This test contains {test.questions?.length || 0} questions about
              Life in the UK. You have {test.timeLimit || 45} minutes to
              complete it and need {test.passPercentage}% to pass.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Start Test
            </button>
            <button
              onClick={handleBackToTests}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
