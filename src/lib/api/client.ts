import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "@/src/lib/config";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/src/lib/auth/storage";

export const api = axios.create({ baseURL: API_BASE });

// Attach the access token to every request.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// Single-flight refresh so concurrent 401s share one refresh call.
let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const res = await axios.post(`${API_BASE}/admin/auth/refresh`, {
      refreshToken,
    });
    const access: string | undefined = res.data?.data?.accessToken;
    if (!access) return null;
    setTokens(access);
    return access;
  } catch {
    return null;
  }
}

// Endpoints where a 401 is a real answer (bad creds / expired link), not a
// signal to refresh-and-retry. Excludes /me so a stale access token still
// transparently refreshes on app load.
const NO_RETRY = [
  "/admin/auth/signin",
  "/admin/auth/signup",
  "/admin/auth/refresh",
  "/admin/auth/forgot-password",
  "/admin/auth/reset-password",
];

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status;
    const url = original?.url ?? "";
    const skip = NO_RETRY.some((p) => url.includes(p));

    // On a 401, try one refresh + retry (except for the auth calls above).
    if (status === 401 && original && !original._retry && !skip) {
      original._retry = true;
      refreshing = refreshing ?? refreshAccessToken();
      const newToken = await refreshing;
      refreshing = null;

      if (newToken) {
        original.headers.set("Authorization", `Bearer ${newToken}`);
        return api(original);
      }

      // Refresh genuinely failed (refresh token expired/revoked) → drop stale
      // tokens and announce it. StoreProvider clears the Redux user, which makes
      // AdminGuard bounce to /signin. No hard window redirect (that looped on
      // public pages); public pages just stay put.
      clearAuth();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:expired"));
      }
    }

    return Promise.reject(error);
  }
);

// Pulls the backend's `{ success, message }` error message out of any failure.
export function apiError(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
}
