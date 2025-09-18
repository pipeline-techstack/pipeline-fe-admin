import { DashboardFilters } from "@/app/(protected)/dashboard/components/filters-section";
import { getToken } from "@/lib/auth";


export const getDashboardMetrics = async (
  filters: DashboardFilters
): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/stats`;

  const res = await fetch(url, {
    method: "POST", // ✅ switched from GET → POST
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // client_ids: filters.client,
      campaign_ids: filters.campaign,
      start_date: filters.dateRange.start,
      end_date: filters.dateRange.end,
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard metrics");

  return res.json();
};
