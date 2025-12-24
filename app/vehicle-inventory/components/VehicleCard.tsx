"use client";

import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Image } from "@openai/apps-sdk-ui/components/Image";
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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-surface">
      {vehicle.photo && (
        <div className="aspect-video bg-gray-100">
          <Image
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
        {vehicle.trim && <p className="text-sm text-secondary">{vehicle.trim}</p>}

        <p className="text-xl font-bold text-success mt-2">{formattedPrice}</p>

        <div className="mt-3 space-y-1 text-sm text-secondary">
          <p>Odometer: {formattedOdometer} miles</p>
          <p>Range: {vehicle.batteryRangeMiles} miles</p>
          {vehicle.exteriorColor && <p>Color: {vehicle.exteriorColor}</p>}
          {vehicle.stockNumber && <p>Stock: {vehicle.stockNumber}</p>}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge
            color={vehicle.inventoryStatus === "active" ? "success" : "warning"}
            variant="soft"
            size="sm"
          >
            {vehicle.inventoryStatus}
          </Badge>
          <Badge color="info" variant="soft" size="sm">
            {vehicle.type}
          </Badge>
        </div>
      </div>
    </div>
  );
}
