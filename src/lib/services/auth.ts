import authAxios from "./authAxios";
import { API_URLS } from "./AllAPIUrls";
import { userSchema, type User } from "./schemas";
import { setStoredUser, clearStoredUser } from "@/src/lib/auth/storage";

// The backend sets the auth cookies itself; the response body is just the user.
// We cache that user locally so the UI can render instantly on the next load.
function persist(user: User): User {
  setStoredUser(user);
  return user;
}

export async function signin(
  email: string,
  password: string,
  remember = false
): Promise<User> {
  const res = await authAxios.post(API_URLS.auth.signin, { email, password, remember });
  return persist(userSchema.parse(res.data.data));
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const res = await authAxios.post(API_URLS.auth.signup, { name, email, password });
  return persist(userSchema.parse(res.data.data));
}

export async function forgotPassword(email: string): Promise<void> {
  await authAxios.post(API_URLS.auth.forgotPassword, { email });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await authAxios.post(API_URLS.auth.resetPassword, { token, password });
}

export async function fetchMe(): Promise<User> {
  const res = await authAxios.get(API_URLS.auth.me);
  return userSchema.parse(res.data.data);
}

export async function logout(): Promise<void> {
  try {
    await authAxios.delete(API_URLS.auth.logout);
  } finally {
    clearStoredUser();
  }
}
