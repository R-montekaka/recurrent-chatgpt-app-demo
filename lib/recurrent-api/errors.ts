export class RecurrentApiError extends Error {
  public readonly status: number;
  public readonly retryable: boolean;

  constructor(status: number, message: string, retryable: boolean = false) {
    super(message);
    this.name = "RecurrentApiError";
    this.status = status;
    this.retryable = retryable;
  }
}

export class AuthenticationError extends RecurrentApiError {
  constructor(status: number, message: string) {
    super(status, `Authentication failed: ${message}`, status === 401);
    this.name = "AuthenticationError";
  }
}

export class RateLimitError extends RecurrentApiError {
  public readonly retryAfter: number;

  constructor(retryAfter: number) {
    super(429, `Rate limit exceeded. Retry after ${retryAfter} seconds.`, true);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class VehicleApiError extends RecurrentApiError {
  constructor(status: number, message: string) {
    const retryable = status >= 500 || status === 429;
    super(status, `Vehicle API error: ${message}`, retryable);
    this.name = "VehicleApiError";
  }
}
