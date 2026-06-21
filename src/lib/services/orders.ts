import { z } from "zod";
import authAxios from "./authAxios";
import { API_URLS } from "./AllAPIUrls";
import { orderSchema, type Order, type OrderStatus } from "./schemas";

export async function listOrders(
  status?: OrderStatus | "all"
): Promise<Order[]> {
  const params = status && status !== "all" ? { status } : undefined;
  const res = await authAxios.get(API_URLS.orders.list, { params });
  return z.array(orderSchema).parse(res.data.data);
}
