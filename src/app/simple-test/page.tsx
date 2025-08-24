"use client";

import { useState, useEffect } from "react";

export default function SimpleTestPage() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/tests?domainName=Life in UK");
        const result = await response.json();

        if (result.success && result.data && result.data.tests) {
          setCount(result.data.tests.length);
        } else {
          setError("Failed to fetch tests");
        }
      } catch (err) {
        setError("Error: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Simple Test Count</h1>
      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <p>Tests found: {count}</p>}
      </div>
    </div>
  );
}
