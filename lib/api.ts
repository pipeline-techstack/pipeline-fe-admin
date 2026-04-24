import { getToken } from "./auth";
import { SelectOption } from "./types/misc";
import { OrganizationFormData } from "./types/org-types";
import toast from "react-hot-toast";

export const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const token = getToken();

  const skipAuth = (options as any).skipAuth === true;
  if (!token && !skipAuth) {
    const error: any = new Error("Authentication required");
    error.status = 401;
    error.response = { status: 401 }; 
    throw error;
  }

  // Handle headers nicely while respecting anything passed in
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);

  // strip our custom flag before passing to fetch
  const { skipAuth: _skipAuth, ...fetchOptions } = options as any;

  const res = await fetch(url, { ...fetchOptions, headers });

  if (!res.ok) {
    const error: any = new Error("API Error");
    error.status = res.status;
    error.response = { status: res.status }; 
    error.body = await res.json().catch(() => null);
    throw error;
  }

  if (res.status === 204) return null;
  return res.json().catch(() => null);
};

interface UsageData {
  email: string;
  count: number;
}

// Manage subscription usage API call
export async function manageSubscriptionUsage(
  usageData: UsageData
): Promise<any> {
  // Authentication is now checked implicitly if token is not available depending on endpoint 
  // but to be safe we can throw if getToken() is strictly required:
  if (!getToken()) throw new Error("Authentication required");

  return fetchWrapper(`${process.env.NEXT_PUBLIC_API_URL}/payment/users/usage`, {
    method: "POST",
    body: JSON.stringify(usageData),
  });
}

export const getCampaignsApi = async (): Promise<SelectOption[]> => {
  try {
    const resData = await fetchWrapper(
      `${process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV}/heyreach/campaigns`,
      {
        method: "GET",
        credentials: "include",
        // fetchWrapper auto-appends auth token and content types
      }
    );

    return Object.entries(resData?.campaigns || {}).map(([id, name]) => ({
      value: id,
      label: name as string,
    }));
  } catch (error) {
    toast.error("Failed to get campaigns");
    console.error("Error fetching campaigns", error);
    return [];
  }
};