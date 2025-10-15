"use client";

import { useQuery } from "@tanstack/react-query";
import { getHeyreachSenders } from "@/services/linkedin-senders";

export interface HeyreachSender {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const normalizeHeyreachSender = (item: any): HeyreachSender => ({
  id: item.id,
  name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
  email: item.emailAddress || "N/A",
  isActive: !!item.isActive,
});

export const useHeyreachSenders = (enabled: boolean) => {
  return useQuery({
    queryKey: ["heyreach-senders"],
    queryFn: async () => {
      const res = await getHeyreachSenders();
      const senders = Array.isArray(res?.data?.heyreach_linkedin_senders)
        ? res.data.heyreach_linkedin_senders
            .map(normalizeHeyreachSender)
            .filter((sender) => sender.isActive) 
        : [];
      return senders;
    },
    enabled, // Fetch only when dialog opens
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
