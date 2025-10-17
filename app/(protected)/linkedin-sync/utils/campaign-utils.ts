import { CampaignTask, LinkedInSender } from '../types/campaign';

/* Extract LinkedIn sender names from task */
export const getLinkedInSenderNames = (task: CampaignTask): string[] => {
  const newSenders = task.fields?.linkedin_senders || task.changes?.linkedin_senders?.new || [];
  return newSenders.map((sender: LinkedInSender) => sender.full_name);
};

/* Get task type display text */
export const getTaskTypeDisplay = (type: string): string => {
  if (type === 'campaign_update') return 'Update Campaign';
  if (type === 'campaign_create' || type === 'campaign_creation') return 'Create Campaign';
  return type;
};

/* Get task type for badge variant */
export const getTaskType = (type: string): 'create' | 'update' => {
  if (type === 'campaign_create' || type === 'campaign_creation') return 'create';
  return 'update';
};

/* Format date string */
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

/* Safely display a value, returning "N/A" for null, undefined, or empty strings. */
export const displayValue = (value: any): string => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "string" && value.trim() === "") return "N/A";
  return String(value);
};

/* Capitalize first letter of status */
export const capitalizeStatus = (status: string | undefined): string => {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/* Format time ago with color indicator */
export const formatTimeAgo = (dateInput: string): { display: string; dotColor: string } => {
  if (!dateInput) return { display: "—", dotColor: "bg-gray-500" };

  let normalized = dateInput.trim();

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}/.test(normalized)) {
    normalized = normalized.replace(/(\.\d{3})\d+/, "$1");
  }

  if (/^\d{4}-\d{2}-\d{2}T/.test(normalized) && !/[zZ]$/.test(normalized)) {
    normalized += "Z";
  }

  const date = new Date(normalized);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  let dotColor = "bg-red-500";
  if (diffHours < 24) {
    dotColor = "bg-green-500";
  } else if (diffHours < 48) {
    dotColor = "bg-yellow-500";
  }

  let display = "";
  if (diffHours < 1) {
    const diffMin = Math.floor(diffMs / (1000 * 60));
    if (diffMin < 1) {
      display = "Just now";
    } else if (diffMin === 1) {
      display = "1 min";
    } else {
      display = `${diffMin} mins`;
    }
  } else if (diffHours < 24) {
    display = diffHours === 1 ? "1 hr" : `${diffHours} hrs`;
  } else if (diffDays < 8) {
    display = diffDays === 1 ? "1 day" : `${diffDays} days`;
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 4) {
      display = diffMonths === 1 ? "1 month" : `${diffMonths} months`;
    } else {
      display = date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  return { display, dotColor };
};