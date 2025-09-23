import { Engagement, FeedbackLead, FeedbackStatus, FeedbackFilters } from "../types/feedback";

const API_URL = `${process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV}/engagements`;

export const mapStatus = (status: string) => {
  switch (status) {
    case "follow-up":
      return "waiting_feedback";
    case "responded":
      return "verified";
    default:
      return "waiting_feedback";
  }
};

export const getFeedbackData = async (
  filters: FeedbackFilters,
  searchQuery: string,
  page: number,
  limit: number
): Promise<{ data: FeedbackLead[]; total: number }> => {
  const token = localStorage.getItem("st_access_token");
  if (!token) throw new Error("User is not authenticated");

  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));

  if (filters.status && filters.status !== "all") {
    params.append("engagement_status", mapStatus(filters.status));
  }
  if (filters.selectedCampaigns?.length) {
    filters.selectedCampaigns.forEach((c) =>
      params.append("campaign_id", c.value)
    );
  }
  if (filters.dateOfMeetingRange?.start && filters.dateOfMeetingRange?.end) {
    params.append("from_date", filters.dateOfMeetingRange.start);
    params.append("to_date", filters.dateOfMeetingRange.end);
  }
  if (searchQuery) {
    params.append("lead_name", searchQuery);
  }

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch feedback data (${res.status})`
    );
  }

  const json = await res.json();
  const engagements: Engagement[] = json.items || [];
  const total: number = json.total_count || 0;

  return {
    data: engagements.map((e) => ({
      id: e.id,
      name: e.lead_name,
      company: e.client_name,
      email: e.lead_email ?? undefined,
      timestamp: e.scheduled_time,
      status:
        e.status === "waiting_feedback"
          ? FeedbackStatus.FOLLOW_UP
          : FeedbackStatus.RESPONDED,
      channel: e.channel,
      reminderCycle: e.reminder_cycle,
      feedback: {
        meetingStatus: e.feedback?.meeting_status ?? "",
        prospectFit: e.feedback?.prospect_fit ?? "",
        feedbackNotes: e.feedback?.feedback_notes ?? "",
        confidence: e.feedback?.confidence ?? "",
        actor: e.feedback?.actor ?? "",
        timestamp: e.feedback?.timestamp ?? "",
      },
      createdAt: e.created_at,
      updatedAt: e.updated_at,
    })),
    total,
  };
};
