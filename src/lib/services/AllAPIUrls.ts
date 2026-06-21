// Centralized backend endpoint paths. Every service module references these
// instead of inlining strings, so a route change is a one-line edit here.
// `:id` style routes are functions that take the param.

export const API_URLS = {
  auth: {
    signin: "/admin/auth/signin",
    signup: "/admin/auth/signup",
    forgotPassword: "/admin/auth/forgot-password",
    resetPassword: "/admin/auth/reset-password",
    refresh: "/admin/auth/refresh",
    me: "/admin/auth/me",
    logout: "/admin/auth/logout",
  },
  games: {
    list: "/admin/games",
    create: "/admin/games",
    prices: "/admin/games/prices",
    byId: (id: string) => `/admin/games/${id}`,
  },
  orders: {
    list: "/admin/orders",
  },
  dashboard: {
    root: "/admin/dashboard",
  },
} as const;
