// ------------------------------
// LinkedIn Sender Types
// ------------------------------
export interface WorkExperience {
  title: string;
  company_name: string;
  date_range: string;
  location: string;
  description?: string | null;
}

export interface LinkedInSender {
  full_name: string;
  profile_image_url?: string;
  banner_image_url?: string;
  company_name?: string;
  headline?: string;
  location?: string;
  about?: string;
  work_experiences?: WorkExperience[];
  linkedin_sender_id?: number;
}

// ------------------------------
// Additional Info Types
// ------------------------------
export interface AdditionalInfo {
  email_address?: string;
  calendar_link?: string;
  company_brochure_link?: string | null;
  company_logo_link?: string | null;
  company_linkedin_banner_link?: string | null;
  company_pitch_deck_link?: string | null;
  company_product_overview_link?: string | null;
}

// ------------------------------
// Campaign Task Types
// ------------------------------
export interface CampaignTask {
  _id: string;
  type: string;
  campaign_id: string;
  campaign_name?: string | null;
  user_id?: string;
  status?: string;
  description?: string;
  changed_field_count?: number;

  // Optional nested field snapshot
  fields?: {
    _id: string;
    campaign_name: string;
    lead_filters?: any;
    organization_filters?: any;
    linkedin_senders?: LinkedInSender[];
    campaign_sequence?: any[];
    additional_info?: AdditionalInfo;
    campaign_id?: string | null;
    user_id?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
    heyreach_campaign_id?: number;
    heyreach_linkedin_senders?: number[];
    changes?: any[];
  };

  // Change tracking
  changes?: {
    linkedin_senders?: {
      old: LinkedInSender[];
      new: LinkedInSender[];
      updated_at?: string;
    };
    additional_info?: {
      old: AdditionalInfo;
      new: AdditionalInfo;
      updated_at?: string;
    };
    campaign_name?: {
      old: string | null;
      new: string;
      updated_at?: string;
    };
    updated_at?: {
      old: string;
      new: string;
      updated_at?: string;
    };
  };

  created_at: string;
  updated_at?: string;
}

// ------------------------------
// Filters & API Types
// ------------------------------
export interface CampaignFilters {
  searchQuery?: string;
  taskType?: "all" | "create" | "update";
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface CampaignApiResponse {
  tasks: CampaignTask[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface UpdateCampaignPayload {
  heyreach_campaign_id: string;
}

export interface CreateCampaignPayload {
  campaign_name: string;
  linkedin_sender_ids: string[];
  task_type: "create" | "update";
}

// ------------------------------
// Dialog Props
// ------------------------------
export interface UpdateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateCampaign: (taskId: string) => Promise<void>;
  selectedTask: CampaignTask | null;
}
