import { getTokenManager } from "./auth";
import { VehicleListingsParams, VehicleListingsResponse } from "./types";
import { VehicleApiError, AuthenticationError } from "./errors";

const VEHICLE_LISTINGS_PATH = "/v1/dealer_vehicle_listings";
const MAX_RETRIES = 2;

function getApiBaseUrl(): string {
  const baseUrl = process.env.RECURRENT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing RECURRENT_API_BASE_URL environment variable");
  }
  return baseUrl;
}

export class RecurrentApiClient {
  private tokenManager = getTokenManager();

  async getVehicleListings(
    params: VehicleListingsParams = {}
  ): Promise<VehicleListingsResponse> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const token = await this.tokenManager.getToken();
        const response = await this.fetchListings(token, params);
        return response;
      } catch (error) {
        lastError = error as Error;

        // On 401, clear token cache and retry
        if (
          error instanceof AuthenticationError &&
          error.status === 401 &&
          attempt < MAX_RETRIES
        ) {
          this.tokenManager.clearCache();
          continue;
        }

        // On server errors, retry with backoff
        if (
          error instanceof VehicleApiError &&
          error.retryable &&
          attempt < MAX_RETRIES
        ) {
          await this.delay(Math.pow(2, attempt) * 1000);
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  }

  private async fetchListings(
    token: string,
    params: VehicleListingsParams
  ): Promise<VehicleListingsResponse> {
    const url = new URL(VEHICLE_LISTINGS_PATH, getApiBaseUrl());

    // Add query params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });

    // Set default limit if not provided
    if (!params.limit) {
      url.searchParams.set("limit", "1000");
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new AuthenticationError(401, "Token invalid or expired");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new VehicleApiError(response.status, errorText);
    }

    return response.json();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton export
let client: RecurrentApiClient | null = null;

export function getRecurrentApiClient(): RecurrentApiClient {
  if (!client) {
    client = new RecurrentApiClient();
  }
  return client;
}
