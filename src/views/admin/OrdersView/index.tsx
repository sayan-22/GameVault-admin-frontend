"use client";

import { useMemo, useState } from "react";
import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import {
  ORDERS,
  paidOrderCount,
  totalRevenue,
  type OrderStatus,
} from "@/src/constants/orders";
import OrderCard from "./OrderCard";

type Filter = OrderStatus | "all";

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
];

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function OrdersView() {
  const [filter, setFilter] = useState<Filter>("all");

  const orders = useMemo(
    () => (filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter)),
    [filter]
  );

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Storefront"
        title="Orders"
        description={`${ORDERS.length} orders · ${paidOrderCount()} paid · ${usd(totalRevenue())} captured.`}
        actions={<GhostButton href="/admin">Back to dashboard</GhostButton>}
      />

      <div className="flex flex-wrap items-center gap-2 pb-8">
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-border-soft bg-bg-elevated p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                filter === f.key
                  ? "bg-accent text-[#001016]"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-card bg-bg-card py-20 text-center">
          <p className="font-display text-lg text-text-primary">No orders here</p>
          <p className="text-sm text-text-muted">No orders match this status yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((o, i) => (
            <Reveal key={o._id} delay={i * 60}>
              <OrderCard order={o} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
