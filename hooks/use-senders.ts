"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Sender,
  SenderDashboardPayload,
} from "@/lib/types/senders";
import {
  getSenderDashboard,
  getSenderData,
} from "@/services/sender-apis";
import { refetchLinkedinSenderApi } from "@/services/linkedin-senders";

/* ---------------------------------------------------- */
/* 🔹 Helpers */
/* ---------------------------------------------------- */

const getDaysBetween = (start?: string, end?: string) => {
  if (!start || !end) return 30;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff =
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.max(Math.ceil(diff), 1);
};

const getStatus = (avg: number) => {
  if (avg >= 23) return "Active";
  if (avg < 18) return "Inactive";
  return "Less Active";
};

/* ---------------------------------------------------- */
/* 🔹 Normalize Sender */
/* ---------------------------------------------------- */

export const normalizeSender = (
  s: any,
  payload?: SenderDashboardPayload
): Sender => {
  const days = getDaysBetween(
    payload?.start_date,
    payload?.end_date
  );

  const totalSent = s.connections_sent || 0;
  const avgPerDay = totalSent / days;

  return {
    _id: s.sender_id,
    name: s.name,
    avatar: s.profile_image,
    status: getStatus(avgPerDay),
    statusCount: Math.round(avgPerDay),
    company: s.company,
    campaigns: s.campaigns,
    campaignList: s.campaign_names || [],
    jobTitle: s.job_title,
    location: s.address,
    headline: s.profile_headline,
    linkedin: s.linkedin_url,
    performance: {
      sent: totalSent,
      accepted: s.connections_accepted,
      reply: s.replies_received,
      interested: s.interested,
    },
  };
};

/* ---------------------------------------------------- */
/* 🔹 Hook: Get Senders */
/* ---------------------------------------------------- */

export const useSenders = (
  payload: SenderDashboardPayload,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["sender-dashboard", payload],
    queryFn: async () => {
      const res = await getSenderDashboard(payload);

      const senders: Sender[] = (res.senders || [])
        .filter(
          (s: any) =>
            typeof s?.name === "string" && s.name.trim() !== ""
        )
        .map((s: any) => normalizeSender(s, payload));

      const summary = {
        sent: res.summary?.connections_sent ?? 0,
        accepted: res.summary?.connections_accepted ?? 0,
        reply: res.summary?.replies_received ?? 0,
        interested: res.summary?.interested ?? 0,
      };

      return {
        senders,
        summary,
        pagination: {
          page: res.page,
          pageSize: res.page_size,
          total: res.total,
          totalPages: res.total_pages,
        },
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true,
  });
};

/* ---------------------------------------------------- */
/* 🔹 Hook: Get Single Sender */
/* ---------------------------------------------------- */

export const useSender = (
  id: string,
  payload: { start_date?: string; end_date?: string } = {}
) => {
  return useQuery({
    queryKey: ["sender", id, payload.start_date, payload.end_date],
    queryFn: async () => {
      const res = await getSenderData(id, payload);

      const sender = res.sender;

      const summary = {
        sent: res.summary?.connections_sent ?? 0,
        accepted: res.summary?.connections_accepted ?? 0,
        reply: res.summary?.replies_received ?? 0,
        interested: res.summary?.interested ?? 0,
      };

      const acceptedRate = summary.sent
        ? (summary.accepted / summary.sent) * 100
        : 0;

      const replyRate = summary.sent
        ? (summary.reply / summary.sent) * 100
        : 0;

      const campaigns = (res.campaigns || []).map((c: any) => ({
        campaign_id: c.campaign_id,
        name: c.campaign_name,
        connectionsSent: c.connections_sent ?? 0,
        accepted: c.connections_accepted ?? 0,
        interested: c.interested ?? 0,
        replyRate: c.connections_sent
          ? ((c.replies_received ?? 0) / c.connections_sent) * 100
          : 0,
      }));

      return {
        sender: {
          id: sender.sender_id,
          name: sender.name,
          avatar: sender.profile_image,
          company: sender.company,
          linkedin: sender.linkedin_url,
        },
        summary,
        metrics: {
          sent: summary.sent,
          acceptedRate: acceptedRate.toFixed(1),
          replyRate: replyRate.toFixed(1),
          interested: summary.interested,
        },
        campaigns,
        availableCampaigns: res.available_campaigns || [],
      };
    },
    enabled: !!id,
  });
};

/* ---------------------------------------------------- */
/* 🔹 Mutation-like Helper: Refetch Sender */
/* ---------------------------------------------------- */

export const useRefetchLinkedinSender = () => {
  const queryClient = useQueryClient();

  const refetchLinkedinSender = async (
    senderId: string,
    payload?: SenderDashboardPayload
  ) => {
    if (!senderId) return null;

    try {
      const res = await refetchLinkedinSenderApi(senderId);

      const updatedSender = res?.sender
        ? normalizeSender(res.sender, payload)
        : null;

      if (!updatedSender) return null;

      // 🔥 Update ALL sender-dashboard caches (important)
      queryClient.setQueriesData(
        { queryKey: ["sender-dashboard"] },
        (oldData: any) => {
          if (!oldData?.senders) return oldData;

          let exists = false;

          const newSenders = oldData.senders.map((s: Sender) => {
            if (s._id === updatedSender._id) {
              exists = true;
              return updatedSender;
            }
            return s;
          });

          if (!exists) newSenders.push(updatedSender);

          return {
            ...oldData,
            senders: newSenders,
          };
        }
      );

      return updatedSender;
    } catch (err) {
      console.error("Failed to refetch LinkedIn sender:", err);
      return null;
    }
  };

  return { refetchLinkedinSender };
};