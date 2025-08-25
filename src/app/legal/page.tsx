import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
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
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Terms of Service & Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none">
              {/* Terms of Service Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                  Terms of Service
                </h2>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      1. About TestTutor
                    </h3>
                    <p>
                      TestTutor is a free, community-driven platform providing
                      practice tests for Life in UK, Driving Theory, and other
                      educational assessments. Our service is provided free of
                      charge to help learners prepare for their exams.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      2. Use of Service
                    </h3>
                    <p>
                      By using TestTutor, you agree to use the platform for
                      educational purposes only. You may not misuse our services
                      or attempt to disrupt the platform&apos;s functionality.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3. Content and Accuracy
                    </h3>
                    <p>
                      While we strive to provide accurate practice questions,
                      TestTutor does not guarantee the accuracy of all content.
                      Users should verify information with official sources. We
                      are not responsible for exam results or outcomes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      4. Free Service
                    </h3>
                    <p>
                      TestTutor is completely free to use. We do not charge
                      fees, require subscriptions, or sell user data. The
                      platform is maintained through community contributions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      5. User Responsibilities
                    </h3>
                    <p>
                      Users are responsible for maintaining the confidentiality
                      of their account information and for all activities under
                      their account. Please report any security concerns
                      immediately.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy Policy Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                  Privacy Policy
                </h2>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      1. Information We Collect
                    </h3>
                    <p>
                      We collect minimal information necessary to provide our
                      service:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        Account information (email, username) when you register
                      </li>
                      <li>
                        Test results and progress data to track your learning
                      </li>
                      <li>Basic usage analytics to improve the platform</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      2. How We Use Your Information
                    </h3>
                    <p>We use your information to:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        Provide personalized test experiences and track progress
                      </li>
                      <li>Send important service updates (if applicable)</li>
                      <li>Improve our platform and user experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3. Data Protection
                    </h3>
                    <p>We take data protection seriously:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        We do not sell or share your personal data with third
                        parties
                      </li>
                      <li>Your test results remain private to your account</li>
                      <li>We use secure methods to store and transmit data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      4. Cookies and Tracking
                    </h3>
                    <p>
                      We use minimal cookies for essential functionality like
                      maintaining your login session. We do not use tracking
                      cookies for advertising purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      5. Your Rights
                    </h3>
                    <p>You have the right to:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Access your personal data</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your account and data</li>
                      <li>Export your test data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      6. Contact Us
                    </h3>
                    <p>
                      If you have questions about these terms or your privacy,
                      please contact us through our
                      <Link
                        href="/contact"
                        className="text-blue-600 hover:text-blue-800 underline ml-1"
                      >
                        contact page
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">
                  Last updated: August 2025
                </p>
                <p className="text-gray-600 mt-2">
                  TestTutor - Free practice tests for everyone
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
