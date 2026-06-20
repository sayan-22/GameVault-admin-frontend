"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/src/components/ui";
import { LinkButton } from "@/src/components/buttons";
import { STATUS_TONE } from "@/src/constants";
import type { Dashboard } from "@/src/lib/api/schemas";

const fmt = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(n);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function RecentOrders({
  orders,
}: {
  orders: Dashboard["recentOrders"];
}) {
  const router = useRouter();

  return (
    <div className="hover-lift card-glow flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Recent orders
          </h3>
          <p className="text-xs text-text-muted">
            Latest activity across the store
          </p>
        </div>
        <LinkButton
          text="View all"
          onClick={() => router.push("/admin/orders")}
          Icon={ArrowRight}
          iconPosition="right"
        />
      </header>

      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-text-muted">No orders yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border-soft">
          {orders.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate font-mono text-xs text-text-secondary">
                  {o.id}
                </span>
                <span className="truncate text-xs text-text-muted">
                  {o.items.length} {o.items.length === 1 ? "item" : "items"} ·{" "}
                  {fmtDate(o.createdAt)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-display text-sm font-bold text-text-primary">
                  {fmt(o.amount, o.currency)}
                </span>
                <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
