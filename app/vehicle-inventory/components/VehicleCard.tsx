"use client";

import { VehicleData } from "../types";

interface VehicleCardProps {
  vehicle: VehicleData;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
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
