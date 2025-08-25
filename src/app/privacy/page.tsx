import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TestTutor Life in UK Tests",
  description:
    "Read TestTutor's privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-6">
              Last updated: August 25, 2025
            </p>
            <h2>Introduction</h2>
            <p>
              TestTutor (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website and use our Life in UK test preparation
              services.
            </p>{" "}
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide
              to us, including:
            </p>
            <ul>
              <li>Name and email address (if you create an account)</li>
              <li>Test scores and progress data</li>
              <li>Communication preferences</li>
            </ul>
            <h3>Usage Information</h3>
            <p>
              We automatically collect certain information when you visit our
              website:
            </p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>IP address (anonymized)</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our test preparation services</li>
              <li>
                Track your progress and provide personalized recommendations
              </li>
              <li>Improve our website and services</li>
              <li>
                Send you updates and educational content (with your consent)
              </li>
              <li>Respond to your questions and provide customer support</li>
            </ul>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties except as described in this policy.
              We may share information with:
            </p>
            <ul>
              <li>Service providers who assist us in operating our website</li>
              <li>
                Analytics providers (Google Analytics) with anonymized data
              </li>
              <li>Legal authorities if required by law</li>
            </ul>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <h2>Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience on our website. You can control cookies through your
              browser settings.
            </p>
            <h2>Children&apos;s Privacy</h2>
            <p>
              We do not knowingly collect personal information from children
              under 13.
            </p>{" "}
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>{" "}
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at: privacy@testtutor.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
