import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "TestTutor - Life in UK Practice Tests & Citizenship Exam Preparation",
    template: "%s | TestTutor - Life in UK Tests",
  },
  description:
    "Prepare for your Life in UK citizenship test with comprehensive practice exams covering British history, culture, government, and law. Free official practice tests with detailed explanations.",
  keywords: [
    "Life in UK test",
    "British citizenship test",
    "UK citizenship exam",
    "Life in UK practice",
    "British culture test",
    "UK government test",
    "citizenship preparation",
    "immigration test UK",
    "British history test",
    "UK naturalization test",
  ],
  authors: [{ name: "TestTutor" }],
  creator: "TestTutor",
  publisher: "TestTutor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://testtutor.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title:
      "TestTutor - Life in UK Practice Tests & Citizenship Exam Preparation",
    description:
      "Prepare for your Life in UK citizenship test with comprehensive practice exams covering British history, culture, government, and law.",
    siteName: "TestTutor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TestTutor - Life in UK Practice Tests",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "TestTutor - Life in UK Practice Tests & Citizenship Exam Preparation",
    description:
      "Prepare for your Life in UK citizenship test with comprehensive practice exams covering British history, culture, government, and law.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">{children}</div>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
