"use client";

import { EmptyMessage } from "@openai/apps-sdk-ui/components/EmptyMessage";
import { Search } from "@openai/apps-sdk-ui/components/Icon";

export function EmptyState() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <EmptyMessage fill="none">
        <EmptyMessage.Icon>
          <Search />
        </EmptyMessage.Icon>
        <EmptyMessage.Title>No Vehicles Found</EmptyMessage.Title>
        <EmptyMessage.Description>
          Try adjusting your search criteria to find more vehicles.
        </EmptyMessage.Description>
      </EmptyMessage>
    </div>
  );
}
