// hooks/useCampaigns.ts
"use client";
import { getToken } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export interface Campaign {
  id: string;
  name: string;
}

const fetchCampaigns = async (search: string): Promise<Campaign[]> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  let url = "";
  if (search) {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns?keyword=${search}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/heyreach/campaigns`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  console.log("data", data);
  return (
    data?.campaigns?.map((c: any) => ({
      id: c.id,
      name: c.name,
    })) ?? []
  );
};

export const useCampaigns = (search: string = "") => {
  return useQuery<Campaign[]>({
    queryKey: ["campaigns", search],
    queryFn: () => fetchCampaigns(search),
    staleTime: 5 * 60 * 1000,
  });
};
