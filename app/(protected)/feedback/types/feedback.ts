import { SelectOption } from "@/lib/types/misc";

export interface FeedbackLead {
  id: string;
  name: string;
  company: string;
  email?: string; 
  avatar?: string;
  timestamp: string;
  status: FeedbackStatus;
  hasFollowUp?: boolean;
  feedbackText?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackFilters {
  status: 'all' | 'follow-up' | 'responded' | 'sent';
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
  sent?: boolean;
}

export enum FeedbackStatus {
  FOLLOW_UP = 'follow-up',
  RESPONDED = 'responded',
  SENT = 'sent'
}

export interface FeedbackApiResponse {
  data: FeedbackLead[];
  total: number;
  page: number;
  limit: number;
}