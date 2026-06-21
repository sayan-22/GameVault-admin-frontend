// Order types come from the API layer. Dashboard metrics are computed by the
// backend's /admin/dashboard endpoint, so no client-side derivation lives here
// anymore — just the shared status→tone mapping the UI uses for badges.
import type { OrderStatus } from "@/src/lib/services/schemas";

export type { Order, OrderItem, OrderStatus } from "@/src/lib/services/schemas";

export const STATUS_TONE: Record<OrderStatus, "success" | "accent" | "danger"> = {
  paid: "success",
  pending: "accent",
  failed: "danger",
};
