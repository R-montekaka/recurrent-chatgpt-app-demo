"use client";

import { VehicleData } from "../types";
import { VehicleCarousel } from "../components";

const vehicles: VehicleData[] = [
  {
    vin: "5YJ3E1EB7KF205429",
    year: 2019,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    type: "BEV",
    batteryRangeMiles: 310,
    odometer: 53438,
    price: 23445,
    stockNumber: null,
    exteriorColor: null,
    inventoryStatus: "active",
    photo: "https://images.dealer.com/autodata/us/large_stockphoto/2019/USC90TSC032A0.jpg",
  },
  {
    vin: "5YJYGDEF4MF079117",
    year: 2021,
    make: "Tesla",
    model: "Model Y",
    trim: "Performance AWD",
    type: "BEV",
    batteryRangeMiles: 303,
    odometer: 44526,
    price: 28496,
    stockNumber: null,
    exteriorColor: null,
    inventoryStatus: "active",
    photo: "https://pictures.dealer.com/s/sonicbeverlyhillsbmw/1621/feccf4e478e369612edfa624321d0531x.jpg",
  },
  {
    vin: "1N4AZ1CV8NC556789",
    year: 2022,
    make: "Nissan",
    model: "Leaf",
    trim: "SV Plus",
    type: "BEV",
    batteryRangeMiles: 226,
    odometer: 18500,
    price: 19995,
    stockNumber: "NL2201",
    exteriorColor: "Pearl White",
    inventoryStatus: "active",
    photo: "https://images.dealer.com/autodata/us/large_stockphoto/2022/USC90NIC021A0.jpg",
  },
  {
    vin: "WBY8P6C5XLK123456",
    year: 2020,
    make: "BMW",
    model: "i3",
    trim: "s with Range Extender",
    type: "PHEV",
    batteryRangeMiles: 153,
    odometer: 32100,
    price: 21750,
    stockNumber: "BMW2020",
    exteriorColor: "Capparis White",
    inventoryStatus: "active",
    photo: "https://images.dealer.com/autodata/us/large_stockphoto/2020/USC90BMC131A0.jpg",
  },
  {
    vin: "1G1FY6S07N4109876",
    year: 2022,
    make: "Chevrolet",
    model: "Bolt EV",
    trim: "2LT",
    type: "BEV",
    batteryRangeMiles: 259,
    odometer: 22340,
    price: 22499,
    stockNumber: "CHV2022",
    exteriorColor: "Bright Blue",
    inventoryStatus: "active",
    photo: "https://images.dealer.com/autodata/us/large_stockphoto/2022/USC90CHC171A0.jpg",
  },
];

export default function Page() {
  return (
    <div className="bg-background text-foreground p-4">
      <VehicleCarousel vehicles={vehicles} />
    </div>
  );
}
