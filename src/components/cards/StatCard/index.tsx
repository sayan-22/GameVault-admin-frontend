export type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
};

// A plain KPI tile. Values are derived from real order data, so there are no
// fabricated trend deltas or sparklines here.
export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="hover-lift card-glow group relative overflow-hidden rounded-xl border border-border-card bg-bg-card p-6">
      <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>

      <p className="mt-5 font-display text-3xl font-bold tracking-tight text-text-primary">
        {value}
      </p>

      {sublabel && (
        <p className="mt-1.5 text-xs text-text-muted">{sublabel}</p>
      )}
    </div>
  );
}
