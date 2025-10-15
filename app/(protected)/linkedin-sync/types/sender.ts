export interface LinkedInSenderProfile {
  id: string;
  name: string;
  headline?: string;
  email?: string;
  avatar?: string;
  profile_url?: string;
  status: 'active' | 'inactive' | 'paused';
  messages_sent: number;
  engagement_rate?: number;
  last_active?: string;
  created_at: string;
  updated_at: string;
}

export interface SenderFilters {
  searchQuery?: string;
  status?: 'all' | 'active' | 'inactive' | 'paused';
}

export interface SenderApiResponse {
  items: LinkedInSenderProfile[];
  total?: number;
  page?: number;
  limit?: number;
}