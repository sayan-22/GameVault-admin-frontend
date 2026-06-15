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

ChartJS.register(ArcElement, Tooltip, Legend);

export type DonutSegment = { label: string; value: number; color: string };

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
      tooltip: { enabled: false },
    },
    animation: { duration: 800, easing: "easeOutCubic" },
  };

  return (
    <div className="hover-lift card-glow flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <header className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            {segments.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-text-secondary">{s.label}</span>
                <span className="font-semibold text-text-primary">
                  {total ? Math.round((s.value / total) * 100) : 0}%
                </span>
              </span>
            ))}
          </div>
        </div>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative aspect-square h-full max-h-44 w-auto max-w-44 xl:max-h-56 xl:max-w-56">
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
