import { formatDate } from "@/lib/utils";
import { getCampaignByUserId } from "@/services/campaign-apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Helper to normalize status text
const formatStatus = (status: string) => {
  if (!status) return "Unknown";

  const normalized = status.toLowerCase().replace(/_/g, " ");

  if (normalized === "active") return "Active";
  if (normalized === "finished") return "Finished";

  // Capitalize each word
  return normalized
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const useOutbound = (id: string, page?: number, size?: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaign", id],

    queryFn: async () => {
      const res = await getCampaignByUserId(id as string);
      return res;
    },

    enabled: !!id,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data: any) => {
      if (!data?.campaigns) return [];

      return data.campaigns.map((campaign: any) => {
        let finalStatus = campaign.status;

        if (campaign.status === "active") {
          finalStatus = campaign.sync_metadata?.heyreach_status || "active";
        }

        return {
          id: campaign._id,
          name: campaign.campaign_name,
          heyreach_id: campaign.heyreach_campaign_id ?? "—",
          senders_counts: campaign.heyreach_linkedin_senders?.length ?? 0,
          updatedAt: campaign.updated_at
            ? formatDate(campaign.updated_at)
            : "—",
          status: formatStatus(finalStatus),
          ownerName: campaign.owner_name || "—",
        };
      });
    },
  });

  return { data, isLoading, error };
};
