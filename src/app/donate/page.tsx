"use client";

import Link from "next/link";
import { useState } from "react";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");

  const predefinedAmounts = ["5", "10", "25", "50", "100"];

  const handleDonation = () => {
    const amount = donationAmount === "custom" ? customAmount : donationAmount;
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }

    // This would typically integrate with a payment processor like Stripe, PayPal, etc.
    alert(
      `Thank you for your generous donation of £${amount}! Payment integration coming soon.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                TestOnline
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/test"
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="h-20 w-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-orange-600 text-4xl">💝</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support TestOnline
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us keep our practice tests free and accessible for everyone.
            Your donation helps us maintain and improve our platform.
          </p>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Make a Donation
          </h2>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Choose an amount:
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                    donationAmount === amount
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  £{amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDonationAmount("custom")}
                className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                  donationAmount === "custom"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                Custom
              </button>
              {donationAmount === "custom" && (
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-700 mr-2">
                    £
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="1"
                    step="0.01"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Optional Message */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Leave a message (optional):
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thank you for your work on this platform..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={4}
            />
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonation}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
          >
            💝 Donate Now
          </button>
        </div>

        {/* Why Donate Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Your Donation Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Keep Tests Free
                  </h3>
                  <p className="text-gray-600">
                    Your donations help us maintain free access to practice
                    tests for everyone.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-blue-600 text-lg">🔧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Platform Improvement
                  </h3>
                  <p className="text-gray-600">
                    Support ongoing development and new features to enhance user
                    experience.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-purple-600 text-lg">📚</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    More Content
                  </h3>
                  <p className="text-gray-600">
                    Enable us to create more comprehensive test materials and
                    study resources.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-orange-600 text-lg">🌟</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Better Support
                  </h3>
                  <p className="text-gray-600">
                    Provide better customer support and faster response times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Tests */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Practice Tests
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold">TestOnline</span>
            </div>
            <p className="text-gray-400">
              © 2024 TestOnline. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
