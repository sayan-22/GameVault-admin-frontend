// Caches the signed-in admin (id/name/email/role — NOT secret) so the UI can
// render instantly on load, before the /me check confirms the session.
// Auth tokens are NOT stored here anymore: they live in httpOnly cookies that
// JavaScript can't read, which is what keeps them safe from XSS.

const USER_KEY = "gv_admin_user";

const isBrowser = typeof window !== "undefined";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

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

export function clearStoredUser() {
  if (isBrowser) localStorage.removeItem(USER_KEY);
}
