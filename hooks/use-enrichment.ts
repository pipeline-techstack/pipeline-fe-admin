import { formatDate } from "@/lib/utils";
import { getEnrichments } from "@/services/enrichments-apis";
import { useQuery } from "@tanstack/react-query";

type EnrichmentRow = {
  _id: string;
  name: string;
  type: string;
  created_at: string;
};

export const useEnrichments = (id: string) => {
  return useQuery({
    queryKey: ["enrichments", id],

    queryFn: async () => {
      const res = await getEnrichments(id);
    
      return res?.data ?? res ?? [];
    },

    enabled: !!id,
    staleTime: 1000 * 60,

    select: (data: any): { enrichments: EnrichmentRow[] } => {

      const list = Array.isArray(data) ? data : [];

      return {
        enrichments: list.map((item: any) => ({
          _id: item._id,
          name: item.flow_name || "Untitled",
          type: item.enrichment_type || "—",
          created_at: item.created_at
            ? formatDate(item.created_at)
            : "—",
        })),
      };
    },
  });
};