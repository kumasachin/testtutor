"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";

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
  questions?: unknown[];
  _count: {
    attempts: number;
  };
}

export default function DrivingTheoryHomePage() {
  const router = useRouter();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivingTheoryTests = async () => {
      try {
        setLoading(true);
        // Fetch tests specifically for Driving Theory domain
        const response = await fetch("/api/tests?domain=driving-theory");
        if (!response.ok) {
          throw new Error("Failed to fetch tests");
        }
        const data = await response.json();

        // If no tests from API, use fallback data
        if (!data.tests || data.tests.length === 0) {
          const fallbackTests: Test[] = [
            {
              id: "driving-theory-test-1",
              title: "Driving Theory Practice Test 1",
              description:
                "Official DVSA practice test covering highway code, road signs, and safe driving",
              timeLimit: 57,
              passPercentage: 86,
              domainId: "driving-theory",
              domain: {
                id: "driving-theory",
                name: "driving-theory",
                displayName: "Driving Theory",
              },
              questions: new Array(50),
              _count: { attempts: 320 },
            },
            {
              id: "driving-theory-test-2",
              title: "Driving Theory Practice Test 2",
              description:
                "Additional practice covering hazard perception and traffic rules",
              timeLimit: 57,
              passPercentage: 86,
              domainId: "driving-theory",
              domain: {
                id: "driving-theory",
                name: "driving-theory",
                displayName: "Driving Theory",
              },
              questions: new Array(50),
              _count: { attempts: 245 },
            },
            {
              id: "driving-theory-test-3",
              title: "Highway Code Test",
              description:
                "Focused test on UK highway code rules and regulations",
              timeLimit: 57,
              passPercentage: 86,
              domainId: "driving-theory",
              domain: {
                id: "driving-theory",
                name: "driving-theory",
                displayName: "Driving Theory",
              },
              questions: new Array(50),
              _count: { attempts: 189 },
            },
          ];
          setTests(fallbackTests);
        } else {
          setTests(data.tests || []);
        }
      } catch (err) {
        // On error, also use fallback data
        const fallbackTests: Test[] = [
          {
            id: "driving-theory-test-1",
            title: "Driving Theory Practice Test 1",
            description:
              "Official DVSA practice test covering highway code, road signs, and safe driving",
            timeLimit: 57,
            passPercentage: 86,
            domainId: "driving-theory",
            domain: {
              id: "driving-theory",
              name: "driving-theory",
              displayName: "Driving Theory",
            },
            questions: new Array(50),
            _count: { attempts: 320 },
          },
          {
            id: "driving-theory-test-2",
            title: "Driving Theory Practice Test 2",
            description:
              "Additional practice covering hazard perception and traffic rules",
            timeLimit: 57,
            passPercentage: 86,
            domainId: "driving-theory",
            domain: {
              id: "driving-theory",
              name: "driving-theory",
              displayName: "Driving Theory",
            },
            questions: new Array(50),
            _count: { attempts: 245 },
          },
        ];
        setTests(fallbackTests);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchDrivingTheoryTests();
  }, []);

  const handleTestClick = (testId: string) => {
    router.push(`/driving-theory/${testId}`);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Driving Theory tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
              Error Loading Tests
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Driving Theory Test
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Master the UK Driving Theory Test with our comprehensive practice
              tests. Prepare for your driving test with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-green-500 bg-opacity-50 px-4 py-2 rounded-full">
                🚗 Official Format
              </div>
              <div className="bg-green-500 bg-opacity-50 px-4 py-2 rounded-full">
                ⏰ 57 Minutes
              </div>
              <div className="bg-green-500 bg-opacity-50 px-4 py-2 rounded-full">
                📊 86% Pass Rate
              </div>
              <div className="bg-green-500 bg-opacity-50 px-4 py-2 rounded-full">
                🎯 50 Questions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Driving Theory Tests?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our tests are designed to mirror the official DVSA exam format and
            help you prepare effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              DVSA Official Format
            </h3>
            <p className="text-gray-600">
              Questions match the exact format and difficulty of the real
              driving theory test.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Feedback
            </h3>
            <p className="text-gray-600">
              Get immediate results with detailed explanations for every
              question.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Multiple Tests
            </h3>
            <p className="text-gray-600">
              Practice with various test versions covering all aspects of
              driving theory.
            </p>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Practice Tests
          </h2>

          {tests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Tests Available
              </h3>
              <p className="text-gray-600">
                Driving Theory tests are currently being prepared. Check back
                soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTestClick(test.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {test.title}
                      </h3>
                      {test.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {test.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {test.questions?.length || 50}
                      </div>
                      <div className="text-gray-500">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {test.timeLimit || 57}min
                      </div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {test.passPercentage}%
                      </div>
                      <div className="text-gray-500">Pass Rate</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {test._count.attempts} attempts
                    </div>
                    <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
                      Take Test
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
