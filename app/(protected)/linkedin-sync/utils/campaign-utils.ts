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

{ /* Get relative time from date string */}
export const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const updated = new Date(dateString);
  const diffMs = now.getTime() - updated.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

