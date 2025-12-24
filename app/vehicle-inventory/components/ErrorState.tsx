"use client";

import { Alert } from "@openai/apps-sdk-ui/components/Alert";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <Alert color="danger" title="Error" description={error} />
    </div>
  );
}
