import { AssignCampaignPayload, Campaign } from "@/hooks/use-heyreach";
import { getToken } from "@/lib/auth";

export const fetchCampaigns = async (search: string): Promise<Campaign[]> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  let url = "";
  if (search) {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns?keyword=${search}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  console.log("data", data);
  return (
    data?.campaigns?.map((c: any) => ({
      id: c.id,
      name: c.name,
    })) ?? []
  );
};

export const assignCampaignsApi = async (payload: AssignCampaignPayload) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const normalizedPayload = {
    ...payload,
    campaign_ids: payload.campaign_ids.map(String),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integration`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(normalizedPayload),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  return data;
};

export const getAllCampaigns = async () => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integrations`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  return data;
};

export const getUserCampaigns = async ({ email }: { email: string }) => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integration/get`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  return data;
};
