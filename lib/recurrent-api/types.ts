// Auth types
export interface AuthTokenRequest {
  client_id: string;
  client_secret: string;
}

export interface AuthTokenResponse {
  auth_token: string;
  auth_token_expires_at: string;
}

export interface CachedToken {
  token: string;
  expiresAt: Date;
  fetchedAt: Date;
}

// Vehicle listing types
export interface VehicleListingsParams {
  make?: string;
  model?: string;
  year?: number;
  type?: string;
  battery_range_miles_min?: number;
  battery_range_miles_max?: number;
  price_min?: number;
  price_max?: number;
  city?: string;
  offset?: number;
  limit?: number;
  inventory_status?: string;
}

export interface Vehicle {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  type: string;
  battery_range_miles: number;
  odometer: number;
  price: number;
  stock_number: string | null;
  exterior_color: string | null;
  inventory_status: string;
  photo: string;
}

export interface VehicleListingsResponse {
  vehicles: Vehicle[];
}
