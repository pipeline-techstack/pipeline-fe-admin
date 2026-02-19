"use client";

import { PostUserResourcesPyaload } from "@/lib/types/resource-types";
import { filterPermissions } from "@/lib/utils";
import { getUserResources, postUserResources } from "@/services/resource-apis";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetResource = () => {
  const query = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await getUserResources();

      if (!response?.status) return [];

      return filterPermissions(response.data);
    },
    staleTime: 1000 * 5
  });

  return {
    permissions: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};

export const useSetResource = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean | null>(null);
  const [data, setData] = useState<any>(null);

  const setResource = async (payload: PostUserResourcesPyaload) => {
    try {
      setLoading(true);
      setStatus(null);

      const response = await postUserResources(payload);

      if (response?.status) {
        setStatus(true);
        setData(response.data);
      } else {
        setStatus(false);
        setData(null);
      }
    } catch (error) {
      console.error("useSetResource error:", error);
      setStatus(false);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    setResource,
    loading,
    status,
    data,
  };
};