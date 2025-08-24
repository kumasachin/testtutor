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

export default function MotorcycleTheoryPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMotorcycleTheoryTests();
  }, []);

  const fetchMotorcycleTheoryTests = async () => {
    try {
      // Filter tests by motorcycle theory subcategory
      const response = await fetch("/api/tests?category=driving-theory&subcategory=motorcycle");
      const result = await response.json();
      if (result.success) {
        setTests(result.data.tests || []);
      }
    } catch (error) {
      console.error("Error fetching motorcycle theory tests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-orange-600 hover:text-orange-800">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/drivingTheory" className="text-orange-600 hover:text-orange-800">
            Driving Theory
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Motorcycle Theory</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-orange-600 text-3xl">🏍️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Motorcycle Theory Test Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your motorcycle theory test with specialized practice questions and safety guidance
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
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-600 text-xl">⏱️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Time Limit</h3>
            <p className="text-gray-600">57 minutes</p>
            <p className="text-sm text-gray-500">for 50 questions</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Special Focus</h3>
            <p className="text-gray-600">Motorcycle safety</p>
            <p className="text-sm text-gray-500">& vulnerability</p>
          </div>
        </div>

        {/* Available Tests */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading motorcycle theory tests...</p>
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
                    className="block w-full text-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Start Practice Test
                  </Link>
                </div>
              ))}
            </div>

            {tests.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">🏍️</span>
                </div>
                <p className="text-gray-600 mb-4">No motorcycle theory tests available yet.</p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create First Motorcycle Theory Test
                </Link>
              </div>
            )}
          </>
        )}

        {/* Motorcycle-Specific Study Topics */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Key Study Topics for Motorcycle Theory Test
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Motorcycle Safety</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Protective clothing</li>
                <li>• Helmet requirements</li>
                <li>• Visibility and positioning</li>
                <li>• Weather conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Vehicle Checks</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Chain and sprockets</li>
                <li>• Tyre condition</li>
                <li>• Brake system</li>
                <li>• Lights and electrics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Road Positioning</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Lane positioning</li>
                <li>• Cornering techniques</li>
                <li>• Overtaking safely</li>
                <li>• Group riding</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibial text-gray-900 mb-3">Risk Awareness</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Road surface hazards</li>
                <li>• Weather impacts</li>
                <li>• Other road users</li>
                <li>• Stopping distances</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-lg">⚠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-orange-900">Motorcycle Safety Reminder</h3>
              <p className="text-orange-700 text-sm">
                Motorcyclists are more vulnerable on the road. Extra focus on safety awareness and defensive riding is essential for passing your test and staying safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
