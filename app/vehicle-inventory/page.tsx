"use client";

import { useWidgetProps, useIsChatGptApp } from "../hooks";

interface VehicleData {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  type: string;
  batteryRangeMiles: number;
  odometer: number;
  price: number;
  stockNumber: string | null;
  exteriorColor: string | null;
  inventoryStatus: string;
  photo: string;
}

type WidgetProps = {
  vehicles?: VehicleData[];
  searchParams?: {
    make?: string;
    model?: string;
    year?: number;
    city?: string;
    priceMin?: number;
    priceMax?: number;
  };
  totalCount?: number;
  error?: string;
  result?: {
    structuredContent?: {
      vehicles?: VehicleData[];
      searchParams?: {
        make?: string;
        model?: string;
        year?: number;
        city?: string;
        priceMin?: number;
        priceMax?: number;
      };
      totalCount?: number;
      error?: string;
    };
  };
} & Record<string, unknown>;

function VehicleCard({ vehicle }: { vehicle: VehicleData }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const formattedOdometer = new Intl.NumberFormat("en-US").format(
    vehicle.odometer
  );

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {vehicle.photo && (
        <div className="aspect-video bg-gray-100">
          <img
            src={vehicle.photo}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.trim && <p className="text-sm text-gray-600">{vehicle.trim}</p>}

        <p className="text-xl font-bold text-green-600 mt-2">{formattedPrice}</p>

        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p>Odometer: {formattedOdometer} miles</p>
          <p>Range: {vehicle.batteryRangeMiles} miles</p>
          {vehicle.exteriorColor && <p>Color: {vehicle.exteriorColor}</p>}
          {vehicle.stockNumber && <p>Stock: {vehicle.stockNumber}</p>}
        </div>

        <div className="mt-3">
          <span
            className={`inline-block px-2 py-1 text-xs rounded ${
              vehicle.inventoryStatus === "active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {vehicle.inventoryStatus}
          </span>
          <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 ml-2">
            {vehicle.type}
          </span>
        </div>
      </div>
    </div>
  );
}

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
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (vehicles.length === 0) {
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

  // Main content
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {searchParams && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">
            {vehicles.length} Vehicle{vehicles.length !== 1 ? "s" : ""} Found
          </h1>
          <div className="text-sm text-gray-600 flex flex-wrap gap-2">
            {searchParams.make && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {searchParams.make}
              </span>
            )}
            {searchParams.model && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {searchParams.model}
              </span>
            )}
            {searchParams.year && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {searchParams.year}
              </span>
            )}
            {searchParams.city && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {searchParams.city}
              </span>
            )}
          </div>
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
