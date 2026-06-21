"use client";

import { useEffect, useRef } from "react";

// How often admin views re-check the backend for changes.
const DEFAULT_MS = 15000;

// Runs `tick` on mount, then on an interval, and whenever the tab regains focus
// — so admin data (orders, dashboard) reflects backend changes (e.g. a purchase
// flipping an order to "paid") without a manual refresh.
//
// While the tab is hidden (another tab open, or minimized) the interval ticks
// are skipped to avoid wasted requests; the focus refetch catches everything up
// the moment you come back.
export function usePolling(tick: () => void, intervalMs = DEFAULT_MS) {
  const ref = useRef(tick);
  useEffect(() => {
    ref.current = tick;
  });

  useEffect(() => {
    // Only fetch when the tab is actually visible.
    const run = () => {
      if (!document.hidden) ref.current();
    };
    run();
    const interval = window.setInterval(run, intervalMs);
    window.addEventListener("focus", run);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", run);
    };
  }, [intervalMs]);
}
