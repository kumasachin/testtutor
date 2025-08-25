import type { Metadata } from "next";

import SimpleTestPage from "./page";

interface TestPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock test data - in real app, this would come from your database
const testData = {
  "life-uk-test-1": {
    title: "Life in UK Practice Test 1",
    description:
      "Official practice test for UK citizenship covering British history, traditions, and government",
    questions: 24,
  },
  "life-uk-test-2": {
    title: "Life in UK Practice Test 2",
    description:
      "Additional practice questions covering British culture and society",
    questions: 24,
  },
  "life-uk-test-3": {
    title: "Life in UK History Test",
    description:
      "Focused test on British history from ancient times to modern day",
    questions: 24,
  },
  "life-uk-test-4": {
    title: "Life in UK Government and Politics",
    description:
      "Test covering the UK government system, politics, and democratic principles",
    questions: 24,
  },
  "life-uk-test-5": {
    title: "Life in UK Culture and Traditions",
    description:
      "Test about British culture, traditions, sports, and national celebrations",
    questions: 24,
  },
  "life-uk-test-6": {
    title: "Life in UK Geography Test",
    description:
      "Test covering the geography of the UK, regions, and important locations",
    questions: 24,
  },
};

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const test = testData[resolvedParams.id as keyof typeof testData];

  if (!test) {
    return {
      title: "Test Not Found | TestTutor",
      description: "The requested test could not be found.",
    };
  }

  return {
    title: `${test.title} | TestTutor`,
    description: test.description,
    keywords: [
      "Life in UK test",
      "British citizenship test",
      "UK citizenship exam",
      "practice test",
      "citizenship preparation",
      "British culture",
      "UK government",
      "British history",
    ],
    openGraph: {
      title: `${test.title} | TestTutor`,
      description: test.description,
      type: "article",
      images: [
        {
          url: "/test-og.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: "/test-og.jpg",
        },
      ],
    },
    alternates: {
      canonical: `/test/${resolvedParams.id}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(testData).map((id) => ({
    id,
  }));
}

export default function TestPage({ params }: TestPageProps) {
  return <SimpleTestPage params={params} />;
}
