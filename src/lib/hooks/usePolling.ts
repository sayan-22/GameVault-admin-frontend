"use client";

import { useEffect, useRef } from "react";

// How often admin views re-check the backend for changes.
const DEFAULT_MS = 15000;

// Runs `tick` on mount, then on an interval, and whenever the tab regains focus
// — so admin data (orders, dashboard) reflects backend changes (e.g. a purchase
// flipping an order to "paid") without a manual refresh.
export function usePolling(tick: () => void, intervalMs = DEFAULT_MS) {
  const ref = useRef(tick);
  useEffect(() => {
    ref.current = tick;
  });

  useEffect(() => {
    const run = () => ref.current();
    run();
    const interval = window.setInterval(run, intervalMs);
    window.addEventListener("focus", run);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", run);
    };
  }, [intervalMs]);
}
