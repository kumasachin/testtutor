import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TestTutor - Life in UK Test Preparation Platform",
  description:
    "Learn about TestTutor, the comprehensive Life in UK test preparation platform helping thousands prepare for their British citizenship test.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About TestTutor
          </h1>

          <div className="prose prose-lg max-w-none">
            <p>
              TestTutor is a comprehensive online platform dedicated to helping
              individuals prepare for the Life in UK test, a crucial requirement
              for British citizenship and settlement applications.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe that everyone deserves access to high-quality test
              preparation materials. Our mission is to provide comprehensive,
              accurate, and accessible practice tests that mirror the official
              Life in UK examination.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>
                Comprehensive practice tests covering all Life in UK topics
              </li>
              <li>Detailed explanations for every question and answer</li>
              <li>Progress tracking and performance analytics</li>
              <li>Mobile-friendly platform for studying on the go</li>
              <li>Regular updates to reflect the latest test requirements</li>
            </ul>

            <h2>Test Coverage</h2>
            <p>
              Our practice tests cover all essential topics required for the
              Life in UK test:
            </p>
            <ul>
              <li>British history from ancient times to the present</li>
              <li>Government and politics</li>
              <li>Culture and traditions</li>
              <li>Geography and regions</li>
              <li>Legal system and law</li>
              <li>Modern British society</li>
            </ul>

            <h2>Accuracy and Quality</h2>
            <p>
              All our practice questions are carefully crafted based on the
              official Life in UK handbook and test requirements. We regularly
              review and update our content to ensure accuracy and relevance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
