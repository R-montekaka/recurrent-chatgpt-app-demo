"use client";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-red-800 font-semibold">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );
}
