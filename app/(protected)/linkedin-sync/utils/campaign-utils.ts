import { CampaignTask, LinkedInSender } from '../types/campaign';

{/* Extract LinkedIn sender names from task */}
 
export const getLinkedInSenderNames = (task: CampaignTask): string[] => {
  const newSenders = task.fields?.linkedin_senders || task.changes?.linkedin_senders?.new || [];
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
export function formatTimeAgo(dateInput: string | number | Date | null): string {
  if (!dateInput) return "";

  let date: Date;

  if (typeof dateInput === "string") {
    let normalized = dateInput.trim();

    // Handle ISO with microseconds (e.g. 2025-09-01T00:38:24.544000)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}/.test(normalized)) {
      normalized = normalized.replace(/(\.\d{3})\d+/, "$1");
    }

    // Ensure UTC suffix if ISO-like but missing 'Z'
    if (/^\d{4}-\d{2}-\d{2}T/.test(normalized) && !/[zZ]$/.test(normalized)) {
      normalized += "Z";
    }

    date = new Date(normalized);
  } else {
    date = new Date(dateInput);
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30); 

  if (diffSec < 60) return diffSec <= 5 ? "Just now" : `${diffSec}s`;
  if (diffMin < 60) return diffMin === 1 ? "1 min" : `${diffMin} mins`;
  if (diffHour < 24) return diffHour === 1 ? "1 hr" : `${diffHour} hrs`;
  if (diffDay < 8) return diffDay === 1 ? "1 day" : `${diffDay} days`;
  if (diffMonth < 4) return diffMonth === 1 ? "1 month" : `${diffMonth} months`;


  // Fallback → show local date for anything older than 3 months
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}





