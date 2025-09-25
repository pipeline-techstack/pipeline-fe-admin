import { FeedbackLead, FeedbackStatus, FeedbackItem, KanbanCategories } from "../types/feedback";

// Legacy utility functions (keeping for backward compatibility)
export const formatTimestamp = (timestamp: string): string => {
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

// NEW KANBAN UTILITY FUNCTIONS

/**
 * Categorizes feedback items into kanban columns based on business logic
 */
export const categorizeItemsForKanban = (items: FeedbackItem[]): KanbanCategories => {
  const currentTime = new Date();
  
  const categories: KanbanCategories = {
    meetingBooked: [],
    reminder1: [],
    reminder2: [],
    reminder3: [],
    feedbackReceived: [],
    feedbackNotReceived: [],
  };

  items.forEach((item) => {
    const scheduledTime = new Date(item.scheduled_time);
    const timeDiffHours = (currentTime.getTime() - scheduledTime.getTime()) / (1000 * 60 * 60);

    // Meeting booked: current date&time < scheduled date&time && reminder_cycle == 0
    if (currentTime < scheduledTime && item.reminder_cycle === 0) {
      categories.meetingBooked.push(item);
    }
    // Reminder 1: reminder_cycle == 1
    else if (item.reminder_cycle === 1) {
      categories.reminder1.push(item);
    }
    // Reminder 2: reminder_cycle == 2
    else if (item.reminder_cycle === 2) {
      categories.reminder2.push(item);
    }
    // Reminder 3: reminder_cycle == 3 && scheduled_time <= 24hrs
    else if (item.reminder_cycle === 3 && timeDiffHours <= 24) {
      categories.reminder3.push(item);
    }
    // Feedback received/not received: reminder_cycle == 3 && scheduled_time > 24hrs
    else if (item.reminder_cycle === 3 && timeDiffHours > 24) {
      if (item.feedback && item.status === "verified") {
        categories.feedbackReceived.push(item);
      } else {
        categories.feedbackNotReceived.push(item);
      }
    }
    // Handle edge cases - items that don't fit the main categories
    else {
      // If scheduled time has passed but reminder_cycle is still 0
      if (currentTime >= scheduledTime && item.reminder_cycle === 0) {
        categories.reminder1.push(item);
      }
    }
  });

  return categories;
};

/**
 * Get color scheme for kanban columns
 */
export const getKanbanColumnColors = (columnId: string) => {
  const colorMap: Record<string, { bg: string; header: string }> = {
    'meeting-booked': { 
      bg: "bg-blue-50 border-blue-200", 
      header: "bg-blue-100 text-blue-800" 
    },
    'reminder-1': { 
      bg: "bg-yellow-50 border-yellow-200", 
      header: "bg-yellow-100 text-yellow-800" 
    },
    'reminder-2': { 
      bg: "bg-orange-50 border-orange-200", 
      header: "bg-orange-100 text-orange-800" 
    },
    'reminder-3': { 
      bg: "bg-red-50 border-red-200", 
      header: "bg-red-100 text-red-800" 
    },
    'feedback-received': { 
      bg: "bg-green-50 border-green-200", 
      header: "bg-green-100 text-green-800" 
    },
    'feedback-not-received': { 
      bg: "bg-gray-50 border-gray-200", 
      header: "bg-gray-100 text-gray-800" 
    },
  };

  return colorMap[columnId] || { bg: "bg-gray-50", header: "bg-gray-100" };
};

/**
 * Get formatted date and time for display
 */
export const formatScheduledTime = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }),
    time: date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  };
};

/**
 * Get channel icon/emoji for display
 */
export const getChannelIcon = (channel: string): string => {
  switch (channel?.toLowerCase()) {
    case 'zoom':
      return '🎥';
    case 'phone':
      return '📞';
    case 'email':
      return '✉️';
    case 'teams':
      return '👥';
    case 'meet':
      return '📹';
    default:
      return '📅';
  }
};

/**
 * Check if an item is overdue
 */
export const isItemOverdue = (scheduledTime: string): boolean => {
  const scheduled = new Date(scheduledTime);
  const now = new Date();
  return now > scheduled;
};