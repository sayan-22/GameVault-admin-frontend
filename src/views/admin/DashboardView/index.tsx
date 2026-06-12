"use client";

import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import StatCard from "@/src/components/cards/StatCard";
import DonutCard from "@/src/components/cards/DonutCard";
import BarListCard from "@/src/components/cards/BarListCard";
import Reveal from "@/src/components/layout/Reveal";
import FormError from "@/src/components/form/FormError";
import LoadingView from "@/src/views/LoadingView";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { usePolling } from "@/src/lib/hooks/usePolling";
import { fetchDashboard } from "@/src/lib/store/slices/dashboardSlice";
import QuickActions from "./QuickActions";
import RecentOrders from "./RecentOrders";

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const STATUS_COLOR: Record<string, string> = {
  Paid: "#00C16A",
  Pending: "#00D9FF",
  Failed: "#FF5A5F",
};

function HeaderBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
      Live · Derived from orders
    </span>
  );
}

export default function DashboardView() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((s) => s.dashboard);

  // Auto-refresh: poll every 15s + on tab focus, so revenue/orders update live
  // without a manual refresh. Loading view only on the very first load.
  usePolling(() => dispatch(fetchDashboard()));

  if (!data && (status === "idle" || status === "loading")) return <LoadingView />;

  const stats = data
    ? [
        { label: "Revenue", value: usd(data.stats.revenue), sublabel: "Paid orders, all time" },
        { label: "Units sold", value: String(data.stats.units), sublabel: "Items across paid orders" },
        { label: "Paid orders", value: String(data.stats.paidOrders), sublabel: "Successfully captured" },
        { label: "Avg order value", value: usd(data.stats.avgOrderValue), sublabel: "Revenue ÷ paid orders" },
      ]
    : [];

  const segments = (data?.ordersByStatus ?? []).map((s) => ({
    ...s,
    color: STATUS_COLOR[s.label] ?? "#8B949E",
  }));

  const topRows = (data?.topPerformers ?? []).map((p) => ({
    id: p.gameId,
    label: p.title,
    sublabel: `${p.units} sold`,
    value: p.revenue,
    valueLabel: usd(p.revenue),
  }));

  return (
    <Container className="py-10">
      <div className="pb-4">
        <HeaderBadge />
      </div>

      <PageHeader
        eyebrow="Admin · Overview"
        title="Welcome back"
        description="Every number below is computed from real store orders — no estimates."
        actions={
          <>
            <GhostButton href="/admin/games">View all games</GhostButton>
            <PrimaryButton href="/admin/games/new">+ New game</PrimaryButton>
          </>
        }
      />

      {error && <FormError message={error} />}

      <Reveal>
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2 *:h-full">
          <BarListCard
            title="Top performers"
            subtitle="Revenue · from paid orders"
            rows={topRows}
          />
        </Reveal>
        <Reveal delay={120} className="*:h-full">
          <DonutCard
            title="Orders by status"
            subtitle="All orders to date"
            segments={segments}
            centerLabel="Orders"
          />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2 *:h-full">
          <RecentOrders orders={data?.recentOrders ?? []} />
        </Reveal>
        <Reveal delay={120} className="*:h-full">
          <QuickActions />
        </Reveal>
      </div>
    </Container>
  );
}
