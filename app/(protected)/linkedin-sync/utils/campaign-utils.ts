import { CampaignTask } from '../types/campaign';

export const formatCampaignDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const filterCampaigns = (
  campaigns: CampaignTask[],
  searchQuery: string
): CampaignTask[] => {
  if (!searchQuery) return campaigns;
  
  const query = searchQuery.toLowerCase();
  return campaigns.filter(campaign => 
    campaign.campaign_name.toLowerCase().includes(query) ||
    campaign.linkedin_senders.some(sender => 
      sender.name.toLowerCase().includes(query)
    )
  );
};

export const sortCampaignsByDate = (
  campaigns: CampaignTask[],
  order: 'asc' | 'desc' = 'desc'
): CampaignTask[] => {
  return [...campaigns].sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};
