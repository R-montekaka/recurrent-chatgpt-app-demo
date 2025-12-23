"use client";

import { useWidgetProps, useIsChatGptApp } from "../hooks";
import { WidgetProps } from "./types";
import {
  VehicleCard,
  LoadingState,
  ErrorState,
  EmptyState,
  SearchFilterBadges,
} from "./components";

export default function Page() {
  const toolOutput = useWidgetProps<WidgetProps>();
  const isChatGptApp = useIsChatGptApp();

  // Extract data from tool output
  const data = toolOutput?.result?.structuredContent || toolOutput;
  const vehicles = data?.vehicles || [];
  const searchParams = data?.searchParams;
  const error = data?.error;

  // Loading state for ChatGPT context
  if (isChatGptApp && !data) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Empty state
  if (vehicles.length === 0) {
    return <EmptyState />;
  }

  // Main content
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {searchParams && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">
            {vehicles.length} Vehicle{vehicles.length !== 1 ? "s" : ""} Found
          </h1>
          <SearchFilterBadges searchParams={searchParams} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vin} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
