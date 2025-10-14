import { getToken } from "@/lib/auth";
import { CampaignApiResponse } from "../types/campaign";

const BASE_URL = process.env.NEXT_PUBLIC_PERMISSIONS_URL;

/**
 * Fetch all admin tasks (campaigns)
 * @param status - Optional filter by status (e.g., 'pending', 'completed')
 * @returns Promise with campaign tasks data
 */
export const getAdminTasks = async (status?: string): Promise<CampaignApiResponse> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  // Build URL with optional status query parameter
  const url = new URL(`${BASE_URL}/campaign-engagement/admin/tasks`);
  if (status) {
    url.searchParams.append('status', status);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch campaign tasks: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

/**
 * Update a campaign task
 * @param taskId - The task ID to update
 * @param heyreachCampaignId - The Heyreach campaign ID to link
 */
export const updateCampaignTask = async (
  taskId: string,
  heyreachCampaignId: string
): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = `${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`;
  
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      heyreach_campaign_id: heyreachCampaignId,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update campaign: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};
