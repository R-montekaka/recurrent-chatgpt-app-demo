"use client";

import { ShimmerText } from "@openai/apps-sdk-ui/components/ShimmerText";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="mb-4">
        <ShimmerText as="h1" className="text-2xl font-bold">
          Loading vehicles...
        </ShimmerText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <ShimmerText as="h3" className="font-semibold text-lg">
                Loading vehicle...
              </ShimmerText>
              <ShimmerText className="text-xl font-bold">$00,000</ShimmerText>
              <ShimmerText className="text-sm">Loading specs...</ShimmerText>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
