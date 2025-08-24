"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Domain {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state

  useEffect(() => {
    fetchDomains();
    // TODO: Check actual authentication status
    checkAuthStatus();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/domains");
      const result = await response.json();
      if (result.success) {
        setDomains(result.data);
      }
    } catch (error) {
      console.error("Error fetching domains:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = () => {
    // TODO: Implement actual authentication check
    // For now, setting as false
    setIsLoggedIn(false);
  };

  return (
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
              {/* Courses Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCoursesDropdown(!showCoursesDropdown)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <span>Courses</span>
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

                {showCoursesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
                    <Link
                      href="/lifeInUk"
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🇬🇧</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            Life in UK Test
                          </div>
                          <div className="text-sm text-gray-500">
                            British citizenship test prep
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/drivingTheory"
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🚗</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            Driving Theory
                          </div>
                          <div className="text-sm text-gray-500">
                            Theory test preparation
                          </div>
                        </div>
                      </div>
                    </Link>
                    {loading ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading more courses...
                      </div>
                    ) : (
                      domains.slice(0, 3).map((domain) => (
                        <Link
                          key={domain.id}
                          href={`/courses/${domain.name}`}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">📚</span>
                            <div>
                              <div className="font-medium text-gray-900">
                                {domain.displayName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {domain.description || "Practice tests"}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                    <div className="border-t mt-2 pt-2">
                      <Link
                        href="/courses"
                        className="block px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                      >
                        View All Courses →
                      </Link>
                    </div>
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
              Master Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {" "}
                Exams
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Prepare for Life in UK tests, Driving Theory exams, and more with
              our comprehensive practice materials. Study smarter, pass with
              confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lifeInUk"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🇬🇧 Start Life in UK Test →
              </Link>
              <Link
                href="/drivingTheory"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg font-medium"
              >
                🚗 Driving Theory Practice
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                Free
              </div>
              <div className="text-gray-600">Always</div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Test Categories
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of practice tests
              designed to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/lifeInUk"
              className="group bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-green-200"
            >
              <div className="text-center">
                <div className="h-20 w-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors group-hover:scale-110 transform duration-300">
                  <span className="text-green-600 text-4xl">🇬🇧</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-3">
                  Life in UK Test
                </h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Comprehensive preparation for your British citizenship test
                  with official-style questions
                </p>
                <div className="inline-flex items-center text-green-600 font-semibold">
                  15+ Practice Tests
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/drivingTheory"
              className="group bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-200"
            >
              <div className="text-center">
                <div className="h-20 w-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                  <span className="text-blue-600 text-4xl">🚗</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3">
                  Driving Theory Test
                </h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Master your driving theory exam with Highway Code questions
                  and hazard perception
                </p>
                <div className="inline-flex items-center text-blue-600 font-semibold">
                  Multiple Categories
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
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

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TestTutor?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the most comprehensive and effective test preparation
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">🎯</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Exam-Focused Content
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                All our questions are based on official exam patterns and
                syllabus to ensure you&apos;re prepared for the real test
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">�</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Study Anywhere
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Access your practice tests on any device, anytime. Study at your
                own pace with our mobile-friendly platform
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">📊</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Track Progress
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                Monitor your improvement with detailed analytics and
                personalized recommendations for better performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h3>
            <p className="text-xl text-gray-600">
              Join thousands who have achieved their goals with TestTutor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="text-green-600 text-6xl mb-4">&quot;</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;Passed my Life in UK test on the first try! The practice
                questions were exactly like the real exam.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold">S</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Life in UK Test</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-blue-600 text-6xl mb-4">&quot;</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;The driving theory practice helped me understand the
                Highway Code better than any other resource.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">M</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike T.</div>
                  <div className="text-sm text-gray-600">Driving Theory</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
              <div className="text-purple-600 text-6xl mb-4">&quot;</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;Free, comprehensive, and effective. This platform helped
                me save money while achieving great results.&quot;
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-bold">A</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Anna L.</div>
                  <div className="text-sm text-gray-600">Multiple Tests</div>
                </div>
              </div>
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
                Your trusted partner for exam preparation. Free, comprehensive,
                and effective test practice.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-xl">📧</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-xl">📱</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/lifeInUk"
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
                    href="/courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
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
                    href="/help"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Donate */}
            <div>
              <h4 className="font-semibold text-lg mb-4">
                Support Our Mission
              </h4>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Help us keep TestTutor free for everyone. Your donation helps us
                create more content and improve the platform.
              </p>
              <Link
                href="/donate"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium"
              >
                💝 Donate Now
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 TestTutor. All rights reserved. Made with ❤️ for
                learners worldwide.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">🌟 100% Free</span>
                <span className="text-gray-400 text-sm">🔒 Privacy First</span>
                <span className="text-gray-400 text-sm">
                  📱 Mobile Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
