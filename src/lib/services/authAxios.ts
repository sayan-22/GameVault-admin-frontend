import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "@/src/lib/config";
import { API_URLS } from "./AllAPIUrls";

// One axios instance for the whole admin app. `withCredentials: true` tells the
// browser to send our httpOnly auth cookies on every request (and to keep any
// cookies the backend sets back). We never read or store the tokens in JS.
const authAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Auth endpoints where a 401 simply means "wrong credentials / not logged in".
// There's nothing to refresh for these, so don't try.
const NO_REFRESH = [
  API_URLS.auth.signin,
  API_URLS.auth.signup,
  API_URLS.auth.refresh,
];

// When a request fails with 401 (the access cookie expired), try ONE silent
// refresh and replay the request. If the refresh also fails, the session is
// really over — announce it so the app can send the user to the login page.
authAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const url = original?.url ?? "";
    const skip = NO_REFRESH.some((path) => url.includes(path));

    if (error.response?.status === 401 && original && !original._retry && !skip) {
      original._retry = true;
      try {
        await authAxios.post(API_URLS.auth.refresh); // sets a new access cookie
        return authAxios(original); // replay the original request
      } catch {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:expired"));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;

// Pulls the backend's `{ success, message }` error text out of any failure.
export function apiError(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
}
