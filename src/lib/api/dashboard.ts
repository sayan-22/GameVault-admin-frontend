import { api } from "./client";
import { dashboardSchema, type Dashboard } from "./schemas";

export async function getDashboard(): Promise<Dashboard> {
  const res = await api.get("/admin/dashboard");
  return dashboardSchema.parse(res.data.data);
}
