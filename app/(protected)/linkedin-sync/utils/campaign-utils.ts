// import { CampaignTask } from '../types/campaign';

// export const formatCampaignDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// export const filterCampaigns = (
//   campaigns: CampaignTask[],
//   searchQuery: string
// ): CampaignTask[] => {
//   if (!searchQuery) return campaigns;
  
//   const query = searchQuery.toLowerCase();
//   return campaigns.filter(campaign => 
//     campaign.campaign_name.toLowerCase().includes(query) ||
//     campaign.linkedin_senders.some(sender => 
//       sender.name.toLowerCase().includes(query)
//     )
//   );
// };

// export const sortCampaignsByDate = (
//   campaigns: CampaignTask[],
//   order: 'asc' | 'desc' = 'desc'
// ): CampaignTask[] => {
//   return [...campaigns].sort((a, b) => {
//     const dateA = new Date(a.updated_at).getTime();
//     const dateB = new Date(b.updated_at).getTime();
//     return order === 'desc' ? dateB - dateA : dateA - dateB;
//   });
// };

import { CampaignTask, LinkedInSender } from '../types/campaign';

/**
 * Extract LinkedIn sender names from task
 */
export const getLinkedInSenderNames = (task: CampaignTask): string[] => {
  const newSenders = task.changes?.linkedin_senders?.new || [];
  return newSenders.map((sender: LinkedInSender) => sender.full_name);
};

/**
 * Get task type display text
 */
export const getTaskTypeDisplay = (type: string): string => {
  if (type === 'campaign_update') return 'Update Campaign';
  if (type === 'campaign_create') return 'Create Campaign';
  return type;
};

/**
 * Get task type for badge variant
 */
export const getTaskType = (type: string): 'create' | 'update' => {
  if (type === 'campaign_create') return 'create';
  return 'update';
};

/**
 * Format date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};