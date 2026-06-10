import { api } from "./client";
import { authDataSchema, userSchema, type User } from "./schemas";
import { clearAuth, setStoredUser, setTokens } from "@/src/lib/auth/storage";

async function persist(data: ReturnType<typeof authDataSchema.parse>): Promise<User> {
  setTokens(data.accessToken, data.refreshToken);
  setStoredUser(data.user);
  return data.user;
}

export async function signin(
  email: string,
  password: string,
  remember = false
): Promise<User> {
  const res = await api.post("/admin/auth/signin", { email, password, remember });
  return persist(authDataSchema.parse(res.data.data));
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const res = await api.post("/admin/auth/signup", { name, email, password });
  return persist(authDataSchema.parse(res.data.data));
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post("/admin/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await api.post("/admin/auth/reset-password", { token, password });
}

export async function fetchMe(): Promise<User> {
  const res = await api.get("/admin/auth/me");
  return userSchema.parse(res.data.data);
}

export async function logout(): Promise<void> {
  try {
    await api.delete("/admin/auth/logout");
  } finally {
    clearAuth();
  }
}
