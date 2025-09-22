import { SelectOption } from "@/lib/types/misc";

export interface FeedbackLead {
  id: string;
  name: string;
  company: string;
  email?: string; 
  avatar?: string;
  timestamp: string;
  status: FeedbackStatus; // allow mapped backend statuses
  hasFollowUp?: boolean;
  feedbackText?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackFilters {
  status: "all" | "follow-up" | "responded";
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  campaign?: boolean;
  dateOfMeeting?: boolean;
  dateOfMeetingRange?: {
    start: string;
    end: string;
  };
  selectedCampaigns?: SelectOption[];
  responded?: boolean;
}

export enum FeedbackStatus {
  FOLLOW_UP = "follow-up",
  RESPONDED = "responded",
}

export interface FeedbackApiResponse {
  data: FeedbackLead[];
  total: number;
  page: number;
  limit: number;
}

// Backend engagement type (from your API)
export interface Engagement {
  id: string;
  client_id: string;
  campaign_id: number;
  conversation_id: string;
  lead_name: string;
  lead_linkedIn_url?: string | null;
  lead_email?: string | null;
  lead_phone?: string | null;
  feedback_notes?: string | null;
  channel: string;
  scheduled_time: string;
  delivery_time?: string | null;
  status: string; // e.g. "waiting_feedback"
  reminder_cycle?: number;
  feedback?: string | null;
  created_at: string;
  updated_at: string;
  client_name: string;
}
