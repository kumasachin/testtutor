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

export default function LifeInUkPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLifeInUkTests()
  }, [])

  const fetchLifeInUkTests = async () => {
    try {
      // Filter tests by Life in UK domain
      const response = await fetch('/api/tests?category=life-in-uk')
      const result = await response.json()
      if (result.success) {
        setTests(result.data.tests)
      }
    } catch (error) {
      console.error('Error fetching Life in UK tests:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Life in the UK Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prepare for your Life in the UK test with our comprehensive practice exams
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Life in UK</span>
        </nav>

        {/* Tests Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                    className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Start Test
                  </Link>
                </div>
              ))}
            </div>

            {tests.length === 0 && (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📚</span>
                </div>
                <p className="text-gray-600 mb-4">No Life in UK tests available yet.</p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
            About Life in the UK Test
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Test Format</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 24 questions in 45 minutes</li>
                <li>• Multiple choice format</li>
                <li>• Pass mark: 18 out of 24 (75%)</li>
                <li>• Questions about UK history, culture, and traditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tips for Success</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Study the official handbook thoroughly</li>
                <li>• Take multiple practice tests</li>
                <li>• Focus on areas you find challenging</li>
                <li>• Manage your time effectively</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
