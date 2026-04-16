import { getCampaignMetricsByUserId } from "@/services/campaign-apis";
import { useQuery } from "@tanstack/react-query";
import { Campaign } from "./use-heyreach";


const CAMPAIGN_COLORS = [
  "#2563EB", "#7C3AED", "#9333EA", "#A78BFA", "#10B981",
  "#F59E0B", "#EF4444", "#06B6D4", "#84CC16", "#F97316",
  "#38BDF8", "#34D399", "#FBBF24", "#EC4899", "#14B8A6",
  "#8B5CF6", "#FB923C", "#60A5FA", "#F43F5E", "#22C55E",
];

const formatCampaigns = (data: any): Campaign[] => {
  if (!data?.campaigns) return [];

  console.log("Formatting campaign:", data)
  return data.campaigns.map((c: any, index: number) => ({
    id: c.heyreach_campaign_id,
    name: c.campaign_name,
    color: CAMPAIGN_COLORS[index % CAMPAIGN_COLORS.length],
    metrics: {
      connectionSent: c.performance?.connections_total ?? 0,
      connectionAccepted: c.performance?.accept ?? 0,
      replies: c.performance?.replies ?? c.performance?.reply ?? 0,
      interested: c.performance?.positive ?? 0,
    },
  }));
};

export const useCamapignMetricsByUser = (userId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["campaignMetrics", userId],
    queryFn: () => getCampaignMetricsByUserId(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: formatCampaigns,
  });

  return {
    metrics: data ?? [],
    MetricsError: error,
    LoadingMetrics: isLoading,
  };
};