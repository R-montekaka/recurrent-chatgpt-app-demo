"use client";

import { ShimmerText } from "@openai/apps-sdk-ui/components/ShimmerText";

export function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="border rounded-lg overflow-hidden shadow-sm bg-surface">
          <div className="aspect-video bg-gray-100 animate-pulse" />
          <div className="p-4">
            <ShimmerText as="h3" className="font-semibold text-lg">
              Loading vehicle...
            </ShimmerText>
            <ShimmerText className="text-sm text-secondary mt-1">
              Loading trim...
            </ShimmerText>

            <ShimmerText className="text-xl font-bold mt-2">
              $00,000
            </ShimmerText>

            <div className="mt-3 space-y-1 text-sm text-secondary">
              <ShimmerText>Odometer: 00,000 miles</ShimmerText>
              <ShimmerText>Range: 000 miles</ShimmerText>
              <ShimmerText>Color: Loading...</ShimmerText>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <ShimmerText className="text-xs px-2 py-1 rounded-full bg-gray-100">
                active
              </ShimmerText>
              <ShimmerText className="text-xs px-2 py-1 rounded-full bg-gray-100">
                BEV
              </ShimmerText>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
