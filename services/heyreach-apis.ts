import { AssignCampaignPayload, Campaign } from "@/hooks/use-heyreach";
import { fetchWrapper } from "@/lib/api";

export const fetchCampaigns = async (search: string): Promise<Campaign[]> => {
  let url = "";
  if (search) {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns?keyword=${search}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns`;
  }
  const data = await fetchWrapper(url, { method: "GET" });

  console.log("data", data);
  return (
    data?.campaigns?.map((c: any) => ({
      id: c.id,
      name: c.name,
    })) ?? []
  );
};

export const assignCampaignsApi = async (payload: AssignCampaignPayload) => {
  const normalizedPayload = {
    ...payload,
    campaign_ids: payload.campaign_ids.map(String),
  };

  return fetchWrapper(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integration`,
    {
      method: "POST",
      body: JSON.stringify(normalizedPayload),
    }
  );
};

export const getAllCampaigns = async () => {
  return fetchWrapper(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integrations`,
    {
      method: "GET",
    }
  );
};

export const getUserCampaigns = async ({ email }: { email: string }) => {
  return fetchWrapper(
    `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/integration/get`,
    {
      method: "POST",
      body: JSON.stringify({ email: email }),
    }
  );
};
