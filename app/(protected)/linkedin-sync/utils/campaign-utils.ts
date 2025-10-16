import { CampaignTask, LinkedInSender } from '../types/campaign';

{/* Extract LinkedIn sender names from task */}
 
export const getLinkedInSenderNames = (task: CampaignTask): string[] => {
  const newSenders = task.changes?.linkedin_senders?.new || [];
  return newSenders.map((sender: LinkedInSender) => sender.full_name);
};

{/* Get task type display text */}
export const getTaskTypeDisplay = (type: string): string => {
  if (type === 'campaign_update') return 'Update Campaign';
  if (type === 'campaign_create') return 'Create Campaign';
  return type;
};

{/* Get task type for badge variant */}
export const getTaskType = (type: string): 'create' | 'update' => {
  if (type === 'campaign_create') return 'create';
  return 'update';
};

{/* Format date string */}
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

{/* Safely display a value, returning "N/A" for null, undefined, or empty strings. */}
export const displayValue = (value: any): string => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "string" && value.trim() === "") return "N/A";
  return String(value);
};