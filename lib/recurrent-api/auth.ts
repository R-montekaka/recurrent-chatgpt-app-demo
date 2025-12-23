import { AuthTokenResponse, CachedToken } from "./types";
import { AuthenticationError, RateLimitError } from "./errors";

const AUTH_ENDPOINT = "https://api.recurrentauto.com/api/v1/auth_tokens";
const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000; // 5 minutes before expiry
const RATE_LIMIT_PER_HOUR = 100;

// Module-level cache (singleton)
let cachedToken: CachedToken | null = null;
let refreshPromise: Promise<CachedToken> | null = null;
let authRequestCount = 0;
let authRequestWindowStart = Date.now();

export class TokenManager {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.RECURRENT_CLIENT_ID || "";
    this.clientSecret = process.env.RECURRENT_CLIENT_SECRET || "";

    if (!this.clientId || !this.clientSecret) {
      console.warn(
        "Missing RECURRENT_CLIENT_ID or RECURRENT_CLIENT_SECRET environment variables"
      );
    }
  }

  async getToken(): Promise<string> {
    // Check if cached token is still valid (with buffer)
    if (this.isTokenValid(cachedToken)) {
      return cachedToken!.token;
    }

    // If refresh already in progress, wait for it
    if (refreshPromise) {
      const token = await refreshPromise;
      return token.token;
    }

    // Start new refresh
    refreshPromise = this.refreshToken();
    try {
      cachedToken = await refreshPromise;
      return cachedToken.token;
    } finally {
      refreshPromise = null;
    }
  }

  private isTokenValid(token: CachedToken | null): boolean {
    if (!token) return false;
    const now = new Date();
    const bufferTime = new Date(
      token.expiresAt.getTime() - TOKEN_REFRESH_BUFFER_MS
    );
    return now < bufferTime;
  }

  private async refreshToken(): Promise<CachedToken> {
    if (!this.clientId || !this.clientSecret) {
      throw new AuthenticationError(
        401,
        "Missing client credentials. Set RECURRENT_CLIENT_ID and RECURRENT_CLIENT_SECRET."
      );
    }

    // Rate limit check
    this.checkRateLimit();

    const response = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    this.incrementAuthRequestCount();

    if (response.status === 429) {
      const retryAfter = parseInt(
        response.headers.get("Retry-After") || "3600"
      );
      throw new RateLimitError(retryAfter);
    }

    if (response.status === 401) {
      throw new AuthenticationError(401, "Invalid client credentials");
    }

    if (!response.ok) {
      throw new AuthenticationError(
        response.status,
        `Failed to get auth token: ${response.statusText}`
      );
    }

    const data: AuthTokenResponse = await response.json();

    return {
      token: data.auth_token,
      expiresAt: new Date(data.auth_token_expires_at),
      fetchedAt: new Date(),
    };
  }

  private checkRateLimit(): void {
    const now = Date.now();
    const hourAgo = now - 3600000;

    if (authRequestWindowStart < hourAgo) {
      // Reset window
      authRequestWindowStart = now;
      authRequestCount = 0;
    }

    if (authRequestCount >= RATE_LIMIT_PER_HOUR) {
      const waitTime = Math.ceil(
        (authRequestWindowStart + 3600000 - now) / 1000
      );
      throw new RateLimitError(waitTime);
    }
  }

  private incrementAuthRequestCount(): void {
    authRequestCount++;
  }

  clearCache(): void {
    cachedToken = null;
    refreshPromise = null;
  }
}

// Singleton instance
let tokenManager: TokenManager | null = null;

export function getTokenManager(): TokenManager {
  if (!tokenManager) {
    tokenManager = new TokenManager();
  }
  return tokenManager;
}
