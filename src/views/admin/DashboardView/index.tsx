import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import StatCard from "@/src/components/cards/StatCard";
import DonutCard from "@/src/components/cards/DonutCard";
import BarListCard from "@/src/components/cards/BarListCard";
import Reveal from "@/src/components/layout/Reveal";
import {
  avgOrderValue,
  paidOrderCount,
  statusBreakdown,
  topPerformers,
  totalRevenue,
  unitsSold,
} from "@/src/constants/orders";
import QuickActions from "./QuickActions";
import RecentOrders from "./RecentOrders";

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

function HeaderBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
      Live · Derived from orders
    </span>
  );
}

export default function DashboardView() {
  const stats = [
    { label: "Revenue", value: usd(totalRevenue()), sublabel: "Paid orders, all time" },
    { label: "Units sold", value: String(unitsSold()), sublabel: "Items across paid orders" },
    { label: "Paid orders", value: String(paidOrderCount()), sublabel: "Successfully captured" },
    { label: "Avg order value", value: usd(avgOrderValue()), sublabel: "Revenue ÷ paid orders" },
  ];

  const topRows = topPerformers().map((p) => ({
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
        title="Welcome back, SK"
        description="Every number below is computed from real store orders — no estimates."
        actions={
          <>
            <GhostButton href="/admin/games">View all games</GhostButton>
            <PrimaryButton href="/admin/games/new">+ New game</PrimaryButton>
          </>
        }
      />

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
            segments={statusBreakdown()}
            centerLabel="Orders"
          />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2 *:h-full">
          <RecentOrders />
        </Reveal>
        <Reveal delay={120} className="*:h-full">
          <QuickActions />
        </Reveal>
      </div>
    </Container>
  );
}
