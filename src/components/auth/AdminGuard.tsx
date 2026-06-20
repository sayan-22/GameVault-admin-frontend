"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAppSelector } from "@/src/lib/store/hooks";
import LoadingView from "@/src/views/LoadingView";

// Gates every /admin route: only an authenticated user with role "admin" gets
// through. While auth is resolving we show the loading view; otherwise we
// bounce to sign-in.
export default function AdminGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  const initializing = useAppSelector((s) => s.auth.initializing);
  const router = useRouter();
  const allowed = !!user && user.role === "admin";

  useEffect(() => {
    if (!initializing && !allowed) router.replace("/signin");
  }, [initializing, allowed, router]);

  if (initializing || !allowed) return <LoadingView />;
  return <>{children}</>;
}
