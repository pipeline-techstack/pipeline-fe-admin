import { getCambooks } from "@/services/cambook-apis";
import { useQuery } from "@tanstack/react-query";

type CambookRow = {
  campaign: string;
  workbook: string;
};

export const useCambook = (id: string) => {
  return useQuery({
    queryKey: ["cambooks", id],

    queryFn: async () => {
      const res = await getCambooks(id);
      return res;
    },

    enabled: !!id,
    staleTime: 1000 * 60,

    select: (data: any) => {
      const campaigns = Array.isArray(data) ? data : (data?.campaigns ?? []);

      const rows = campaigns.map((campaign: any) => ({
        campaign: campaign?.campaign_name || "—",
        workbooks: (campaign?.workbooks || []).map((wb: any) =>
          wb?.workbook_name?.trim(),
        ),
      }));

      console.log("✅ grouped cambook", rows);

      return { cambooks: rows };
    },
  });
};
