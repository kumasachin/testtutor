"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Domain {
  id: string;
  name: string;
  displayName: string;
  description: string;
}

interface Test {
  id: string;
  title: string;
  description: string;
  domainId: string;
}

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [tests, setTests] = useState<Test[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showTestsDropdown, setShowTestsDropdown] = useState(false);
  // const [showExamsDropdown, setShowExamsDropdown] = useState(false);

  // Test Configuration State
  const [showConfig, setShowConfig] = useState(false);
  const [testConfig, setTestConfig] = useState({
    timeLimit: 45, // minutes
    passPercentage: 75,
    shuffleQuestions: true,
    shuffleAnswers: true,
    showTimer: true,
    immediateResults: false,
  });

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/domains");
      if (response.ok) {
        const data = await response.json();
        setDomains(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch domains:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await fetch("/api/tests");
      if (response.ok) {
        const data = await response.json();
        setTests(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch tests:", error);
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchTests();
    checkAuthStatus();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        // setShowTestsDropdown(false);
        // setShowExamsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkAuthStatus = () => {
    setIsLoggedIn(false);
  };

  // Load saved configuration on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("testConfig");
    if (savedConfig) {
      try {
        setTestConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error("Failed to load saved test configuration:", error);
      }
    }
  }, []);

  // Save configuration to localStorage
  const saveTestConfig = (newConfig: typeof testConfig) => {
    setTestConfig(newConfig);
    localStorage.setItem("testConfig", JSON.stringify(newConfig));
  };

  const handleConfigChange = (
    key: keyof typeof testConfig,
    value: number | boolean
  ) => {
    const newConfig = { ...testConfig, [key]: value };
    saveTestConfig(newConfig);
  };

  const resetToDefaults = () => {
    const defaultConfig = {
      timeLimit: 45,
      passPercentage: 75,
      shuffleQuestions: true,
      shuffleAnswers: true,
      showTimer: true,
      immediateResults: false,
    };
    saveTestConfig(defaultConfig);
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "TestTutor",
            description:
              "Comprehensive online test practice platform specializing in Life in UK citizenship tests and British culture education.",
            url: "https://testtutor.com",
            logo: "https://testtutor.com/logo.png",
            foundingDate: "2024",
            areaServed: {
              "@type": "Country",
              name: "United Kingdom",
            },
            knowsLanguage: ["English"],
            offers: {
              "@type": "Course",
              name: "Life in UK Test Preparation",
              description:
                "Complete preparation course for UK citizenship test",
              provider: {
                "@type": "Organization",
                name: "TestTutor",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
              },
            },
            sameAs: [
              "https://twitter.com/testtutor",
              "https://facebook.com/testtutor",
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                <Link
                  href="/life-uk-test"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Life in UK Tests
                </Link>

                <Link
                  href="/driving-theory"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Driving Theory
                </Link>

                <Link
                  href="/tests"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  All Tests
                </Link>

                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </nav>

              {/* Auth & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      My Account
                    </Link>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      Logout
                    </button>
                  </div>
                ) : (
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
                )}

                {/* Mobile menu button */}
                <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                Ace Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}
                  Tests
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Practice for Life in UK tests, Driving Theory exams, and more.
                Real questions, helpful explanations, completely free.
              </p>

              {/* Community Message */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🌟 Community Driven & Completely Free
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    This platform is built by the community, for the community.
                    All practice tests are completely free and designed to help
                    you succeed in your UK citizenship and driving theory exams.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Join thousands of learners preparing together! No hidden
                    fees, no subscriptions, just quality practice tests to help
                    you ace your exams.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>100% Free Forever</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-blue-600">✓</span>
                      <span>Community Supported</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Real Exam Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  800+
                </div>
                <div className="text-gray-600">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  Free
                </div>
                <div className="text-gray-600">Always</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  12K+
                </div>
                <div className="text-gray-600">Users Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  Real
                </div>
                <div className="text-gray-600">Questions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Configuration Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                ⚙️ Customize Your Test Experience
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Personalize your practice tests with these configuration
                options. Your preferences will be saved for future sessions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Configuration Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-white">
                    Test Settings
                  </h4>
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    {showConfig ? "Hide Settings" : "Show Settings"}
                  </button>
                </div>
              </div>

              {/* Configuration Content */}
              {showConfig && (
                <div className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Time Limit */}
                    <div className="space-y-3">
                      <label
                        htmlFor="timeLimit"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        ⏱️ Time Limit (minutes)
                      </label>
                      <div className="relative">
                        <input
                          id="timeLimit"
                          type="range"
                          min="15"
                          max="120"
                          value={testConfig.timeLimit}
                          onChange={(e) =>
                            handleConfigChange(
                              "timeLimit",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>15 min</span>
                          <span className="font-bold text-blue-600">
                            {testConfig.timeLimit} min
                          </span>
                          <span>2 hours</span>
                        </div>
                      </div>
                    </div>

                    {/* Pass Percentage */}
                    <div className="space-y-3">
                      <label
                        htmlFor="passPercentage"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        🎯 Pass Percentage
                      </label>
                      <div className="relative">
                        <input
                          id="passPercentage"
                          type="range"
                          min="50"
                          max="100"
                          value={testConfig.passPercentage}
                          onChange={(e) =>
                            handleConfigChange(
                              "passPercentage",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>50%</span>
                          <span className="font-bold text-green-600">
                            {testConfig.passPercentage}%
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Shuffle Questions Toggle */}
                    <div className="space-y-3">
                      <span
                        id="shuffleQuestions-label"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        🔀 Shuffle Questions
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          aria-labelledby="shuffleQuestions-label"
                          onClick={() =>
                            handleConfigChange(
                              "shuffleQuestions",
                              !testConfig.shuffleQuestions
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            testConfig.shuffleQuestions
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              testConfig.shuffleQuestions
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-600">
                          {testConfig.shuffleQuestions ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>

                    {/* Shuffle Answers Toggle */}
                    <div className="space-y-3">
                      <span
                        id="shuffleAnswers-label"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        🎲 Shuffle Answer Options
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          aria-labelledby="shuffleAnswers-label"
                          onClick={() =>
                            handleConfigChange(
                              "shuffleAnswers",
                              !testConfig.shuffleAnswers
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            testConfig.shuffleAnswers
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              testConfig.shuffleAnswers
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-600">
                          {testConfig.shuffleAnswers ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>

                    {/* Show Timer Toggle */}
                    <div className="space-y-3">
                      <span
                        id="showTimer-label"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        ⏰ Show Timer
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          aria-labelledby="showTimer-label"
                          onClick={() =>
                            handleConfigChange(
                              "showTimer",
                              !testConfig.showTimer
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            testConfig.showTimer ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              testConfig.showTimer
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-600">
                          {testConfig.showTimer ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </div>

                    {/* Immediate Results Toggle */}
                    <div className="space-y-3">
                      <span
                        id="immediateResults-label"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        📊 Immediate Results
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          aria-labelledby="immediateResults-label"
                          onClick={() =>
                            handleConfigChange(
                              "immediateResults",
                              !testConfig.immediateResults
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            testConfig.immediateResults
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              testConfig.immediateResults
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-sm text-gray-600">
                          {testConfig.immediateResults
                            ? "After each question"
                            : "At test end"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button and Current Settings Summary */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                      <div className="text-sm text-gray-600">
                        <strong>Current Settings:</strong>{" "}
                        {testConfig.timeLimit} min timer,{" "}
                        {testConfig.passPercentage}% pass rate,
                        {testConfig.shuffleQuestions
                          ? " shuffled questions,"
                          : " ordered questions,"}
                        {testConfig.shuffleAnswers
                          ? " shuffled answers"
                          : " ordered answers"}
                      </div>
                      <button
                        onClick={resetToDefaults}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Action Buttons */}
              {!showConfig && (
                <div className="px-8 py-6 bg-gray-50">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
                      ⏱️ {testConfig.timeLimit} min timer
                    </div>
                    <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
                      🎯 {testConfig.passPercentage}% pass rate
                    </div>
                    <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
                      🔀{" "}
                      {testConfig.shuffleQuestions
                        ? "Questions shuffled"
                        : "Questions ordered"}
                    </div>
                    <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
                      🎲{" "}
                      {testConfig.shuffleAnswers
                        ? "Answers shuffled"
                        : "Answers ordered"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Test Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Test Categories
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose from different practice tests to help you prepare
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link
                href="/life-uk-test"
                className="group bg-green-50 border-2 border-green-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-green-200"
              >
                <div className="text-center">
                  <div className="h-20 w-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-green-600 text-4xl">🇬🇧</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Life in UK Test
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Practice for your British citizenship test with real-style
                    questions
                  </p>
                  <div className="inline-flex items-center text-green-600 font-semibold">
                    15+ Practice Tests
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/drivingTheory"
                className="group bg-blue-50 border-2 border-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-blue-200"
              >
                <div className="text-center">
                  <div className="h-20 w-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 text-4xl">🚗</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Driving Theory Test
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Practice your driving theory exam with Highway Code
                    questions and hazard perception
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold">
                    Multiple Categories
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>

              <div className="group bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="h-20 w-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-purple-600 text-4xl">🎓</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Academic Tests
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Educational assessments and academic practice tests for
                    students
                  </p>
                  <div className="inline-flex items-center text-gray-400 font-semibold">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tests Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Practice Tests
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start practicing with our most popular tests and improve your
                chances of success
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Life in UK Tests */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-red-600 text-2xl">🇬🇧</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Life in UK Test
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Official practice tests for UK citizenship and settlement
                  applications
                </p>
                <Link
                  href="/life-uk-test"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Take Practice Test
                  <span className="ml-2">→</span>
                </Link>
              </div>

              {/* Driving Theory Tests */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-2xl">🚗</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Driving Theory
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  UK driving theory test practice with official DVSA questions
                </p>
                <Link
                  href="/drivingTheory"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Start Practicing
                  <span className="ml-2">→</span>
                </Link>
              </div>

              {/* View All Tests */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">All Tests</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Browse our complete collection of practice tests and resources
                </p>
                <Link
                  href="/tests"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Browse All Tests
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Test Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse Tests by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the perfect practice test for your needs across different
                domains
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Government & Citizenship */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-600 text-xl">🏛️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Government & Citizenship
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Life in UK Tests</li>
                  <li>• Citizenship Practice</li>
                  <li>• Settlement Tests</li>
                  <li>• British Values</li>
                </ul>
              </div>

              {/* Driving & Transportation */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xl">🚗</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Driving & Transportation
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Theory Test Practice</li>
                  <li>• Highway Code</li>
                  <li>• Hazard Perception</li>
                  <li>• Mock Tests</li>
                </ul>
              </div>

              {/* Professional Certifications */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-xl">💼</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Professional Certifications
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Industry Standards</li>
                  <li>• Skills Assessment</li>
                  <li>• Career Development</li>
                  <li>• Certification Prep</li>
                </ul>
              </div>

              {/* Academic & Educational */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-xl">🎓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Academic & Educational
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Student Assessments</li>
                  <li>• Educational Practice</li>
                  <li>• Study Resources</li>
                  <li>• Learning Support</li>
                </ul>
              </div>

              {/* Health & Safety */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-orange-600 text-xl">🛡️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Health & Safety
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Safety Protocols</li>
                  <li>• Risk Assessment</li>
                  <li>• Compliance Training</li>
                  <li>• Emergency Procedures</li>
                </ul>
              </div>

              {/* Technology & Skills */}
              <div className="group border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-indigo-600 text-xl">💻</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Technology & Skills
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Digital Literacy</li>
                  <li>• Technical Skills</li>
                  <li>• Software Testing</li>
                  <li>• IT Certifications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="col-span-1">
                <Link href="/" className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold">TestTutor</span>
                </Link>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Free practice tests for Life in UK, Driving Theory, and other
                  exams.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/life-uk-test"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Life in UK Test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/drivingTheory"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Driving Theory
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms & Privacy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Community Driven</h4>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  TestTutor is completely free and built by the community, for
                  the community. Help us grow!
                </p>
                <div className="flex space-x-3">
                  <span className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                    💚 Free Forever
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                    🤝 Open Source
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2024 TestTutor. Free practice tests for everyone.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <span className="text-gray-400 text-sm">🌟 Always Free</span>
                  <span className="text-gray-400 text-sm">
                    � Works on Mobile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
