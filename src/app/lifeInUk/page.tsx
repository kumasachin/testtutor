"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Test {
  id: string;
  title: string;
  description?: string;
  questions: number;
  attempts: number;
}

interface APITest {
  id: string;
  title: string;
  description?: string;
  _count?: {
    questions?: number;
    attempts?: number;
  };
}

export default function LifeInUkPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Previous exam papers state
  const [examPapers, setExamPapers] = useState<
    Array<{
      id: string;
      title: string;
      year: number;
      month: string;
      attempts: number;
    }>
  >([]);

  // New state for dropdown menus
  const [selectedTestType, setSelectedTestType] = useState<string>("practice");
  const [selectedExamMode, setSelectedExamMode] = useState<string>("standard");
  const [testDropdownOpen, setTestDropdownOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);

  // Navigation menu state
  const [showTestsDropdown, setShowTestsDropdown] = useState(false);
  const [showExamsDropdown, setShowExamsDropdown] = useState(false);

  useEffect(() => {
    fetchLifeInUkTests();
    initializeExamPapers();
  }, []);

  const initializeExamPapers = () => {
    // Initialize with sample previous exam papers
    const sampleExamPapers = [
      {
        id: "exam-2024-march",
        title: "Life in UK Official Test - March 2024",
        year: 2024,
        month: "March",
        attempts: 1250,
      },
      {
        id: "exam-2024-february",
        title: "Life in UK Official Test - February 2024",
        year: 2024,
        month: "February",
        attempts: 1180,
      },
      {
        id: "exam-2024-january",
        title: "Life in UK Official Test - January 2024",
        year: 2024,
        month: "January",
        attempts: 1090,
      },
      {
        id: "exam-2023-december",
        title: "Life in UK Official Test - December 2023",
        year: 2023,
        month: "December",
        attempts: 980,
      },
      {
        id: "exam-2023-november",
        title: "Life in UK Official Test - November 2023",
        year: 2023,
        month: "November",
        attempts: 920,
      },
      {
        id: "exam-2023-october",
        title: "Life in UK Official Test - October 2023",
        year: 2023,
        month: "October",
        attempts: 850,
      },
      {
        id: "exam-2023-september",
        title: "Life in UK Official Test - September 2023",
        year: 2023,
        month: "September",
        attempts: 780,
      },
      {
        id: "exam-2023-august",
        title: "Life in UK Official Test - August 2023",
        year: 2023,
        month: "August",
        attempts: 720,
      },
    ];
    setExamPapers(sampleExamPapers);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setTestDropdownOpen(false);
        setExamDropdownOpen(false);
        setShowTestsDropdown(false);
        setShowExamsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchLifeInUkTests = async () => {
    try {
      // Filter tests by Life in UK domain (note: domain name is "Life in UK", not "life-in-uk")
      const response = await fetch("/api/tests?domainName=Life in UK");
      const result = await response.json();

      if (result.success && result.data) {
        // Transform the data to match our interface
        const transformedTests = result.data.tests.map((test: APITest) => ({
          id: test.id,
          title: test.title,
          description: test.description,
          questions: 24, // Default to 24 since we know our Life in UK tests have 24 questions
          attempts: test._count?.attempts || 0,
        }));

        setTests(transformedTests);
      } else {
        console.error("API response unsuccessful or missing data:", result);
      }
    } catch (error) {
      console.error("Error fetching Life in UK tests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Categorize tests based on their titles
  const categorizeTests = () => {
    const categories = {
      history: tests.filter(
        (test) =>
          test.title.toLowerCase().includes("history") ||
          test.title.toLowerCase().includes("roman") ||
          test.title.toLowerCase().includes("saxon") ||
          test.title.toLowerCase().includes("viking") ||
          test.title.toLowerCase().includes("medieval") ||
          test.title.toLowerCase().includes("tudor") ||
          test.title.toLowerCase().includes("stuart") ||
          test.title.toLowerCase().includes("georgian") ||
          test.title.toLowerCase().includes("industrial") ||
          test.title.toLowerCase().includes("victorian") ||
          test.title.toLowerCase().includes("world war")
      ),
      government: tests.filter(
        (test) =>
          test.title.toLowerCase().includes("government") ||
          test.title.toLowerCase().includes("britain") ||
          test.title.toLowerCase().includes("modern") ||
          test.title.toLowerCase().includes("contemporary")
      ),
      culture: tests.filter(
        (test) =>
          test.title.toLowerCase().includes("culture") ||
          test.title.toLowerCase().includes("sport") ||
          test.title.toLowerCase().includes("tradition")
      ),
      geography: tests.filter(
        (test) =>
          test.title.toLowerCase().includes("geography") ||
          test.title.toLowerCase().includes("region")
      ),
      general: tests.filter(
        (test) =>
          test.title.toLowerCase().includes("practice") ||
          test.title.toLowerCase().includes("general") ||
          (!test.title.toLowerCase().includes("history") &&
            !test.title.toLowerCase().includes("government") &&
            !test.title.toLowerCase().includes("culture") &&
            !test.title.toLowerCase().includes("geography") &&
            !test.title.toLowerCase().includes("roman") &&
            !test.title.toLowerCase().includes("saxon") &&
            !test.title.toLowerCase().includes("viking") &&
            !test.title.toLowerCase().includes("medieval") &&
            !test.title.toLowerCase().includes("tudor") &&
            !test.title.toLowerCase().includes("stuart") &&
            !test.title.toLowerCase().includes("georgian") &&
            !test.title.toLowerCase().includes("industrial") &&
            !test.title.toLowerCase().includes("victorian") &&
            !test.title.toLowerCase().includes("world war") &&
            !test.title.toLowerCase().includes("britain") &&
            !test.title.toLowerCase().includes("modern") &&
            !test.title.toLowerCase().includes("contemporary") &&
            !test.title.toLowerCase().includes("sport") &&
            !test.title.toLowerCase().includes("tradition") &&
            !test.title.toLowerCase().includes("region"))
      ),
    };
    return categories;
  };

  const categories = categorizeTests();

  const getFilteredTests = () => {
    if (selectedCategory === "all") return tests;
    return categories[selectedCategory as keyof typeof categories] || [];
  };

  const filteredTests = getFilteredTests();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TestTutor
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Tests Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowTestsDropdown(!showTestsDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <span>Tests</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {showTestsDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-900">
                        Available Tests
                      </h3>
                      <p className="text-xs text-gray-500">
                        {tests.length} tests in Life in UK
                      </p>
                    </div>

                    {loading ? (
                      <div className="px-4 py-6 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">
                          Loading tests...
                        </p>
                      </div>
                    ) : tests.length > 0 ? (
                      <>
                        {tests.slice(0, 8).map((test) => (
                          <Link
                            key={test.id}
                            href={`/test/${test.id}`}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => setShowTestsDropdown(false)}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-lg mt-0.5">📝</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                                  {test.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                                  <span>{test.questions} questions</span>
                                  <span>•</span>
                                  <span>{test.attempts} attempts</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}

                        {tests.length > 8 && (
                          <div className="border-t pt-2">
                            <Link
                              href="/lifeInUk"
                              className="block px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium text-center"
                              onClick={() => setShowTestsDropdown(false)}
                            >
                              View All {tests.length} Tests →
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm text-gray-500">
                          No tests available
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Exams Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowExamsDropdown(!showExamsDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <span>Exams</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {showExamsDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-900">
                        Previous Exam Papers
                      </h3>
                      <p className="text-xs text-gray-500">
                        Official Life in UK test papers
                      </p>
                    </div>

                    {examPapers.length > 0 ? (
                      <>
                        {examPapers.slice(0, 6).map((exam) => (
                          <Link
                            key={exam.id}
                            href={`/test/${exam.id}`}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => setShowExamsDropdown(false)}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-lg mt-0.5">🎓</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 text-sm leading-tight">
                                  {exam.month} {exam.year} Paper
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                                  <span>Official Exam</span>
                                  <span>•</span>
                                  <span>{exam.attempts} attempts</span>
                                </div>
                              </div>
                              <div className="text-xs text-blue-600 font-medium">
                                {exam.year}
                              </div>
                            </div>
                          </Link>
                        ))}

                        <div className="border-t pt-2">
                          <Link
                            href="/exams/previous-papers"
                            className="block px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium text-center"
                            onClick={() => setShowExamsDropdown(false)}
                          >
                            View All Previous Papers →
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm text-gray-500">
                          No exam papers available
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact Us
              </Link>

              <Link
                href="/donate"
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                💝 Donate
              </Link>
            </nav>

            {/* Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Life in the UK Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Prepare for your Life in the UK test with our comprehensive practice
            exams covering all aspects of British life, history, and culture
          </p>

          {/* Dropdown Menu Header */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Test Type Dropdown */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type
                </label>
                <button
                  onClick={() => setTestDropdownOpen(!testDropdownOpen)}
                  className="flex items-center justify-between w-48 px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="capitalize">
                    {selectedTestType === "practice"
                      ? "Practice Test"
                      : selectedTestType === "mock"
                        ? "Mock Exam"
                        : selectedTestType === "timed"
                          ? "Timed Test"
                          : selectedTestType}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      testDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {testDropdownOpen && (
                  <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      {[
                        { value: "practice", label: "Practice Test" },
                        { value: "mock", label: "Mock Exam" },
                        { value: "timed", label: "Timed Test" },
                        { value: "quick", label: "Quick Quiz" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedTestType(option.value);
                            setTestDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                            selectedTestType === option.value
                              ? "bg-blue-50 text-blue-700"
                              : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Exam Mode Dropdown */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Mode
                </label>
                <button
                  onClick={() => setExamDropdownOpen(!examDropdownOpen)}
                  className="flex items-center justify-between w-48 px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="capitalize">
                    {selectedExamMode === "standard"
                      ? "Standard Mode"
                      : selectedExamMode === "learning"
                        ? "Learning Mode"
                        : selectedExamMode === "exam"
                          ? "Exam Mode"
                          : selectedExamMode}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      examDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {examDropdownOpen && (
                  <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                      {[
                        { value: "standard", label: "Standard Mode" },
                        { value: "learning", label: "Learning Mode" },
                        { value: "exam", label: "Exam Mode" },
                        { value: "review", label: "Review Mode" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedExamMode(option.value);
                            setExamDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                            selectedExamMode === option.value
                              ? "bg-blue-50 text-blue-700"
                              : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Life in UK</span>
        </nav>

        {/* Test Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {tests.length}
            </div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {categories.history.length}
            </div>
            <div className="text-sm text-gray-600">History Tests</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {categories.government.length}
            </div>
            <div className="text-sm text-gray-600">Government Tests</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {categories.culture.length}
            </div>
            <div className="text-sm text-gray-600">Culture Tests</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Test Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Tests ({tests.length})
            </button>
            <button
              onClick={() => setSelectedCategory("history")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              British History ({categories.history.length})
            </button>
            <button
              onClick={() => setSelectedCategory("government")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "government"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Government & Law ({categories.government.length})
            </button>
            <button
              onClick={() => setSelectedCategory("culture")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "culture"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Culture & Traditions ({categories.culture.length})
            </button>
            <button
              onClick={() => setSelectedCategory("geography")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "geography"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Geography ({categories.geography.length})
            </button>
            <button
              onClick={() => setSelectedCategory("general")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "general"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              General Practice ({categories.general.length})
            </button>
          </div>
        </div>

        {/* Tests Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tests...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h3>

                  {test.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {test.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{test.questions} questions</span>
                    <span>{test.attempts} attempts</span>
                  </div>

                  <Link
                    href={`/test/${test.id}`}
                    className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Start Test
                  </Link>
                </div>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📚</span>
                </div>
                <p className="text-gray-600">
                  No tests found in this category.
                </p>
              </div>
            )}
          </>
        )}

        {/* Quick Tips */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            💡 Test Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Exam Format</h4>
              <ul className="space-y-1">
                <li>• 24 questions per official test</li>
                <li>• 45 minutes time limit</li>
                <li>• 75% pass rate required</li>
                <li>• Multiple choice questions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Study Strategy
              </h4>
              <ul className="space-y-1">
                <li>• Take practice tests regularly</li>
                <li>• Focus on weak areas</li>
                <li>• Read explanations carefully</li>
                <li>• Review incorrect answers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
