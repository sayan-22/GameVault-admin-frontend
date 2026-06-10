"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/src/lib/store/hooks";
import LoadingView from "@/src/views/LoadingView";

// The admin app's entry point. Sends a signed-in admin to the dashboard and
// everyone else to Sign In — so the first screen is always the auth page.
export default function EntryView() {
  const { user, initializing } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;
    router.replace(user ? "/admin" : "/signin");
  }, [user, initializing, router]);

  return <LoadingView />;
}
