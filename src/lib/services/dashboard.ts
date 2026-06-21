import authAxios from "./authAxios";
import { API_URLS } from "./AllAPIUrls";
import { dashboardSchema, type Dashboard } from "./schemas";

export async function getDashboard(): Promise<Dashboard> {
  const res = await authAxios.get(API_URLS.dashboard.root);
  return dashboardSchema.parse(res.data.data);
}
