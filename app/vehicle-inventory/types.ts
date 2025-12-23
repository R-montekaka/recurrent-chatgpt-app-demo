export interface VehicleData {
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

export type SearchParams = {
  make?: string;
  model?: string;
  year?: number;
  city?: string;
  priceMin?: number;
  priceMax?: number;
};

export type WidgetProps = {
  vehicles?: VehicleData[];
  searchParams?: SearchParams;
  totalCount?: number;
  error?: string;
  result?: {
    structuredContent?: {
      vehicles?: VehicleData[];
      searchParams?: SearchParams;
      totalCount?: number;
      error?: string;
    };
  };
} & Record<string, unknown>;
