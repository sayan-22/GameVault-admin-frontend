"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DonutSegment } from "@/src/constants/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
  subtitle?: string;
  segments: DonutSegment[];
  centerLabel?: string;
};

export default function DonutCard({
  title,
  subtitle,
  segments,
  centerLabel = "Total",
}: Props) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  const data: ChartData<"doughnut"> = {
    labels: segments.map((s) => s.label),
    datasets: [
      {
        data: segments.map((s) => s.value),
        backgroundColor: segments.map((s) => s.color),
        borderColor: "#1F1F1F",
        borderWidth: 2,
        hoverOffset: 8,
        spacing: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "40%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1E1E1E",
        titleColor: "#ECECEC",
        bodyColor: "#B8C1CC",
        borderColor: "#2A2A2A",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          label: (ctx) => {
            const v = Number(ctx.parsed);
            const pct = total === 0 ? 0 : Math.round((v / total) * 100);
            return ` ${ctx.label}: ${v} (${pct}%)`;
          },
        },
      },
    },
    animation: { duration: 800, easing: "easeOutCubic" },
  };

  return (
    <div className="hover-lift card-glow flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <header className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative aspect-square h-full max-h-60 w-auto max-w-60 xl:max-h-72 xl:max-w-72">
          <Doughnut data={data} options={options} />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-text-primary">
              {total}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
              {centerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
