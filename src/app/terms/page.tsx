import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - TestTutor Life in UK Tests",
  description:
    "Read TestTutor's terms of service for using our Life in UK test preparation platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-6">
              Last updated: August 25, 2025
            </p>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using TestTutor&apos;s website and services, you
              accept and agree to be bound by the terms and provision of this
              agreement. These Terms of Service govern your use of our Life in
              UK test preparation platform.
            </p>{" "}
            <h2>Description of Service</h2>
            <p>
              TestTutor provides online practice tests and study materials for
              the Life in UK test, which is required for British citizenship and
              settlement applications. Our service includes:
            </p>
            <ul>
              <li>Practice tests covering Life in UK topics</li>
              <li>Progress tracking and analytics</li>
              <li>Educational content and explanations</li>
              <li>Study guides and tips</li>
            </ul>
            <h2>User Responsibilities</h2>
            <p>As a user of our service, you agree to:</p>
            <ul>
              <li>Use the service only for lawful purposes</li>
              <li>Provide accurate information when creating an account</li>
              <li>Not share your account credentials with others</li>
              <li>Not attempt to reverse engineer or copy our content</li>
              <li>Respect the intellectual property rights of TestTutor</li>
            </ul>
            <h2>Intellectual Property</h2>
            <p>
              All content on TestTutor, including but not limited to text,
              graphics, logos, images, and practice questions, is the property
              of TestTutor and is protected by copyright and other intellectual
              property laws.
            </p>
            <h2>Disclaimer</h2>
            <p>
              TestTutor provides practice materials for educational purposes.
              While we strive for accuracy, we do not guarantee that our
              practice tests exactly match the official Life in UK test. Success
              on our practice tests does not guarantee success on the official
              test.
            </p>
            <h2>Limitation of Liability</h2>
            <p>
              TestTutor shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
            <h2>Service Availability</h2>
            <p>
              We strive to maintain continuous service availability but do not
              guarantee uninterrupted access. We may temporarily suspend the
              service for maintenance or updates.
            </p>
            <h2>Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the service, to understand our
              practices.
            </p>
            <h2>Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Your continued use of
              the service constitutes acceptance of the modified terms.
            </p>
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and access to the service
              immediately, without prior notice, for any reason whatsoever,
              including breach of these Terms.
            </p>
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of England and Wales, without regard to its conflict of
              law provisions.
            </p>
            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at: legal@testtutor.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
