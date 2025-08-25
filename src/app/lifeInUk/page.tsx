import type { Metadata } from "next";

import LifeInUkClient from "./LifeInUkClient";

export const metadata: Metadata = {
  title: "Life in UK Practice Tests - Official Citizenship Test Preparation",
  description:
    "Comprehensive Life in UK practice tests covering British history, culture, government, and law. Prepare for your UK citizenship test with 24-question practice exams and detailed explanations.",
  keywords: [
    "Life in UK test practice",
    "British citizenship test",
    "UK citizenship exam preparation",
    "Life in UK questions",
    "British culture test",
    "UK government test",
    "British history test",
    "citizenship test UK",
    "Life in UK mock test",
    "UK naturalization test",
  ],
  openGraph: {
    title: "Life in UK Practice Tests - Official Citizenship Test Preparation",
    description:
      "Comprehensive Life in UK practice tests covering British history, culture, government, and law. 24-question practice exams with detailed explanations.",
    type: "website",
    url: "/lifeInUk",
    images: [
      {
        url: "/life-in-uk-og.jpg",
        width: 1200,
        height: 630,
        alt: "Life in UK Practice Tests - TestTutor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life in UK Practice Tests - Official Citizenship Test Preparation",
    description:
      "Comprehensive Life in UK practice tests covering British history, culture, government, and law. 24-question practice exams with detailed explanations.",
    images: ["/life-in-uk-og.jpg"],
  },
  alternates: {
    canonical: "/lifeInUk",
  },
};

export default function LifeInUkPage() {
  return <LifeInUkClient />;
}
