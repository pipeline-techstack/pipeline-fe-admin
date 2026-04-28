import { getToken } from "@/lib/auth";
import { toast } from "sonner";
//Delete this funtion
export async function getLinkedinSenders(campaignId?: string): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/linkedin-senders/admin/linkedin_senders`
  );
  if (campaignId) url.searchParams.append("campaign_id", campaignId);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch senders");
  }

  return response.json();
}

export async function getHeyreachSenders(): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SENDER_MANAGEMENT_URL}/linkedin-senders/admin/heyreach/linkedin_senders`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch heyreach senders");
  }

  return response.json();
}

