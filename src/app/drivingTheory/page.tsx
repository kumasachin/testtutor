'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Test {
  id: string
  title: string
  description?: string
  questions: number
  attempts: number
}

export default function DrivingTheoryPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDrivingTests()
  }, [])

  const fetchDrivingTests = async () => {
    try {
      // Filter tests by Driving Theory domain
      const response = await fetch('/api/tests?category=driving-theory')
      const result = await response.json()
      if (result.success) {
        setTests(result.data.tests)
      }
    } catch (error) {
      console.error('Error fetching driving theory tests:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Driving Theory Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your driving theory test with our comprehensive practice exams
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Driving Theory</span>
        </nav>

        {/* Test Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              🚗 Car Theory Test
            </h2>
            <p className="text-gray-600 mb-4">
              Prepare for your car driving theory test with official DVSA questions
            </p>
            <Link
              href="/drivingTheory/car"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Practice Car Theory
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              🏍️ Motorcycle Theory Test
            </h2>
            <p className="text-gray-600 mb-4">
              Get ready for your motorcycle theory test with targeted practice
            </p>
            <Link
              href="/drivingTheory/motorcycle"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Practice Motorcycle Theory
            </Link>
          </div>
        </div>

        {/* Available Tests */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tests...</p>
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
                    Start Test
                  </Link>
                </div>
              ))}
            </div>

            {tests.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">🚗</span>
                </div>
                <p className="text-gray-600 mb-4">No driving theory tests available yet.</p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Test
                </Link>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About Driving Theory Test
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Test Format</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 50 multiple choice questions</li>
                <li>• 57 minutes time limit</li>
                <li>• Pass mark: 43 out of 50 (86%)</li>
                <li>• Hazard perception test included</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Topics Covered</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Highway Code rules</li>
                <li>• Road signs and markings</li>
                <li>• Vehicle safety checks</li>
                <li>• Vulnerable road users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
