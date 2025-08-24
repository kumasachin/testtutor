"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAuth } from "@/contexts/AuthContext";

interface UserStats {
  totalTests: number;
  averageScore: number;
  timeSpent: number;
  improvementRate: number;
  recentActivity: Array<{
    id: string;
    testTitle: string;
    domain: string;
    score: number;
    completedAt: string;
    timeSpent: number;
  }>;
  domainPerformance: Array<{
    name: string;
    attempts: number;
    averageScore: number;
    bestScore: number;
  }>;
  monthlyProgress: Array<{
    month: string;
    attempts: number;
    averageScore: number;
  }>;
  streaks: {
    current: number;
    longest: number;
  };
}

interface Test {
  id: string;
  title: string;
  domain: {
    displayName: string;
    name: string;
  };
  status: string;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats>({
    totalTests: 0,
    averageScore: 0,
    timeSpent: 0,
    improvementRate: 0,
    recentActivity: [],
    domainPerformance: [],
    monthlyProgress: [],
    streaks: { current: 0, longest: 0 },
  });
  const [availableTests, setAvailableTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      // Load user stats and available tests
      Promise.all([fetchUserStats(), fetchAvailableTests()]).finally(() => {
        setLoading(false);
      });
    }
  }, [isLoading, isAuthenticated, user, router]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch("/api/user/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setStats(result.stats);
        }
      }
    } catch (error) {
      console.error("Failed to load user stats:", error);
    }
  };

  const fetchAvailableTests = async () => {
    try {
      const response = await fetch("/api/tests");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAvailableTests(result.data.tests.slice(0, 5)); // Get first 5 tests
        }
      }
    } catch (error) {
      console.error("Failed to load available tests:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                TestTutor
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/tests"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Tests
                </Link>
                <Link href="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName || user.email}!
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName || user.email}!
          </h1>
          <p className="text-gray-600">
            Track your progress and continue improving your test scores.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tests Taken</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalTests}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Time Studied
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(stats.timeSpent)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Improvement</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.improvementRate > 0 ? "+" : ""}
                  {stats.improvementRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.streaks.current} days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Progress Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Performance Over Time
            </h2>
            {stats.monthlyProgress.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => {
                        const [year, month] = value.split("-");
                        return new Date(
                          parseInt(year),
                          parseInt(month) - 1
                        ).toLocaleDateString("en-US", { month: "short" });
                      }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value}%`,
                        "Average Score",
                      ]}
                      labelFormatter={(label: string) => {
                        const [year, month] = label.split("-");
                        return new Date(
                          parseInt(year),
                          parseInt(month) - 1
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="averageScore"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Start taking tests to see your progress!</p>
              </div>
            )}
          </div>

          {/* Domain Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Performance by Domain
            </h2>
            {stats.domainPerformance.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.domainPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value}%`,
                        "Average Score",
                      ]}
                    />
                    <Bar dataKey="averageScore" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Take tests in different domains to see comparison!</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Tests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Available Tests
              </h2>
              {availableTests.length > 0 ? (
                <div className="space-y-4">
                  {availableTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-blue-900">
                          {test.title}
                        </h3>
                        <p className="text-sm text-blue-700">
                          Domain: {test.domain.displayName}
                        </p>
                      </div>
                      <Link
                        href={`/tests/${test.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Test
                      </Link>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Link
                      href="/tests"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All Tests →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No tests available. Check back later!</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              {stats.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentActivity.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.score >= 80
                            ? "bg-green-500"
                            : activity.score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.testTitle}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(activity.completedAt)} • Score:{" "}
                          {activity.score}% • {activity.domain}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No recent activity. Start taking tests to see your progress!
                  </p>
                </div>
              )}
            </div>

            {/* Study Streaks */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Study Streaks
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold text-blue-600">
                    {stats.streaks.current} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Longest Streak</span>
                  <span className="font-bold text-purple-600">
                    {stats.streaks.longest} days
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-500">
                    Keep practicing daily to maintain your streak!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Performance Details */}
        {stats.domainPerformance.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Domain Performance Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.domainPerformance.map((domain, index) => (
                <div
                  key={domain.name}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4`}
                      style={{
                        backgroundColor: COLORS[index % COLORS.length] + "20",
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded`}
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{domain.name}</h3>
                      <p className="text-sm text-gray-500">
                        {domain.attempts} attempts
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-semibold">
                        {domain.averageScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Score</span>
                      <span className="font-semibold text-green-600">
                        {domain.bestScore}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${domain.averageScore}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <Link
            href="/tests"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Browse All Tests
          </Link>
        </div>
      </main>
    </div>
  );
}
