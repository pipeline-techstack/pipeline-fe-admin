import { getToken } from "./auth";
import { OrganizationFormData } from "./types/org-types";

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
