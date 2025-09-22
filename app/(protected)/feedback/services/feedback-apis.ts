// services/feedback-apis.ts
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
  searchQuery: string
): Promise<FeedbackLead[]> => {
  const token = localStorage.getItem("st_access_token");
  if (!token) throw new Error("User is not authenticated");

  // build query params
  const params = new URLSearchParams();

  if (filters.status && filters.status !== "all") {
    params.append("engagement_status", mapStatus(filters.status));
  }
  if (filters.selectedCampaigns?.length) {
    filters.selectedCampaigns.forEach((c) => params.append("campaign_id", c.value));
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
    throw new Error(errorData.message || `Failed to fetch feedback data (${res.status})`);
  }

  const json = await res.json();
  const engagements: Engagement[] = json.items || [];

  // Map Engagement → FeedbackLead
  return engagements.map((e) => ({
    id: e.id,
    name: e.lead_name,
    company: e.client_name,
    email: e.lead_email ?? undefined,
    timestamp: e.scheduled_time,
    status:
      e.status === "waiting_feedback"
        ? FeedbackStatus.FOLLOW_UP
        : FeedbackStatus.RESPONDED,
    feedbackText: e.feedback?.feedback_notes ?? "",
    createdAt: e.created_at,
    updatedAt: e.updated_at,
  }));
};
