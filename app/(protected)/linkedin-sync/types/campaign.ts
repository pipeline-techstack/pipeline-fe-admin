export interface CampaignTask {
  _id: string;
  type: string;
  campaign_id: string;
  campaign_name: string | null;
  user_id: string;
  changes: {
    linkedin_senders?: {
      old: any[];
      new: any[];
      updated_at: string;
    };
    additional_info?: {
      old: any;
      new: any;
      updated_at: string;
    };
    updated_at?: {
      old: string;
      new: string;
      updated_at: string;
    };
  };
  created_at: string;
  status: string;
  description: string;
  changed_field_count: number;
}

export interface LinkedInSender {
  full_name: string;
  profile_image_url: string;
  banner_image_url: string;
  company_name: string;
  headline: string;
  location: string;
  about: string;
  work_experiences: WorkExperience[];
}

export interface WorkExperience {
  title: string;
  company_name: string;
  date_range: string;
  location: string;
  description: string;
}

export interface CampaignFilters {
  searchQuery?: string;
  taskType?: 'all' | 'create' | 'update';
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
  task_type: 'create' | 'update';
}