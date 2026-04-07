import { WorkbooksResponse } from "@/app/(protected)/workbooks/types/wb-table";
import { getWb } from "@/services/wb-apis";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export const useWorkbooks = (
  id: string,
  page: number = 1,
  pageSize: number = 20,
  search?: string
) => {
  return useQuery<WorkbooksResponse>({
    queryKey: ["workbooks", id, search, page, pageSize],
    queryFn: () => getWb({ id, search, page, pageSize }),
    enabled: !!id,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,

    select: (data: any) => {
      if (!data) return data;

      return {
        workbooks: (data.workbooks || []).map((item: any) => ({
          _id: item._id,
          id: item._id,
          name: item.name,
          owners: item.user_email ? [item.user_email] : [],
          
          updated_at: item.updated_at
            ? formatDate(item.updated_at)
            : "—",
        })),

        total: data.pagination?.total_items ?? 0,
        page: data.pagination?.current_page ?? 1,
        pageSize: data.pagination?.page_size ?? 20,
        totalPages: data.pagination?.total_pages ?? 1,
      };
    },
  });
};