import { useId } from "react";

type Props = {
  title: string;
  subtitle?: string;
  data: number[];
  value: string;
  delta: string;
  positive?: boolean;
  xStart?: string;
  xEnd?: string;
};

export default function ChartCard({
  title,
  subtitle,
  data,
  value,
  delta,
  positive = true,
  xStart = "30d ago",
  xEnd = "Today",
}: Props) {
  const trendColor = positive ? "text-success-light" : "text-danger";

  return (
    <div className="hover-lift card-glow flex flex-col gap-5 rounded-xl border border-border-card bg-bg-card p-6">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-text-muted">{subtitle}</p>
          )}
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" />
          Live
        </span>
      </header>

      <div className="flex items-end gap-3">
        <p className="font-display text-4xl font-bold tracking-tight text-text-primary">
          {value}
        </p>
        <span
          className={`mb-1 rounded-full border border-border-soft bg-bg-elevated px-2.5 py-1 text-xs font-semibold ${trendColor}`}
        >
          {delta}
        </span>
      </div>

      <AreaChart data={data} />

      <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-text-muted">
        <span>{xStart}</span>
        <span>{xEnd}</span>
      </div>
    </div>
  );
}

function AreaChart({ data }: { data: number[] }) {
  const gradientId = useId();
  const w = 800;
  const h = 220;
  const padTop = 12;
  const padBottom = 8;
  const innerH = h - padTop - padBottom;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: padTop + innerH - ((v - min) / range) * innerH,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${w},${h - padBottom} L0,${h - padBottom} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-48 w-full sm:h-56"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((p) => (
        <line
          key={p}
          x1="0"
          x2={w}
          y1={padTop + innerH * p}
          y2={padTop + innerH * p}
          stroke="#2A2A2A"
          strokeDasharray="3 6"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path
        d={linePath}
        fill="none"
        stroke="#00D9FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last.x} cy={last.y} r="6" fill="#00D9FF" fillOpacity="0.25" />
      <circle cx={last.x} cy={last.y} r="3" fill="#00D9FF" />
    </svg>
  );
}
