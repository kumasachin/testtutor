"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LifeInUkPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/life-uk-test");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-lg text-gray-600">
          Redirecting to Life in UK tests...
        </p>
      </div>
    </div>
  );
}
