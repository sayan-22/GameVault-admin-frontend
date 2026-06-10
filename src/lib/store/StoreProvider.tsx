"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { bootstrapAuth, hydrate, setUser } from "./slices/authSlice";

export default function StoreProvider({ children }: { children: ReactNode }) {
  // Client-only: hydrate the user from storage, then revalidate against /me
  // (which also transparently refreshes an expired access token).
  useEffect(() => {
    store.dispatch(hydrate());
    store.dispatch(bootstrapAuth());
  }, []);

  // When a refresh ultimately fails (dead/expired refresh token), the axios
  // client fires "auth:expired" — clear the user so AdminGuard routes to login.
  useEffect(() => {
    const onExpired = () => store.dispatch(setUser(null));
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
