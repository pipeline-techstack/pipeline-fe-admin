export interface CampaignTask {
  id: string;
  campaign_id: string;
  campaign_name: string;
  linkedin_senders: LinkedInSender[];
  task_type: 'create' | 'update';
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LinkedInSender {
  id: string;
  name: string;
  email?: string;
  profile_url?: string;
}

export interface CampaignFilters {
  searchQuery?: string;
  taskType?: 'all' | 'create' | 'update';
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface CampaignApiResponse {
  items: CampaignTask[];
  total?: number;
  page?: number;
  limit?: number;
}