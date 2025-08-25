/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Domain {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  points: number;
  explanation?: string;
}

interface TestForm {
  title: string;
  description: string;
  domainId: string;
  timeLimit: number;
  passingScore: number;
  instructions: string;
  questions: Question[];
}

export default function CreateTestPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [formData, setFormData] = useState<TestForm>({
    title: "",
    description: "",
    domainId: "",
    timeLimit: 45,
    passingScore: 70,
    instructions: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", "", "", ""],
    correctAnswers: [],
    points: 1,
    explanation: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      // Mock data for domains
      setDomains([
        {
          id: "1",
          name: "life-in-uk",
          displayName: "Life in the UK",
          description: "British citizenship test",
        },
        {
          id: "2",
          name: "driving-theory",
          displayName: "Driving Theory Test",
          description: "UK driving theory",
        },
      ]);
    } catch (error) {
      console.error("Error loading domains:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof TestForm, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionChange = (
    field: keyof Question,
    value: string | number | string[] | number[]
  ) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || ["", "", "", ""])];
    newOptions[index] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const toggleCorrectAnswer = (index: number) => {
    const currentAnswers = currentQuestion.correctAnswers || [];
    const newAnswers = currentAnswers.includes(index)
      ? currentAnswers.filter((i) => i !== index)
      : [...currentAnswers, index];

    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswers: newAnswers,
    }));
  };

  const addQuestion = () => {
    if (
      !currentQuestion.question ||
      !currentQuestion.options?.some((opt) => opt.trim())
    ) {
      alert("Please fill in the question and at least one option");
      return;
    }

    if (!currentQuestion.correctAnswers?.length) {
      alert("Please select at least one correct answer");
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion.question || "",
      options: currentQuestion.options || [],
      correctAnswers: currentQuestion.correctAnswers || [],
      points: currentQuestion.points || 1,
      explanation: currentQuestion.explanation || "",
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    // Reset current question
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswers: [],
      points: 1,
      explanation: "",
    });
  };

  const removeQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const submitTest = async () => {
    if (
      !formData.title ||
      !formData.domainId ||
      formData.questions.length === 0
    ) {
      alert("Please fill in all required fields and add at least one question");
      return;
    }

    setSaving(true);
    try {
      // In a real app, this would submit to an API
      console.log("Submitting test:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(
        "Test created successfully! It will be reviewed before publication."
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        domainId: "",
        timeLimit: 45,
        passingScore: 70,
        instructions: "",
        questions: [],
      });
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Error creating test. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Create Test</h1>
              </Link>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create New Test</h2>
          <p className="text-gray-600 mt-2">
            Create a test that will be reviewed before being published
          </p>
        </div>

        {/* Test Information Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Test Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="test-title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Test Title *
              </label>
              <input
                id="test-title"
                type="text"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter test title"
              />
            </div>

            <div>
              <label
                htmlFor="test-domain"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Domain *
              </label>
              <select
                id="test-domain"
                value={formData.domainId}
                onChange={(e) => handleFormChange("domainId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a domain</option>
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="test-time-limit"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Time Limit (minutes)
              </label>
              <input
                id="test-time-limit"
                type="number"
                value={formData.timeLimit}
                onChange={(e) =>
                  handleFormChange("timeLimit", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label
                htmlFor="test-passing-score"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Passing Score (%)
              </label>
              <input
                id="test-passing-score"
                type="number"
                value={formData.passingScore}
                onChange={(e) =>
                  handleFormChange("passingScore", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="test-description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="test-description"
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what this test covers"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="test-instructions"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Instructions
            </label>
            <textarea
              id="test-instructions"
              value={formData.instructions}
              onChange={(e) => handleFormChange("instructions", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Instructions for test takers"
            />
          </div>
        </div>

        {/* Add Question Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Add Question
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question *
              </label>
              <textarea
                value={currentQuestion.question}
                onChange={(e) =>
                  handleQuestionChange("question", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Options *
              </label>
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    checked={
                      currentQuestion.correctAnswers?.includes(index) || false
                    }
                    onChange={() => toggleCorrectAnswer(index)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <p className="text-sm text-gray-500 mt-2">
                Check the boxes next to correct answers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) =>
                    handleQuestionChange("points", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explanation (Optional)
              </label>
              <textarea
                value={currentQuestion.explanation}
                onChange={(e) =>
                  handleQuestionChange("explanation", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Explain the correct answer"
              />
            </div>

            <button
              onClick={addQuestion}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        {formData.questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Questions ({formData.questions.length})
            </h3>

            <div className="space-y-4">
              {formData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {index + 1}. {question.question}
                    </h4>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-1">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`text-sm p-2 rounded ${
                          question.correctAnswers.includes(optIndex)
                            ? "bg-green-50 text-green-800 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Points: {question.points}
                    {question.explanation && (
                      <span> | Explanation: {question.explanation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={submitTest}
            disabled={saving || formData.questions.length === 0}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {saving ? "Creating Test..." : "Create Test"}
          </button>

          {formData.questions.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Add at least one question to create the test
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
