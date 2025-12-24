"use client";

import { VehicleData } from "../types";
import {
  VehicleCard,
  LoadingState,
  ErrorState,
  EmptyState,
  SearchFilterBadges,
} from "../components";

const vehicles: VehicleData[] = [
    {
      "vin": "5YJ3E1EB7KF205429",
      "year": 2019,
      "make": "Tesla",
      "model": "Model 3",
      "trim": "Long Range AWD",
      "type": "BEV",
      "batteryRangeMiles": 310,
      "odometer": 53438,
      "price": 23445,
      "stockNumber": null,
      "exteriorColor": null,
      "inventoryStatus": "active",
      "photo": "https://images.dealer.com/autodata/us/large_stockphoto/2019/USC90TSC032A0.jpg"
    },
    {
      "vin": "5YJYGDEF4MF079117",
      "year": 2021,
      "make": "Tesla",
      "model": "Model Y",
      "trim": "Performance AWD",
      "type": "BEV",
      "batteryRangeMiles": 303,
      "odometer": 44526,
      "price": 28496,
      "stockNumber": null,
      "exteriorColor": null,
      "inventoryStatus": "active",
      "photo": "https://pictures.dealer.com/s/sonicbeverlyhillsbmw/1621/feccf4e478e369612edfa624321d0531x.jpg"
    },    
  ]

export default function Page() {

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">
          {vehicles.length} Vehicle{vehicles.length !== 1 ? "s" : ""} Found
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vin} vehicle={vehicle} />
        ))}
      </div>
    </div>
  )

}
