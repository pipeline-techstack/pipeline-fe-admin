import { FeedbackLead, FeedbackStatus } from "../types/feedback";

export const formatTimestamp = (timestamp: string): string => {
  // Convert "2d ago" format or handle actual dates
  return timestamp;
};

export const getStatusColor = (status: FeedbackStatus): string => {
  switch (status) {
    case FeedbackStatus.FOLLOW_UP:
      return 'yellow';
    case FeedbackStatus.RESPONDED:
      return 'green';
    // case FeedbackStatus.SENT:
    //   return 'blue';
    default:
      return 'gray';
  }
};

export const sortFeedbackByDate = (feedback: FeedbackLead[]): FeedbackLead[] => {
  return feedback.sort((a, b) => {
    // This is a simple sort - you might need more complex logic for your timestamp format
    const aNum = parseInt(a.timestamp);
    const bNum = parseInt(b.timestamp);
    return aNum - bNum;
  });
};

export const filterFeedbackByStatus = (
  feedback: FeedbackLead[], 
  status: string
): FeedbackLead[] => {
  if (status === 'all') return feedback;
  return feedback.filter(item => item.status === status);
};

export const searchFeedback = (
  feedback: FeedbackLead[], 
  query: string
): FeedbackLead[] => {
  if (!query) return feedback;
  
  const searchTerm = query.toLowerCase();
  return feedback.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.company.toLowerCase().includes(searchTerm) ||
    item.feedbackText?.toLowerCase().includes(searchTerm)
  );
};

export function formatTimeAgo(dateInput: string | number | Date | null): string {
  if (!dateInput) return "";

  let date: Date;

  if (typeof dateInput === "string") {
    let normalized = dateInput.trim();

    // Handle ISO with microseconds (e.g. 2025-09-01T00:38:24.544000)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}/.test(normalized)) {
      normalized = normalized.replace(/(\.\d{3})\d+/, "$1"); // Keep only 3 decimals (ms)
    }

    // Ensure it ends with Z (UTC) if it's an ISO string and missing it
    if (/^\d{4}-\d{2}-\d{2}T/.test(normalized) && !/[zZ]$/.test(normalized)) {
      normalized += "Z";
    }

    // Create the date object (will be in UTC)
    date = new Date(normalized);
  } else {
    // If it's already a Date or timestamp
    date = new Date(dateInput);
  }

  // Convert to local time implicitly (Date object does this by default when formatting)
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) {
    return diffSec <= 5 ? "Just now" : `${diffSec}s ago`;
  }
  if (diffMin < 60) {
    return `${diffMin}m ago`;
  }
  if (diffHour < 24) {
    return `${diffHour}h ago`;
  }

  // Fallback → show local date
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}