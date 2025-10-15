import { getToken } from "@/lib/auth";
import { toast } from "sonner";

export async function getLinkedinSenders(): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/linkedin-senders/admin/linkedin_senders`,
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
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/linkedin-senders/admin/heyreach/linkedin_senders`,
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

export async function addLinkedinSender(
  senderId: string,
  profileUrl: string
): Promise<any> {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/linkedin-senders/admin/link`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender_id: senderId,
        linkedin_profile_url: profileUrl,
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    toast.error(errorData.detail || "Failed to add sender");
    throw new Error(errorData.detail || "Failed to add sender");
  }
  return await response.json();
}
