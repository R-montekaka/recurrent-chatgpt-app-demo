"use client";

import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Image } from "@openai/apps-sdk-ui/components/Image";
import { VehicleData } from "../types";
import { useSendMessage } from "@/app/hooks";

interface CarouselVehicleCardProps {
  vehicle: VehicleData;
}

export function CarouselVehicleCard({ vehicle }: CarouselVehicleCardProps) {
  const sendMessage = useSendMessage();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const handleViewDetails = () => {
    sendMessage(
      `Tell me more about the ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} (VIN: ${vehicle.vin})`
    );
  };

  return (
    <div className="flex-shrink-0 w-64 snap-start border rounded-lg overflow-hidden shadow-sm bg-surface">
      {vehicle.photo && (
        <div className="aspect-square bg-gray-100">
          <Image
            src={vehicle.photo}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <Badge color="warning" variant="soft" size="sm" className="flex-shrink-0">
            {formattedPrice}
          </Badge>
        </div>

        <p className="text-sm text-secondary mt-1">{vehicle.trim}</p>

        <p className="text-sm text-secondary mt-1 line-clamp-2">
          {vehicle.batteryRangeMiles} mi range &middot; {new Intl.NumberFormat("en-US").format(vehicle.odometer)} mi
        </p>

        <Button
          color="primary"
          variant="soft"
          size="sm"
          block
          className="mt-3"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
