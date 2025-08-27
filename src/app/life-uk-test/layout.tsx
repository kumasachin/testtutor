import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life in the UK Test Practice | TestTutor",
  description:
    "Master the official Life in the UK Test with our comprehensive practice tests. Test your knowledge of British history, traditions, and culture.",
  keywords:
    "Life in UK test, British citizenship test, UK culture, British history, practice test",
};

export default function LifeUkTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="life-uk-test-layout">{children}</div>;
}
