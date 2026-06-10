import { z } from "zod";
import { api } from "./client";
import { orderSchema, type Order, type OrderStatus } from "./schemas";

export async function listOrders(
  status?: OrderStatus | "all"
): Promise<Order[]> {
  const params = status && status !== "all" ? { status } : undefined;
  const res = await api.get("/admin/orders", { params });
  return z.array(orderSchema).parse(res.data.data);
}
