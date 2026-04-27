import { Sender, SenderDashboardPayload } from "@/lib/types/senders";
import { getSenderDashboard, getSenderData } from "@/services/sender-apis";
import { useQuery } from "@tanstack/react-query";

export const useSenders = (
  payload: SenderDashboardPayload,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ["sender-dashboard", payload],
    queryFn: async () => {
      const res = await getSenderDashboard(payload);

      // 🔹 Normalize senders
      const getDaysBetween = (start?: string, end?: string) => {
        if (!start || !end) return 30; // fallback
        const diff =
          (new Date(end).getTime() - new Date(start).getTime()) /
          (1000 * 60 * 60 * 24);
        return diff || 30;
      };

      const getStatus = (monthlyAvg: number) => {
        if (monthlyAvg >= 23) return "active";
        if (monthlyAvg < 18) return "inactive";
        return "less_active";
      };

      const days = getDaysBetween(payload.start_date, payload.end_date);

      const normalizedSenders: Sender[] = (res.senders || [])
        .filter((s: any) => typeof s?.name === "string" && s.name.trim() !== "")
        .map((s: any) => {
          const totalSent = s.connections_sent || 0;

          // 🔹 convert to monthly average
          const dailyAvg = totalSent / days;
          const monthlyAvg = dailyAvg * 30;

          const status = getStatus(monthlyAvg);

          return {
            _id: s.sender_id,
            name: s.name,
            avatar: s.profile_image,
            status,
            statusCount: Math.round(monthlyAvg), // optional: meaningful now
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
        });

      // 🔹 Normalize summary (for Metrics component)
      const summary = {
        sent: res.summary?.connections_sent ?? 0,
        accepted: res.summary?.connections_accepted ?? 0,
        reply: res.summary?.replies_received ?? 0,
        interested: res.summary?.interested ?? 0,
      };

      return {
        senders: normalizedSenders,
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
    // enabled: options?.enabled,
  });
};

export const useSender = (
  id: string,
  payload: { start_date?: string; end_date?: string } = {},
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

      // 🔹 Derived metrics
      const acceptedRate = summary.sent
        ? (summary.accepted / summary.sent) * 100
        : 0;

      const replyRate = summary.sent ? (summary.reply / summary.sent) * 100 : 0;

      // 🔹 Campaigns → chart format
      const campaignData = (res.campaigns || []).map((c: any) => ({
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
        campaigns: campaignData,
        availableCampaigns: res.available_campaigns || [],
      };
    },
    enabled: !!id,
  });
};
