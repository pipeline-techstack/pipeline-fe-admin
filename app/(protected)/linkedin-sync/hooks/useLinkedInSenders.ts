"use client";

import { useQuery } from "@tanstack/react-query";
import { LinkedInSenderProfile } from "../types/sender";
import { getLinkedinSenders } from "@/services/linkedin-senders";

const normalizeSender = (item: any): LinkedInSenderProfile => {
  const profile = item.profile_info || {};
  // @ts-expect-error Ignore type error
  return {
    id: item.sender_id || "",
    name:
      profile.fullName ||
      `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
      "Unknown",
    email: profile.email || "N/A",
    headline: profile.headline || undefined,
    avatar: profile.profilePicHighQuality || profile.profilePic || undefined,
    profile_url: profile.linkedinUrl || item.linkedin_profile_url || "",
    status: "active",
    messages_sent: item.messages_sent || 0,
    engagement_rate: item.engagement_rate || undefined,
    last_active: item.updated_at || null,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at || new Date().toISOString(),
  };
};

export const useLinkedInSenders = (campaignId?: string) => {
  const query = useQuery({
    queryKey: ["linkedin-senders", campaignId],
    queryFn: async () => {
      const res = await getLinkedinSenders(campaignId);
      const senders = Array.isArray(res?.linked_senders)
        ? res.linked_senders.map(normalizeSender)
        : [];
      return {
        senders,
        total: senders.length,
      };
    },
    // enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    senders: query.data?.senders ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refreshSenders: query.refetch,
  };
};
