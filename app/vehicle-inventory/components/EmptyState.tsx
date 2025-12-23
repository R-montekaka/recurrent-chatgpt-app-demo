"use client";

export function EmptyState() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No Vehicles Found</h2>
        <p className="text-gray-600">
          Try adjusting your search criteria to find more vehicles.
        </p>
      </div>
    </div>
  );
}
