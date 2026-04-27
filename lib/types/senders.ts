export type Sender = {
  _id: string;
  name: string;
  avatar: string;
  status: string;
  statusCount: number;
  company: string;
  campaigns: number;
  campaignList: string[];
  linkedin: string;
  performance: Performance;
  jobTitle?: string;
  location?: string;
  headline?: string;
};

export type Performance = {
  sent: number;
  accepted: number;
  reply: number;
  interested: number;
};

export type SenderDashboardPayload = {
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
  companies?: string[];
  sender_name?: string;
  campaign_names?: string[];
};
