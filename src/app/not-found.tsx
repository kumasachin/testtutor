import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found - TestTutor",
  description:
    "The page you are looking for could not be found. Return to TestTutor to continue your Life in UK test preparation.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            page may have been moved or doesn&apos;t exist.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/life-uk-test"
              className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Life in UK Tests
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Popular Pages
            </h2>
            <div className="space-y-2 text-sm">
              <Link
                href="/life-uk-test"
                className="block text-blue-600 hover:text-blue-800"
              >
                Life in UK Practice Tests
              </Link>
              <Link
                href="/about"
                className="block text-blue-600 hover:text-blue-800"
              >
                About TestTutor
              </Link>
              <Link
                href="/contact"
                className="block text-blue-600 hover:text-blue-800"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
