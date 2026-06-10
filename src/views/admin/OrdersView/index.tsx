"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import GhostButton from "@/src/components/buttons/GhostButton";
import Reveal from "@/src/components/layout/Reveal";
import FormError from "@/src/components/form/FormError";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { fetchOrders } from "@/src/lib/store/slices/ordersSlice";
import type { OrderStatus } from "@/src/constants/orders";
import OrderCard from "./OrderCard";

type Filter = OrderStatus | "all";

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
];

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

export default function OrdersView() {
  const [filter, setFilter] = useState<Filter>("all");
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const loading = status === "idle" || status === "loading";
  const orders = useMemo(() => list, [list]);
  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((sum, o) => sum + o.amount, 0);

  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Storefront"
        title="Orders"
        description={
          loading
            ? "Loading live orders…"
            : `${orders.length} orders · ${paid.length} paid · ${usd(revenue)} captured.`
        }
        actions={<GhostButton href="/admin">Back to dashboard</GhostButton>}
      />

      <div className="flex flex-wrap items-center gap-2 pb-8">
        <div className="flex h-12 items-center gap-1 rounded-md border border-border-soft bg-bg-elevated px-2">
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

      {error && <FormError message={error} />}

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-xl border border-border-card bg-bg-card"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-card bg-bg-card py-20 text-center">
          <p className="font-display text-lg text-text-primary">
            No orders here
          </p>
          <p className="text-sm text-text-muted">
            No orders match this status yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o, i) => (
            <Reveal key={o.id} delay={i * 60} className="h-full">
              <OrderCard order={o} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
