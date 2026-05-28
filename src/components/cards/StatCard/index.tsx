import type { Stat } from "@/src/constants/dashboard";

export default function StatCard({ stat }: { stat: Stat }) {
  const trendColor = stat.positive ? "text-success-light" : "text-danger";
  const lineColor = stat.positive ? "#36E28A" : "#FF5A5F";

  return (
    <div className="hover-lift card-glow group relative overflow-hidden rounded-xl border border-border-card bg-bg-card p-6">
      <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
          {stat.label}
        </p>
        <span
          className={`rounded-full border border-border-soft bg-bg-elevated px-2.5 py-1 text-xs font-semibold ${trendColor}`}
        >
          {stat.delta}
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="font-display text-3xl font-bold tracking-tight text-text-primary">
          {stat.value}
        </p>
        <Sparkline data={stat.sparkline} color={lineColor} />
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;

  const w = 100;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-9 w-24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`spark-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${color.replace("#", "")})`} />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
