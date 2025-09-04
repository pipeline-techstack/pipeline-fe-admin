"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaigns, getAllCampaigns } from "@/services/heyreach-apis";

export interface Campaign {
  id: string;
  name: string;
}

export interface UserPermission {
  email: string;
  campaigns: Campaign[];
}

export interface AssignCampaignPayload {
  email: string;
  campaign_ids: string[];
}

// 🔹 Normalize campaigns into consistent format
const normalizeCampaigns = (heyreach: any): Campaign[] => {
  if (!heyreach) return [];

  if (Array.isArray(heyreach.campaigns)) {
    return heyreach.campaigns.map((id: number | string) => ({
      id: String(id),
      name: `Campaign ${id}`, // fallback
    }));
  }

  if (typeof heyreach.campaigns === "object") {
    return Object.entries(heyreach.campaigns).map(([id, name]) => ({
      id,
      name: String(name),
    }));
  }

  return [];
};

export const useHeyreach = ({
  search = "",
  enableCampaigns = false,
  enablePermissions = false,
}: {
  search?: string;
  enableCampaigns?: boolean;
  enablePermissions?: boolean;
} = {}) => {
  const campaignsQuery = useQuery<Campaign[]>({
    queryKey: ["campaigns", search],
    queryFn: () => fetchCampaigns(search),
    staleTime: 5 * 60 * 1000,
    enabled: enableCampaigns, // run only if explicitly enabled
  });

  const userPermissionsQuery = useQuery<UserPermission[]>({
    queryKey: ["user-permissions"],
    queryFn: async () => {
      const res = await getAllCampaigns();
      const integrations = res?.integrations || [];

      return integrations.map((item: any) => ({
        email: item.email || "unknown",
        campaigns: normalizeCampaigns(item.heyreach),
      }));
    },
    staleTime: 5 * 60 * 1000,
    enabled: enablePermissions, // run only if explicitly enabled
  });

  return { campaignsQuery, userPermissionsQuery };
};
