// Persists the admin's auth tokens + public user in localStorage. Guarded for
// SSR (no window). Keep keys namespaced so they don't collide with the
// storefront app running on the same host during local dev.

const ACCESS_KEY = "gv_admin_access";
const REFRESH_KEY = "gv_admin_refresh";
const USER_KEY = "gv_admin_user";

const isBrowser = typeof window !== "undefined";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function getAccessToken(): string | null {
  return isBrowser ? localStorage.getItem(ACCESS_KEY) : null;
}

export function getRefreshToken(): string | null {
  return isBrowser ? localStorage.getItem(REFRESH_KEY) : null;
}

export function setTokens(access: string, refresh?: string) {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function getStoredUser(): StoredUser | null {
  if (!isBrowser) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  if (isBrowser) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  if (!isBrowser) return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}
