"use client";

import { VehicleData } from "../types";
import { CarouselVehicleCard } from "./CarouselVehicleCard";

interface VehicleCarouselProps {
  vehicles: VehicleData[];
}

export function VehicleCarousel({ vehicles }: VehicleCarouselProps) {
  return (
    <div className="relative -mx-4 overflow-hidden px-4">
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none">
        {vehicles.map((vehicle) => (
          <CarouselVehicleCard key={vehicle.vin} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
