import { Badge } from "@/src/components/ui";
import { type Order, STATUS_TONE } from "@/src/constants";

const fmt = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(n);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function OrderCard({ order }: { order: Order }) {
  return (
    <article className="hover-lift card-glow flex h-full flex-col gap-4 rounded-xl border border-border-card bg-bg-card p-5">
      <header className="flex items-start justify-between gap-3">
        <span className="text-sm text-text-secondary">{fmtDate(order.createdAt)}</span>
        <Badge tone={STATUS_TONE[order.status]}>{order.status}</Badge>
      </header>

      <ul className="flex flex-1 flex-col divide-y divide-border-soft rounded-lg border border-border-soft bg-bg-elevated/40">
        {order.items.map((item) => (
          <li key={item.gameId} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="truncate text-sm text-text-primary">{item.title}</span>
            <span className="shrink-0 text-sm text-text-secondary">
              {fmt(item.price, order.currency)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border-soft pt-3">
        <span className="text-[10px] uppercase tracking-widest text-text-muted">Total</span>
        <span className="font-display text-lg font-bold text-text-primary">
          {fmt(order.amount, order.currency)}
        </span>
      </div>
    </article>
  );
}
