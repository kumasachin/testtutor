"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Domain {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

interface Test {
  id: string;
  title: string;
  description?: string;
  domain: Domain;
  creator: {
    name?: string;
  };
  _count: {
    attempts: number;
  };
  publishedAt: Date;
}

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDomain]);

  const loadData = async () => {
    await fetchDomains();
    await fetchTests();
  };

  const fetchDomains = async () => {
    try {
      const response = await fetch("/api/domains");
      const result = await response.json();
      if (result.success) {
        setDomains(result.data);
      }
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedDomain) params.append("domainId", selectedDomain);

      const response = await fetch(`/api/tests?${params}`);
      const result = await response.json();
      if (result.success) {
        setTests(result.data.tests);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ExamKit</h1>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                href="/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create Test
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Create and Take Exams with
            <span className="text-blue-600"> Professional Quality</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build comprehensive exams, manage approval workflows, and provide
            engaging test experiences for learners worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Start Creating →
            </Link>
            <Link
              href="#browse"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              Browse Tests
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Category Access */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Popular Test Categories
            </h3>
            <p className="text-gray-600">
              Quick access to specialized exam categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              href="/lifeInUk"
              className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-green-600 text-2xl">🇬🇧</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    Life in UK Test
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Prepare for your British citizenship test
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/drivingTheory"
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600 text-2xl">🚗</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    Driving Theory Test
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Practice for your driving theory exam
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ExamKit?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">📝</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Test Creation
              </h4>
              <p className="text-gray-600">
                Intuitive interface for creating comprehensive exams with
                multiple question types
              </p>
            </div>

            <div className="text-center p-6">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Approval Workflow
              </h4>
              <p className="text-gray-600">
                Built-in review and approval system ensures quality control
                before publication
              </p>
            </div>

            <div className="text-center p-6">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🏆</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Detailed Analytics
              </h4>
              <p className="text-gray-600">
                Comprehensive reporting and analytics to track performance and
                engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Tests */}
      <section id="browse" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Available Tests
            </h3>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Domains</option>
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tests Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading tests...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {test.domain.displayName}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h4>

                  {test.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {test.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>By {test.creator.name || "Anonymous"}</span>
                    <span>{test._count.attempts} attempts</span>
                  </div>

                  <Link
                    href={`/test/${test.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Take Test
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredTests.length === 0 && (
            <div className="text-center py-12">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📚</span>
              </div>
              <p className="text-gray-600">
                No tests found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">ExamKit</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional exam creation and management platform
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 ExamKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
