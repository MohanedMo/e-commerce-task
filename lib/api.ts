import axios from "axios";

export const API_BASE_URL = "https://dummyjson.com";

/**
 * Module-level variable to store the accessToken securely in-memory.
 * Storing this in a module closure prevents XSS scripts from reading
 * the token from cookies or localStorage.
 */
let memoryAccessToken = "";

/** Getter for in-memory access token */
export function getAccessToken(): string {
  return memoryAccessToken;
}

/** Setter for in-memory access token */
export function setAccessToken(token: string) {
  memoryAccessToken = token;
}

/**
 * Axios instance pre-configured with the DummyJSON base URL.
 * Interceptors inject the in-memory Bearer token and handle automatic refreshes.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Inject the in-memory access token if available
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor: Auto-refresh on 401 ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/** Process queued requests after token refresh */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Trigger refresh only on 401 Unauthorized, ensuring we don't loop on auth endpoints
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/")
    ) {
      if (isRefreshing) {
        // Queue subsequent requests while refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Request a new access token from our secure Next.js refresh endpoint.
        // The browser automatically attaches the HttpOnly refreshToken cookie.
        const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
        
        if (!refreshRes.ok) {
          throw new Error("Session refresh failed");
        }

        const data = await refreshRes.json();
        const newAccessToken = data.accessToken;

        if (!newAccessToken) {
          throw new Error("No token returned from refresh endpoint");
        }

        // Update the module variable (in-memory)
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        // Retry original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Clear local credentials on token refresh failure
        setAccessToken("");
        
        // Notify API route to clear cookies
        await fetch("/api/auth", { method: "DELETE" });

        // Redirect to login page in the browser
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
