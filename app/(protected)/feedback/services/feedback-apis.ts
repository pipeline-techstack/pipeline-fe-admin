import { Engagement, FeedbackLead, FeedbackStatus } from "../types/feedback";

const API_URL = `${process.env.NEXT_PUBLIC_WORKBOOK_URL_DEV}/engagements`;

export const getFeedbackData = async (): Promise<FeedbackLead[]> => {
  const token = localStorage.getItem("st_access_token");
  if (!token) throw new Error("User is not authenticated");

  const res = await fetch(API_URL, {
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
  const engagements: Engagement[] = json.items || []; // Correct key from API response



  // Map Engagement → FeedbackLead
const feedbackLeads: FeedbackLead[] = engagements.map((e) => ({
  id: e.id,
  name: e.lead_name,
  company: e.client_name,
  email: e.lead_email ?? undefined,
  timestamp: e.scheduled_time,
  status:
    e.status === "waiting_feedback"
      ? FeedbackStatus.FOLLOW_UP
      : FeedbackStatus.RESPONDED,
  feedbackText: e.feedback?.feedback_notes ?? "", // ✅ map nested feedback_notes
  createdAt: e.created_at,
  updatedAt: e.updated_at,
}));


  return feedbackLeads;
};
