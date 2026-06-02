// Admin order model — mirrors the storefront's Order shape (the storefront's
// Order History is the source of truth). Every dashboard metric is DERIVED
// from this data: no fabricated revenue trends, refund rates, or stock.

export type OrderStatus = "pending" | "paid" | "failed";

export type OrderItem = {
  gameId: string;
  title: string;
  price: number; // charged for this item (after discount)
};

export type Order = {
  _id: string;
  items: OrderItem[];
  amount: number; // total charged for the order
  currency: string;
  status: OrderStatus;
  createdAt: string; // ISO date string
};

// Store-wide purchase history (newest first).
export const ORDERS: Order[] = [
  {
    _id: "ord_8f1c2a", status: "paid", currency: "usd",
    createdAt: "2026-05-28T14:32:00.000Z",
    items: [
      { gameId: "1", title: "Neon Drift: Hyperion", price: 35.99 },
      { gameId: "9", title: "Helix Protocol", price: 31.49 },
    ],
    amount: 67.48,
  },
  {
    _id: "ord_5b7e90", status: "paid", currency: "usd",
    createdAt: "2026-05-12T09:05:00.000Z",
    items: [{ gameId: "6", title: "Frostline: Last Watch", price: 59.49 }],
    amount: 59.49,
  },
  {
    _id: "ord_2d4a11", status: "paid", currency: "usd",
    createdAt: "2026-05-08T16:10:00.000Z",
    items: [
      { gameId: "2", title: "Ashen Crown", price: 37.49 },
      { gameId: "5", title: "Paper Engine", price: 9.99 },
      { gameId: "8", title: "Iron Sigil", price: 11.99 },
    ],
    amount: 59.47,
  },
  {
    _id: "ord_3a0d44", status: "pending", currency: "usd",
    createdAt: "2026-05-03T19:48:00.000Z",
    items: [{ gameId: "2", title: "Ashen Crown", price: 37.49 }],
    amount: 37.49,
  },
  {
    _id: "ord_19c7f2", status: "failed", currency: "usd",
    createdAt: "2026-04-21T11:20:00.000Z",
    items: [
      { gameId: "8", title: "Iron Sigil", price: 11.99 },
      { gameId: "5", title: "Paper Engine", price: 9.99 },
    ],
    amount: 21.98,
  },
];

const paid = (orders: Order[]) => orders.filter((o) => o.status === "paid");

export function totalRevenue(orders: Order[] = ORDERS): number {
  return paid(orders).reduce((sum, o) => sum + o.amount, 0);
}

export function unitsSold(orders: Order[] = ORDERS): number {
  return paid(orders).reduce((sum, o) => sum + o.items.length, 0);
}

export function paidOrderCount(orders: Order[] = ORDERS): number {
  return paid(orders).length;
}

export function avgOrderValue(orders: Order[] = ORDERS): number {
  const count = paidOrderCount(orders);
  return count === 0 ? 0 : totalRevenue(orders) / count;
}

export type StatusSegment = { label: string; value: number; color: string };

export function statusBreakdown(orders: Order[] = ORDERS): StatusSegment[] {
  const palette: Record<OrderStatus, { label: string; color: string }> = {
    paid: { label: "Paid", color: "#00C16A" },
    pending: { label: "Pending", color: "#00D9FF" },
    failed: { label: "Failed", color: "#FF5A5F" },
  };
  return (Object.keys(palette) as OrderStatus[])
    .map((s) => ({
      ...palette[s],
      value: orders.filter((o) => o.status === s).length,
    }))
    .filter((seg) => seg.value > 0);
}

export type Performer = { gameId: string; title: string; revenue: number; units: number };

// Revenue ranking derived from paid order line-items.
export function topPerformers(orders: Order[] = ORDERS, limit = 5): Performer[] {
  const map = new Map<string, Performer>();
  for (const order of paid(orders)) {
    for (const item of order.items) {
      const cur = map.get(item.gameId) ?? {
        gameId: item.gameId,
        title: item.title,
        revenue: 0,
        units: 0,
      };
      cur.revenue += item.price;
      cur.units += 1;
      map.set(item.gameId, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.revenue - a.revenue).slice(0, limit);
}

export const STATUS_TONE: Record<OrderStatus, "success" | "accent" | "danger"> = {
  paid: "success",
  pending: "accent",
  failed: "danger",
};
