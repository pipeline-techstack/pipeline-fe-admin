"use client";
import { getWorkbooks } from "@/services/wb-table-apis";
import { useQuery } from "@tanstack/react-query";


export const useWorkbooks = (
  search: string = "",
  page: number = 1,
  pageSize: number = 30
) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workbooks", search, page, pageSize],
    queryFn: () => getWorkbooks({ search, page, pageSize }),
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};