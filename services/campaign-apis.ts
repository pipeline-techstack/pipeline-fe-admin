import { getToken } from "@/lib/auth";
import { CampaignApiResponse } from "../app/(protected)/linkedin-sync/types/campaign";
import { fetchWrapper } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL;

export const getCampaignByUserId = async (
  userId: string,
): Promise<CampaignApiResponse> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = new URL(
    `${BASE_URL}/campaign-engagement/admin/campaigns-engagements?query_user_id=${userId}`,
  );
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch campaign tasks: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
};

export const shareCampaign = async (
  email: string,
  campaignId: string,
): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  if (!campaignId) {
    throw new Error("Campaign ID is required");
  }

  const url = new URL(`${BASE_URL}/campaign-engagement/admin/share`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      campaign_engagement_id: campaignId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData?.detail || "Something went wrong");
  }

  return res.json();
};

//DELETE
export const getAdminTasks = async (
  status?: string,
): Promise<CampaignApiResponse> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const url = new URL(`${BASE_URL}/campaign-engagement/admin/tasks`);
  if (status) {
    url.searchParams.append("status", status);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch campaign tasks: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
};

export const updateCampaignTask = async (
  taskId: string,
  heyreachCampaignId: string,
): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  if (!taskId || !heyreachCampaignId) {
    throw new Error("Task ID and HeyReach Campaign ID are required");
  }

  const url = new URL(
    `${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`,
  );
  url.searchParams.append("heyreach_campaign_id", heyreachCampaignId);

  console.log("🔍 API Request:", {
    url: url.toString(),
    taskId,
    heyreachCampaignId,
    method: "PUT",
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
      console.error("❌ API Error Response:", errorData);

      if (errorData.detail) {
        if (typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e: any) => e.msg).join(", ");
        }
      }
    } catch (e) {
      try {
        const errorText = await res.text();
        console.error("❌ API Error Text:", errorText);
        if (errorText) errorMessage = errorText;
      } catch (textError) {
        console.error("❌ Could not parse error response");
      }
    }

    throw new Error(errorMessage);
  }

  const result = await res.json();
  console.log("✅ API Success Response:", result);
  return result;
};

export const markCampaignAsUpdated = async (
  taskId: string,
): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  if (!taskId) {
    throw new Error("Task ID is required");
  }

  const url = `${BASE_URL}/campaign-engagement/admin/update-task/${taskId}`;

  console.log("🔍 Mark as Updated Request:", {
    url,
    taskId,
    method: "PUT",
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
      console.error("❌ API Error Response:", errorData);

      if (errorData.detail) {
        if (typeof errorData.detail === "string") {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e: any) => e.msg).join(", ");
        }
      }
    } catch (e) {
      try {
        const errorText = await res.text();
        console.error("❌ API Error Text:", errorText);
        if (errorText) errorMessage = errorText;
      } catch (textError) {
        console.error("❌ Could not parse error response");
      }
    }

    throw new Error(errorMessage);
  }

  const result = await res.json();
  console.log("✅ Mark as Updated Success:", result);
  return result;
};

// Campaign Owner name update API

export const updateCampaignOwner = async (id: string, ownerName: string) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  if (!id || !ownerName) {
    throw new Error("Campaign ID and Owner Name are required");
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/campaign-engagement/admin/update-campaign/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner_name: ownerName }),
      },
    );
    return await res.json();
  } catch (error) {
    console.error("Error updating campaign owner:", error);
    throw new Error("Failed to update campaign owner");
  }
};

// get campaign metrics by user id
export const getCampaignMetricsByUserId = async (
  userId: string,
): Promise<any> => {
    const url = `${BASE_URL}/admin/campaign-performance?user_id=${userId}`;
    return fetchWrapper(url, { method: "GET" });
};
