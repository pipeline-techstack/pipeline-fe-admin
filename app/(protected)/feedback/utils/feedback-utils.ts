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
    case FeedbackStatus.SENT:
      return 'blue';
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