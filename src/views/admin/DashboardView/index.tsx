import Container from "@/src/components/layout/Container";
import PageHeader from "@/src/components/layout/PageHeader";
import PrimaryButton from "@/src/components/buttons/PrimaryButton";
import GhostButton from "@/src/components/buttons/GhostButton";
import StatCard from "@/src/components/cards/StatCard";
import ChartCard from "@/src/components/cards/ChartCard";
import DonutCard from "@/src/components/cards/DonutCard";
import BarListCard from "@/src/components/cards/BarListCard";
import Reveal from "@/src/components/layout/Reveal";
import {
  CATALOG_HEALTH,
  DASHBOARD_STATS,
  REVENUE_TREND,
  TOP_PERFORMERS,
} from "@/src/constants/dashboard";
import QuickActions from "./QuickActions";

function HeaderBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
      Live · Synced moments ago
    </span>
  );
}

export default function DashboardView() {
  const topRows = TOP_PERFORMERS.map((g) => ({
    id: g.id,
    label: g.title,
    sublabel: g.studio,
    value: g.revenue,
    valueLabel: `$${g.revenue.toLocaleString()}`,
    href: `/admin/games/${g.id}`,
  }));

  return (
    <Container className="py-10">
      <div className="pb-4">
        <HeaderBadge />
      </div>

      <PageHeader
        eyebrow="Admin · Overview"
        title="Welcome back, SK"
        description="A premium-grade snapshot of how your store is performing this month."
        actions={
          <>
            <GhostButton href="/admin/games">View all games</GhostButton>
            <PrimaryButton href="/admin/games/new">+ New game</PrimaryButton>
          </>
        }
      />

      <Reveal>
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </section>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2 *:h-full">
          <ChartCard
            title="Revenue trend"
            subtitle="Daily gross · last 30 days"
            data={REVENUE_TREND}
            value="$184,260"
            delta="+12.4% vs prior period"
            positive
          />
        </Reveal>
        <Reveal delay={120} className="*:h-full">
          <DonutCard
            title="Catalog health"
            subtitle="Current title distribution"
            segments={CATALOG_HEALTH}
            centerLabel="Titles"
          />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2 *:h-full">
          <BarListCard
            title="Top performers"
            subtitle="Revenue · last 30 days"
            rows={topRows}
            rightAction={
              <span className="text-xs font-semibold text-accent hover:underline cursor-pointer">
                See report
              </span>
            }
          />
        </Reveal>

        <Reveal delay={120} className="*:h-full">
          <QuickActions />
        </Reveal>
      </div>
    </Container>
  );
}
