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

  return res.json();
};

/**
 * Update a campaign task by linking it with a HeyReach campaign
 * @param taskId - The task ID to update
 * @param heyreachCampaignId - The HeyReach campaign ID to link
 * @returns Promise with response data
 */
export const updateCampaignTask = async (
  taskId: string,
  heyreachCampaignId: string
): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = new URL(`${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`);
  url.searchParams.append('heyreach_campaign_id', heyreachCampaignId);

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Failed to update campaign: ${res.status}`);
  }

  return res.json();
};