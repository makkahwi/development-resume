import axios from "axios";

/**
 * Base URL for your backend API.
 * For now this can point to Firebase RTDB REST endpoint or any custom backend.
 *
 * Example (Firebase RTDB public read):
 *  NEXT_PUBLIC_API_BASE_URL=https://your-project-id.firebaseio.com
 *
 * Example (custom backend):
 *  NEXT_PUBLIC_API_BASE_URL=https://api.suhaib.dev
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create a shared axios instance.
export const api = axios.create({
  baseURL: API_BASE_URL || "", // empty → we'll handle fallbacks in data layer
  timeout: 10000,
});

// Optional: helper to detect if API is configured
export const isApiConfigured = (): boolean => {
  return Boolean(API_BASE_URL);
}
