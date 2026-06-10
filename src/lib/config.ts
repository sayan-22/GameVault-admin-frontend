// Backend base URL. Override per-environment with NEXT_PUBLIC_API_URL.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// All admin/user endpoints live under /api.
export const API_BASE = `${API_URL}/api`;
