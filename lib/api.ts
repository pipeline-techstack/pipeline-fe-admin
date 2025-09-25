import { getToken } from "./auth";
import { SelectOption } from "./types/misc";
import { OrganizationFormData } from "./types/org-types";
import toast from "react-hot-toast";

interface UsageData {
  email: string;
  count: number;
}

// Manage subscription usage API call
export async function manageSubscriptionUsage(
  usageData: UsageData
): Promise<any> {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/users/usage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usageData),
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update subscription usage");
  }
  return await response.json();
}

export const getCampaignsApi = async (): Promise<SelectOption[]> => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV}/heyreach/campaigns`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      }
    );
    const resData = await response.json();

    if (!response.ok) {
      toast.error("Failed to get campaigns");
      throw new Error("Failed to fetch campaigns api");
    }

    return Object.entries(resData.campaigns || {}).map(([id, name]) => ({
      value: id,
      label: name as string,
    }));
  } catch (error) {
    console.error("Error fetching campaigns", error);
    return [];
  }
};