// src/services/apiClient.js
// ---------------------------------------------------------------------------
// THIS IS THE ONLY FILE YOU NEED TO CHANGE WHEN A REAL BACKEND IS READY.
//
// Right now `USE_MOCK = true`, so every service function below resolves
// against the local mock data in `src/data/` (with a small artificial delay
// to behave like a real network call).
//
// When your backend exists:
//   1. Set USE_MOCK = false
//   2. Set BASE_URL to your API's root (e.g. import.meta.env.VITE_API_URL)
//   3. Make sure your backend exposes the same endpoints the services call
//      (see each file in src/services/ for the expected shape)
//
// No component or page needs to change — they only ever call functions from
// src/services/*, never this file or src/data/ directly.
// ---------------------------------------------------------------------------

export const USE_MOCK = true;

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const FAKE_LATENCY_MS = 350;

/** Simulates network latency for mock responses so loading states feel real. */
export function mockDelay(data, ms = FAKE_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/** Simulates a failed request (used to test/show error states with mock data). */
export function mockReject(message = "Something went wrong", ms = FAKE_LATENCY_MS) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new ApiError(message)), ms)
  );
}

export class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getAuthToken() {
  return localStorage.getItem("smit_auth_token");
}

/**
 * Thin wrapper around fetch for when USE_MOCK is false.
 * Automatically attaches the auth token and parses JSON.
 */
export async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getAuthToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    throw new ApiError(payload?.message || res.statusText, res.status);
  }

  return payload;
}
