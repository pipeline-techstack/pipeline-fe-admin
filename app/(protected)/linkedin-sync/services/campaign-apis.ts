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

  if (!taskId || !heyreachCampaignId) {
    throw new Error("Task ID and HeyReach Campaign ID are required");
  }

  const url = new URL(`${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`);
  url.searchParams.append('heyreach_campaign_id', heyreachCampaignId);

  console.log('🔍 API Request:', {
    url: url.toString(),
    taskId,
    heyreachCampaignId,
    method: 'PUT'
  });

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    let errorMessage = `Failed to update campaign: ${res.status} ${res.statusText}`;
    
    try {
      const errorData = await res.json();
      console.error('❌ API Error Response:', errorData);
      
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e: any) => e.msg).join(', ');
        }
      }
    } catch (e) {
      try {
        const errorText = await res.text();
        console.error('❌ API Error Text:', errorText);
        if (errorText) errorMessage = errorText;
      } catch (textError) {
        console.error('❌ Could not parse error response');
      }
    }

    throw new Error(errorMessage);
  }

  const result = await res.json();
  console.log('✅ API Success Response:', result);
  return result;
};

/**
 * Mark a campaign update task as completed
 * @param taskId - The task ID to mark as updated
 * @returns Promise with response data
 */
export const markCampaignAsUpdated = async (taskId: string): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  if (!taskId) {
    throw new Error("Task ID is required");
  }

  const url = `${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`;
  
  console.log('🔍 Mark as Updated Request:', {
    url,
    taskId,
    method: 'PUT'
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    let errorMessage = `Failed to mark campaign as updated: ${res.status} ${res.statusText}`;
    
    try {
      const errorData = await res.json();
      console.error('❌ API Error Response:', errorData);
      
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e: any) => e.msg).join(', ');
        }
      }
    } catch (e) {
      try {
        const errorText = await res.text();
        console.error('❌ API Error Text:', errorText);
        if (errorText) errorMessage = errorText;
      } catch (textError) {
        console.error('❌ Could not parse error response');
      }
    }

    throw new Error(errorMessage);
  }

  const result = await res.json();
  console.log('✅ Mark as Updated Success:', result);
  return result;
};