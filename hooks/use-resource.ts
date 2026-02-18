"use client"

import { PostUserResourcesPyaload } from "@/lib/types/resource-types"
import { filterPermissions } from "@/lib/utils"
import { getUserResources, postUserResources } from "@/services/resource-apis"
import { useEffect, useState } from "react";


export const useGetResource = () => {
  const [permissions, setPermissions] = useState<PostUserResourcesPyaload[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getUserResources();

        if (response?.status) {
          const filtered = filterPermissions(response.data || []);
          setPermissions(filtered);
          setStatus(true);
        } else {
          setPermissions([]);
          setStatus(false);
        }
      } catch (error) {
        console.error("useGetResource error:", error);
        setPermissions([]);
        setStatus(false);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return {
    permissions,
    status,
    loading,
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