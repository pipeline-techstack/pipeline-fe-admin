import { getCampbooks } from "@/services/campbook-apis";
import { useQuery } from "@tanstack/react-query";

type CampbookRow = {
  campaign: string;
  workbook: string;
};

export const useCampbook = (id: string) => {
  return useQuery({
    queryKey: ["campbooks", id],

    queryFn: async () => {
      const res = await getCampbooks(id);
      return res;
    },

    enabled: !!id,
    staleTime: 1000 * 60,

    select: (data: any) => {
      const campaigns = Array.isArray(data) ? data : (data?.campaigns ?? []);

      const rows = campaigns.map((campaign: any) => ({
        campaignId: campaign.campaign_id, // ✅ ADD
        campaign: campaign.campaign_name,

        workbooks: (campaign.workbooks || []).map((wb: any) => ({
          id: wb.workbook_id, // ✅ ADD
          name: wb.workbook_name?.trim(),
        })),
      }));

      return { campbooks: rows };
    },
  });
};
