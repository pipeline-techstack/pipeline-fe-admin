import { Engagement, FeedbackLead, FeedbackStatus, FeedbackFilters, FeedbackItem } from "../types/feedback";

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

// Main function for kanban view (gets all data without pagination)
export const getFeedbackData = async (): Promise<{ items: FeedbackItem[]; total: number }> => {
  const token = localStorage.getItem("st_access_token");
  if (!token) throw new Error("User is not authenticated");

  // Get all data without pagination for kanban view
  const params = new URLSearchParams();
  params.append("limit", "1000"); // Large limit to get all data
  params.append("page", "1");

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
  const total: number = json.total_count || engagements.length;

  // Return data in the new FeedbackItem format
  return {
    items: engagements.map((e) => ({
      id: e.id,
      client_id: e.client_id,
      campaign_id: e.campaign_id,
      conversation_id: e.conversation_id,
      lead_name: e.lead_name,
      lead_linkedIn_url: e.lead_linkedIn_url,
      lead_email: e.lead_email,
      lead_phone: e.lead_phone,
      notes: e.notes,
      channel: e.channel,
      scheduled_time: e.scheduled_time,
      delivery_time: e.delivery_time,
      status: e.status,
      reminder_cycle: e.reminder_cycle || 0,
      feedback: e.feedback,
      created_at: e.created_at,
      updated_at: e.updated_at,
      client_name: e.client_name,
      client_email: e.client_email,
    })),
    total,
  };
};

// LEGACY: Commented out paginated version
/*
export const getFeedbackDataPaginated = async (
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
      email: e.lead_email ?? e.client_email ?? undefined,
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
*/

// Helper function to get filtered data (if needed for future search/filter functionality)
export const getFeedbackDataWithFilters = async (
  filters?: Partial<FeedbackFilters>,
  searchQuery?: string
): Promise<{ items: FeedbackItem[]; total: number }> => {
  const token = localStorage.getItem("st_access_token");
  if (!token) throw new Error("User is not authenticated");

  const params = new URLSearchParams();
  params.append("limit", "1000"); // Large limit to get all data
  params.append("page", "1");

  // Apply filters if provided
  if (filters?.status && filters.status !== "all") {
    params.append("engagement_status", mapStatus(filters.status));
  }
  if (filters?.selectedCampaigns?.length) {
    filters.selectedCampaigns.forEach((c) =>
      params.append("campaign_id", c.value)
    );
  }
  if (filters?.dateOfMeetingRange?.start && filters?.dateOfMeetingRange?.end) {
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
  const total: number = json.total_count || engagements.length;

  return {
    items: engagements.map((e) => ({
      id: e.id,
      client_id: e.client_id,
      campaign_id: e.campaign_id,
      conversation_id: e.conversation_id,
      lead_name: e.lead_name,
      lead_linkedIn_url: e.lead_linkedIn_url,
      lead_email: e.lead_email,
      lead_phone: e.lead_phone,
      notes: e.notes,
      channel: e.channel,
      scheduled_time: e.scheduled_time,
      delivery_time: e.delivery_time,
      status: e.status,
      reminder_cycle: e.reminder_cycle || 0,
      feedback: e.feedback,
      created_at: e.created_at,
      updated_at: e.updated_at,
      client_name: e.client_name,
      client_email: e.client_email,
    })),
    total,
  };
};