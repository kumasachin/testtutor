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

export default function CarTheoryPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarTheoryTests();
  }, []);

  const fetchCarTheoryTests = async () => {
    try {
      // Filter tests by car theory subcategory
      const response = await fetch("/api/tests?category=driving-theory&subcategory=car");
      const result = await response.json();
      if (result.success) {
        setTests(result.data.tests || []);
      }
    } catch (error) {
      console.error("Error fetching car theory tests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/drivingTheory" className="text-blue-600 hover:text-blue-800">
            Driving Theory
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Car Theory</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-3xl">🚗</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Theory Test Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prepare for your car driving theory test with official DVSA questions and practice exams
          </p>
        </div>

        {/* Test Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pass Mark</h3>
            <p className="text-gray-600">43 out of 50 questions</p>
            <p className="text-sm text-gray-500">(86%)</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 text-xl">⏱️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Time Limit</h3>
            <p className="text-gray-600">57 minutes</p>
            <p className="text-sm text-gray-500">for 50 questions</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Test Format</h3>
            <p className="text-gray-600">Multiple choice</p>
            <p className="text-sm text-gray-500">+ hazard perception</p>
          </div>
        </div>

        {/* Available Tests */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading car theory tests...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tests.map((test) => (
                <div key={test.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h3>
                  
                  {test.description && (
                    <p className="text-gray-600 mb-4">
                      {test.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{test.questions} questions</span>
                    <span>{test.attempts} attempts</span>
                  </div>
                  
                  <Link
                    href={`/test/${test.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Practice Test
                  </Link>
                </div>
              ))}
            </div>

            {tests.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">🚗</span>
                </div>
                <p className="text-gray-600 mb-4">No car theory tests available yet.</p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Car Theory Test
                </Link>
              </div>
            )}
          </>
        )}

        {/* Study Topics */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Key Study Topics for Car Theory Test
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Traffic Signs & Rules</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Warning signs</li>
                <li>• Regulatory signs</li>
                <li>• Information signs</li>
                <li>• Road markings</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Vehicle Safety</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Daily vehicle checks</li>
                <li>• Tyre safety</li>
                <li>• Lights and indicators</li>
                <li>• Loading and passengers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Road Positioning</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Lane discipline</li>
                <li>• Overtaking</li>
                <li>• Roundabouts</li>
                <li>• Parking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Vulnerable Users</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Pedestrians</li>
                <li>• Cyclists</li>
                <li>• Motorcyclists</li>
                <li>• Horse riders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
