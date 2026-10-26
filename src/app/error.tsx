"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Send to your error tracker (Sentry, etc.) here.
    console.error(error);
  }, [error]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred. {error.digest ? `Reference: ${error.digest}` : null}
      </p>
      <button
        onClick={reset}
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Try again
      </button>
    </section>
  );
}
