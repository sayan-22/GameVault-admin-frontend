import Link from "next/link";
import type { ReactNode } from "react";

export type BarListRow = {
  id: string;
  label: string;
  sublabel?: string;
  value: number;
  valueLabel?: string;
  href?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  rows: BarListRow[];
  rightAction?: ReactNode;
  showRank?: boolean;
};

export default function BarListCard({
  title,
  subtitle,
  rows,
  rightAction,
  showRank = true,
}: Props) {
  const max = rows.length === 0 ? 1 : Math.max(...rows.map((r) => r.value));

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
        {rightAction}
      </header>

      <ul className="flex flex-col gap-5">
        {rows.map((row, i) => (
          <Row key={row.id} row={row} max={max} rank={showRank ? i + 1 : undefined} />
        ))}
      </ul>
    </div>
  );
}

function Row({
  row,
  max,
  rank,
}: {
  row: BarListRow;
  max: number;
  rank?: number;
}) {
  const pct = Math.max(2, Math.round((row.value / max) * 100));

  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="flex min-w-0 flex-1 items-baseline gap-2.5">
          {rank !== undefined && (
            <span className="shrink-0 font-mono text-xs font-bold text-text-muted">
              {String(rank).padStart(2, "0")}
            </span>
          )}
          <span className="truncate font-display text-sm font-semibold text-text-primary">
            {row.label}
          </span>
          {row.sublabel && (
            <span className="hidden truncate text-xs text-text-muted sm:inline">
              · {row.sublabel}
            </span>
          )}
        </span>
        <span className="shrink-0 font-display text-sm font-bold text-accent">
          {row.valueLabel ?? row.value}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <div
          className="h-full rounded-full bg-linear-to-r from-accent-soft to-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );

  if (row.href) {
    return (
      <li>
        <Link
          href={row.href}
          className="block rounded-md transition-colors hover:bg-bg-elevated/40 -mx-2 px-2 py-1"
        >
          {content}
        </Link>
      </li>
    );
  }

  return <li>{content}</li>;
}
